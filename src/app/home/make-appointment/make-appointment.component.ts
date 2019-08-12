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
  public slotsAvailable:Array<string> = new Array<string>();
  public workersAvailable:Array<string>;
  public duration;
  public problemWithWorker:boolean = false;
  public selectedStylist:string;
  public servicesAvailable;
  public daysWithDuration: any = new Object();
  public servicesInfo:any;
  public servicesUsed:Array<any> = new Array<any>();
  public totalMoney:number = 0;
  public totalDuration:number = 0;
  public justOneStylist:boolean = false;
  public mergedServicesByStylist:Array<any> = [];
  public slotsForMergedServicesByStylist:Array<any>;
  private slotsBKT:Array<string> = new Array('1', '2', '3', '4', '5', '6', '7', '8', '9');
  public slotsConsecutive:Array<string[]>;
  public slotsNotConsecutive:Array<string[]>;

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
    
    })
   }

     
  private fetchSlots(duration){
    this.slotsAvailable = [];

    this.afStore.collection('workers').doc(this.servicesUsed[0].stylistSelected).collection('schedule').doc(this.queryData).valueChanges().subscribe((data:any) => {
      if(data){

          for(let interval of data.schedule){

            let intervalMini = interval.split('^');
            for(let start = Math.floor(this.transformTimeToMinutes(+intervalMini[0]));start<=Math.floor(this.transformTimeToMinutes(+intervalMini[1]) - duration);start+=this.salonInfo.stepForAppointments){
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

  });

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

  
  public getFirstDateViaWorker(worker:string):(string | null){
    let minim = 20000;
    let duration = this.servicesInfo[this.selectedService].duration;
    let minDate:string = '9999.2019.2019';

    Object.keys(this.daysWithDuration).forEach(key => console.log(key));
    // Object.keys(this.daysWithDuration[worker]).forEach(val => {

    //   if(this.daysWithDuration[worker][val] >= duration && val < minDate){
    //     minim = this.daysWithDuration[worker][val];
    //     minDate = val;
    //   }

    // });
    return minDate != '9999.2019.2019' ? minDate : '';
}

private fetchSlotsForEachWorker(duration, worker, index){
  let slotsAvailable = [];

  this.afStore.collection('workers').doc(worker).collection('schedule').doc(this.queryData).get().subscribe((data:any) => {
    data = data.data();
    if(data){

        for(let interval of data.schedule){
          let intervalMini = interval.split('^');
          for(let start = Math.floor(this.transformTimeToMinutes(+intervalMini[0]));start<=Math.floor(this.transformTimeToMinutes(+intervalMini[1]) - duration);start+=this.salonInfo.stepForAppointments){
            let minutes = start - (Math.floor(start/60) * 60);
            let hours = Math.floor(start/60);
            let slotTobe = hours + ':';
            if(hours < 10)slotTobe = '0' + slotTobe;
            if(minutes == 0)slotTobe+='00';
            else slotTobe+=minutes;
            slotsAvailable.push(slotTobe);
            
          }
        }
  }
  this.mergedServicesByStylist[index].slotsAvailable = new Array();
  for(let slot of slotsAvailable)this.mergedServicesByStylist[index].slotsAvailable.push(slot);
  this.slotsConsecutive = [];
  this.slotsNotConsecutive = [];
  this.bkt(0);
});
}

  public async addService(){
    const modal = await this.modalController.create({
      component: AddServicePage,
      componentProps: {
        'salonInfo':this.salonInfo,
        'servicesUsed':this.servicesUsed
      }
    });
    await modal.present();    
    const { data } = await modal.onWillDismiss();
    if(data.dismissed == false){
      let obiect = {
        serviceName:data.serviceChoosen,
        stylistSelected:data.stylistSelected,
        optionsSelected:data.optionsSelected,
        duration:this.salonInfo.servicesSoloInfo[data.serviceChoosen].duration,
        price:this.salonInfo.servicesSoloInfo[data.serviceChoosen].price
      };
      if(data.optionsSelected)for(let option of data.optionsSelected){
        obiect.duration+=option.duration;
        obiect.price+=option.price;
      }

      this.totalMoney+=obiect.price;
      this.totalDuration+=obiect.duration;

      this.servicesUsed.push(obiect);
      if(this.servicesUsed.length == 1){
        this.mergedServicesByStylist.push(
          {
            services: new Array(obiect),
            slotsAvailable: [1, 2],
            duration:0
          });
      }
      else if(data.stylistSelected == this.servicesUsed[this.servicesUsed.length - 2].stylistSelected){
        this.mergedServicesByStylist[this.mergedServicesByStylist.length - 1].services.push(obiect);
      }
        else this.mergedServicesByStylist.push(
          {
            services: new Array(obiect),
            slotsAvailable: [1, 2],
            duration:0
          });

      let stylist = data.stylistSelected;

      let stylistChange = false;
      let totalDuration:number = 0;
      for(let service of this.servicesUsed){
        if(service.stylistSelected != stylist)stylistChange = true;
        totalDuration+=service.duration;
      }
      if(stylistChange == false){
        this.justOneStylist = true;
        this.fetchSlots(totalDuration);
      }
      else this.justOneStylist = false;
      
    }

    this.updateMergedSlots();
    

  }

  deleteService(service):void{
    let index = this.servicesUsed.findIndex(x => x == service);
    this.totalMoney-=this.servicesUsed[index].price;
    this.totalDuration-=this.servicesUsed[index].duration;
    let newMergedArray = this.mergedServicesByStylist.map(x => {
      let newArray = new Array();
      for(let serviceSmt of x.services){

        if(serviceSmt.serviceName != service.serviceName)newArray.push(serviceSmt);
      }
      return {
        ...x,
        services: newArray
      }
    });

    newMergedArray = newMergedArray.filter(x => x.services.length != 0);
    this.mergedServicesByStylist = newMergedArray;
    this.updateMergedSlots();
    this.servicesUsed.splice(index, 1);

  }

  toggleReorder() {
    const reorderGroup:any = document.getElementById('reorder');
    reorderGroup.disabled = !reorderGroup.disabled;
    reorderGroup.addEventListener('ionItemReorder', ({detail}) => {
      detail.complete(true);
    });
  }

  updateMergedSlots(){
    for(let index in this.mergedServicesByStylist){
      let duration = 0;
      for(let service of this.mergedServicesByStylist[index].services)duration+=service.duration;
      this.mergedServicesByStylist[index].duration = duration;
      this.fetchSlotsForEachWorker(duration, this.mergedServicesByStylist[index].services[0].stylistSelected, index);
    }
  }

  refreshSlotsFromMergedServices(){
    for(let mergedService of this.mergedServicesByStylist){
      
    }
  }

  private bkt(k){
    for(let slot of this.mergedServicesByStylist[k].slotsAvailable){
      this.slotsBKT[k] =  slot; 

      if((k == this.mergedServicesByStylist.length - 1) && this.solutie(k)){
        this.adaugare(k);
      }
      else if(k < this.mergedServicesByStylist.length - 1)this.bkt(k+1);
    } 

  }

  private solutie(k):boolean{

    if(k != this.mergedServicesByStylist.length - 1)return false;

    let lastEnd = Math.floor(this.transformTimeToMinutes(+(this.slotsBKT[0].replace(':', '.'))) + this.mergedServicesByStylist[0].duration);
    for(let start = 1;start <= k;++start){

      let minutes = Math.floor(this.transformTimeToMinutes(+(this.slotsBKT[start].replace(':', '.'))));

      if(lastEnd <= minutes && (minutes - lastEnd) <= 30){
        let difference = (minutes - lastEnd);
        lastEnd = minutes + this.mergedServicesByStylist[start].duration;
      }
      else return false;
    }
    return true;
  }

  private adaugare(k){
    let str = '';
    let isConsecutive = true;
    let lastEnd = Math.floor(this.transformTimeToMinutes(+(this.slotsBKT[0].replace(':', '.'))) + this.mergedServicesByStylist[0].duration); 
    for(let i  = 1;i<=k;++i){
      let minutes = Math.floor(this.transformTimeToMinutes(+(this.slotsBKT[i].replace(':', '.'))));
      if(lastEnd != minutes)isConsecutive = false;
      lastEnd = minutes + this.mergedServicesByStylist[i].duration;
    }
    
    let toBePushed = new Array<string>();
    for(let i  = 0;i<=k;++i)toBePushed.push(this.slotsBKT[i]);

    if(isConsecutive)this.slotsConsecutive.push(toBePushed);
    else this.slotsNotConsecutive.push(toBePushed);

    console.log(toBePushed + ' ' + isConsecutive);
  
  }
  

}
