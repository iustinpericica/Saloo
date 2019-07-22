import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

export const appointMe = functions.https.onCall((data, context) => {
    if(context.auth){
        admin.firestore().collection('users').doc(context.auth.uid).get().then(async response => {
            let data:any = response.data();
            if(data.appointmentsUsed < data.maxAppointment){
                // data = appointment Info
                let resSalon = await admin.firestore().collection('salons').doc(data.salon).collection(data.service).doc(data.date).get();
                let dataSalon:any = resSalon.data();
                let salonSchedule = dataSalon.schedule;

                let durationInHours = dataSalon.duration/60;

                let slotsAvailable:Array<string> = new Array<string>();

                for(let interval of salonSchedule){

                    let intervalMini = interval.split('^');
                    for(let start = +intervalMini[0];start<=(+intervalMini[1]) - durationInHours;start+=durationInHours){
                        let fractPart = start - Math.floor(start);
                        let formDateTobePushed;
                        if(fractPart > 0)formDateTobePushed = start.toFixed(0) + ':' + (fractPart*60).toString(); 
                        else formDateTobePushed = start.toFixed(0) + ':' + '00';
                        slotsAvailable.push(formDateTobePushed);
                    }
                }

                if(slotsAvailable.find(x => x == data.slot)){

                    let newSalonSchedule:Array<string> = new Array<string>();

                    for(let interval of salonSchedule){

                        let intervalMini = interval.split('^');
                        if(data.slot >= intervalMini[0] && data.slot <= intervalMini[1]){
                            let slotToBePushed:string;
                            if(data.slot.length <= 4)slotToBePushed = '0' + data.slot;
                            else slotToBePushed = data.slot;
                            newSalonSchedule.push(intervalMini[0] + '^' + slotToBePushed);
                            

                        }
                        else newSalonSchedule.push(interval);
                    }

                    let responseSaveSchedule = await admin.firestore().collection('salons').doc(data.salon).collection(data.service).doc(data.date).update({

                    })
                }


            }
            else {
                return 'max number of appointments reached';
            }
        })
    }
    else return 'not authenticated';
})