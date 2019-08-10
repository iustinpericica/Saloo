import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, ModalController } from '@ionic/angular';
import {AngularFireFunctions} from '@angular/fire/functions';
import { AddServicePage } from './add-service/add-service.page';


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
  public duration;
  public problemWithWorker:boolean = false;
  public selectedStylist:string;
  public servicesAvailable;
  public daysWithDuration: any = new Object();
  public servicesInfo:any;
  public servicesUsed:Array<string> = new Array<string>();

  constructor(private activatedRoute: ActivatedRoute, private afStore: AngularFirestore, private router: Router, public alertController: AlertController
    , public functions: AngularFireFunctions, public modalController: ModalController) { 
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

      if(data.stylist){
        
        this.selectedStylist= data.stylist;

      }

      
      if(this.queryData){
        let date = this.changeDate();
          this.afStore.collection('salons').doc(this.salonName).collection('haircut').doc(date).valueChanges().subscribe((data:any) => {
          if(data){
              
              this.error = false;
              this.salonSchedule = data.schedule;
              this.workersAvailable = data.workers;
              this.duration = data.duration;

              
              if(this.selectedStylist && this.queryData && this.selectedService){

                this.fetchSlots();
              }

          } 
        
          else {
            this.error = true;
          }
          
          });
    }
    });

    this.afStore.collection('salons').doc(this.salonName).valueChanges().subscribe((data:any) => {

      this.salonInfo = data;
      this.dataLoaded = true;
      this.servicesAvailable = data.services;
      let employers:Array<string> = data.workers;
      this.servicesInfo = data.servicesSoloInfo;
      for(let employer of employers){
        this.afStore.collection('workers').doc(employer).valueChanges().subscribe((data:any) => this.daysWithDuration[employer] = data.daysWithDuration);
      }

      this.getFirstDateViaWorker(this.selectedStylist);
      
    
    })
   }

     
  private fetchSlots(){
    this.slotsAvailable = [];
    this.afStore.collection('workers').doc(this.selectedStylist).collection('schedule').doc(this.queryData).valueChanges().subscribe((data:any) => {
      if(data){
        let duration = this.duration;
        this.problemWithWorker = false;
          for(let interval of data.schedule){
            let intervalMini = interval.split('^');
            //console.log(Math.floor(this.transformTimeToMinutes(+intervalMini[0])), this.transformTimeToMinutes(+intervalMini[1]), duration);
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
    else this.problemWithWorker = true;
  })

  }

   public transformTimeToMinutes(time:number){

       return Math.floor(time) * 60 + Math.round((time - Math.floor(time))*100);
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
      date:this.queryData,
      worker: this.selectedStylist

    }).subscribe(data => console.log(data));
  }

  ngOnInit() {
    
  }


  public changeWorkerSelected(worker){

    this.selectedStylist = worker;
    this.fetchSlots();

  }

  public changeServiceSelected(service){
    this.selectedService = service;
    this.fetchSlots();
  }

  
  public getFirstDateViaWorker(worker:string):(string | null){
    let minim = 20000;
    let duration = this.servicesInfo[this.selectedService].duration;
    let minDate:string = '9999.2019.2019';
    console.dir(this.daysWithDuration);
    console.log(worker);
    Object.keys(this.daysWithDuration).forEach(key => console.log(key));
    // Object.keys(this.daysWithDuration[worker]).forEach(val => {

    //   if(this.daysWithDuration[worker][val] >= duration && val < minDate){
    //     minim = this.daysWithDuration[worker][val];
    //     minDate = val;
    //   }

    // });
    return minDate != '9999.2019.2019' ? minDate : '';
}

  public async addService(){
    const modal = await this.modalController.create({
      component: AddServicePage,
      componentProps: {
        'salonInfo':this.salonInfo,
        'servicesUsed':this.servicesUsed
      }
    });
    return await modal.present();
  }
  

}
