import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import * as helping from './helping';


admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

function returnArrayOfSlotsFromArrayOfSchedule(schedule:Array<string>, duration:number){
    let arrayToBeReturned: Array<string> = new Array<string>();
    let salonSchedule: Array<string> = schedule;

    for(let interval of salonSchedule){
        const intervalMini = interval.split('^');
        for(let start = Math.floor(transformTimeToMinutes(+intervalMini[0]));start<=Math.floor(transformTimeToMinutes(+intervalMini[1]) - duration);start+=duration){

            let minutes = start - (Math.floor(start/60) * 60);
            let hours = Math.floor(start/60);
            let slotTobe = hours + ':';
            if(hours < 10)slotTobe = '0' + slotTobe;
            if(minutes == 0)slotTobe+='00';
            else slotTobe+=minutes;

            
            arrayToBeReturned.push(slotTobe);
            
        }
    }
    return arrayToBeReturned;

}

function transformTimeToMinutes(time:number){
    return Math.floor(time) * 60 + (time - Math.floor(time))*100;
 }

function returnNewSchedule(lastSchedule:Array<string>, duration:number, slot:string){


    let arrayToBeReturned:Array<string> = new Array<string>();

    for(let interval of lastSchedule){

        let intervalMini = interval.split('^');
        let start:number = (+intervalMini[0]);
        let final:number = (+intervalMini[1]);

        let slotToNumber:number = +(slot.replace(':', '.'));

        if(Math.floor(transformTimeToMinutes(slotToNumber)) + duration !=  Math.floor(transformTimeToMinutes(+intervalMini[1])) || Math.floor(transformTimeToMinutes(slotToNumber)) != Math.floor(transformTimeToMinutes(+intervalMini[0]))){

            const totalMinutes = Math.floor(transformTimeToMinutes(slotToNumber));
            const totalMinutesFinal = Math.floor(transformTimeToMinutes(final));
            const startMinutes = Math.floor(transformTimeToMinutes(start));
            const finalMinutes = Math.floor(transformTimeToMinutes(final));

            if(totalMinutes >= startMinutes && totalMinutes + duration <= finalMinutes){

            if(totalMinutes > startMinutes){

                let slotFinal:string;
                if(slot.length <= 4)slotFinal = '0' + slotToNumber.toString();
                else slotFinal = slotToNumber.toString();
                
                arrayToBeReturned.push(intervalMini[0] + '^' + slotFinal);
            }
            
            if(totalMinutes + duration < totalMinutesFinal){

                const totalTimeWhenFinish = totalMinutes + duration;
                let startSlot:string = (Math.floor(totalTimeWhenFinish / 60 ) + '.' + Math.floor((totalTimeWhenFinish - Math.floor(totalTimeWhenFinish/60) * 60)));
                if(Math.floor(totalTimeWhenFinish / 60 )  < 10)startSlot = '0' + startSlot;
                arrayToBeReturned.push(startSlot + '^' + final);

            }

        }
        else arrayToBeReturned.push(interval);
    } 
    }

    return arrayToBeReturned;


}

export const appointMe = functions.https.onCall(async (data, context) => {
    if(context.auth){
        let userInfo = await admin.firestore().collection('users').doc(context.auth.uid).get();

        if(userInfo.data()){
            let userData:any = userInfo.data();
            if(userData.appointmentsUsed < userData.maxAppointment){
                
                //return "posibil ca nr";
                // verificam dispozitia salonului
                //verificare dubla si pe proprietatea free dar si pe tot schedule
                
                // salon info
                // atentie ca date sa fie format an.mth.zi
                let salonInfo:any = await admin.firestore().collection('salons').doc(data.salonName).collection(data.service).doc(data.date).get();
                
                if(salonInfo){
                    salonInfo = salonInfo.data();
                    if(salonInfo.free){
                        let arrayOfSlots:Array<string> = returnArrayOfSlotsFromArrayOfSchedule(salonInfo.schedule, salonInfo.duration);
                        if(arrayOfSlots.find(x => x == data.slot)){
                            let newSchedule = returnNewSchedule(salonInfo.schedule, salonInfo.duration, data.slot);
                            await admin.firestore().collection('salons').doc(data.salonName).collection(data.service).doc(data.date).update({
                                schedule: newSchedule
                            });
                            const increment = admin.firestore.FieldValue.increment(1);
                            let newAppointment:any = new Object();
                            newAppointment.salonName = data.salonName;
                            newAppointment.service = data.service;
                            newAppointment.date = data.date;
                            newAppointment.hour = data.slot;
                            await admin.firestore().collection('users').doc(context.auth.uid).update({
                                appointmentsUsed: increment 
                            });
                            await admin.firestore().collection('users').doc(context.auth.uid).collection('appointment').doc().set(newAppointment);

                            return "done";
                        }
                        else return "imposibil ca schedule";
                    }
                    else return "full";
                }   
                else return "error";

                
            }
            else return "imposibil ca nr";
        }
        else return "user nu are db";

            }
    else return 'not authenticated';
})

export const triggerOnWorkerScheduleUpdate = functions.firestore.document('/workers/{worker}/schedule/{date}').onUpdate(async (change, context) => {

    let workerInfo = await admin.firestore().collection('workers').doc(context.params.worker).get();
    if(workerInfo){
        let workerInfoData = workerInfo.data();
        if(workerInfoData){
            for(let service of workerInfoData.services){
                let salonDataService = await admin.firestore().collection('salons').doc(workerInfoData.salonName).collection(service).doc(context.params.date).get();

                if(salonDataService){
                    let dataSalonService = salonDataService.data();
                    
                    if(dataSalonService){
                        let arrayOfSchedules: Array<Array<string>> = new Array<Array<string>>();
                        for(let worker of dataSalonService.workers){
                            
                            let workerInfoOnSomeDate = await admin.firestore().collection('workers').doc(worker).collection('schedule').doc(context.params.date).get();
                            if(workerInfoOnSomeDate){
                                let data = workerInfoOnSomeDate.data();
                                if(data){
                                    arrayOfSchedules.push(data.schedule);
                                }
                                else return new Promise((res, rej)=>rej('no workerInfoOnSomeDate.data()'));
                            }
                            else return new Promise((res, rej)=>rej('no workerInfoOnSomeDate'));
                        }
                        
                        let mergedSchedule = helping.mergeSchedules(arrayOfSchedules);
                        
                        await admin.firestore().collection('salons').doc(workerInfoData.salonName).collection(service).doc(context.params.date).update({

                            schedule: mergedSchedule

                        });
                }
                else return new Promise((res, rej)=>rej('no dataSalonService'));
                }
                else return new Promise((res, rej)=>rej('no salonDataService'));

            }
        }
        else return new Promise((res, rej)=>rej('no worker data'));

    }
    else return new Promise((res, rej)=>rej('no worker info'));


})