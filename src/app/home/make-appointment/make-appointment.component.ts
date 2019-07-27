import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import {AngularFireFunctions} from '@angular/fire/functions';


@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.component.html',
  styleUrls: ['./make-appointment.component.scss'],
})
export class MakeAppointmentComponent implements OnInit {

  public salonInfo;
  public salonName;
  public selectedService:string;
  public dataLoaded:boolean = false;
  public date:string;
  public locked:boolean = true;
  public dateSelected:Date;
  public queryData:string;
  public salonSchedule;
  public error:boolean =  false;
  public slotsAvailable:Array<string> = new Array<string>();
  public workersAvailable:Array<string>;
  public workerSelected;

  constructor(private activatedRoute: ActivatedRoute, private afStore: AngularFirestore, private router: Router, public alertController: AlertController, public functions: AngularFireFunctions) { 
    this.salonName = this.activatedRoute.snapshot.params.salonName;

    this.activatedRoute.queryParams.subscribe(data => {

      //console.log(data);

      if(data.date){
        
        this.queryData = data.date;
        let splittedData = data.date.split('.');
        let newDate = new Date(+splittedData[2], (+splittedData[0] - 1), +splittedData[1]);
        this.dateSelected = newDate;
      //console.log(newDate);           

      }

      if(data.service){
        this.selectedService = data.service;
      }
      let date = this.changeDate();
      if(this.workerSelected){
      this.afStore.collection('workers').doc(this.workerSelected).collection('schedule').doc(date).valueChanges().subscribe((data:any) => {
      if(data){
          this.slotsAvailable = [];
          this.error = false;
          this.salonSchedule = data.schedule;

          //console.log(this.salonSchedule);
          let durationInHours = data.duration/60;
          let duration = data.duration;
          for(let interval of data.schedule){
            let intervalMini = interval.split('^');
            
            for(let start = Math.floor(this.transformTimeToMinutes(+intervalMini[0]));start<=Math.floor(this.transformTimeToMinutes(+intervalMini[1]) - duration);start+=duration){

              //console.log(start);
              let minutes = start - (Math.floor(start/60) * 60);
              let hours = Math.floor(start/60);
              let slotTobe = hours + ':';
              if(hours < 10)slotTobe = '0' + slotTobe;
              if(minutes == 0)slotTobe+='00';
              else slotTobe+=minutes;

              
              this.slotsAvailable.push(slotTobe);
              
            }
          }

      }
    
      else {
        this.error = true;
      }
      });
    }
 

    });

    this.afStore.collection('salons').doc(this.salonName).valueChanges().subscribe(data => {

      this.salonInfo = data;
      this.dataLoaded = true;
    
    })
   }

   public transformTimeToMinutes(time:number){
       return Math.floor(time) * 60 + (time - Math.floor(time))*100;
    }
   

   

   public changeDate(){
    let formattedData = (this.dateSelected.getMonth() + 1) + '.' + this.dateSelected.getDate() + '.' + this.dateSelected.getFullYear();
    return formattedData;
  }

   public onChangeTime(){

    let date = this.changeDate();
    let obiect = {
      date
    }
    this.router.navigate(['.'], { relativeTo: this.activatedRoute, queryParams: { ...this.activatedRoute.snapshot.queryParams, ...obiect}});
     
   }



  async presentAlertConfirm(slot:string) {
    const alert = await this.alertController.create({
      header: 'Confirmare rezervare',
      message: `Rezervarea este la ora <strong>${slot}</strong>, data <strong>${this.dateSelected}</strong>!!!`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'danger',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay ' + slot);
            this.confirmAppointment(slot);
          }
        }
      ]
    });

    await alert.present();
  }

  public confirmAppointment(slot:string){
    this.functions.httpsCallable('appointMe')({
      service:this.selectedService,
      salonName:this.salonName,
      slot:slot,
      date:this.queryData

    }).subscribe(data => console.log(data));
  }

  ngOnInit() {
    
  }
  
  public changeWorkerSelected(worker){
    console.log(worker);
  }


}
