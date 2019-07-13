import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

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

  constructor(private activatedRoute: ActivatedRoute, private afStore: AngularFirestore, private router: Router) { 
    this.salonName = this.activatedRoute.snapshot.params.salonName;

    this.activatedRoute.queryParams.subscribe(data => {

      console.log(data);

      if(data.date){
        
        this.queryData = data.date;
        let splittedData = data.date.split('.');
        let newDate = new Date(+splittedData[2], (+splittedData[0] - 1), +splittedData[1]);
        this.dateSelected = newDate;
        console.log(newDate);

      }

      if(data.service){
        this.selectedService = data.service;
      }
      let date = this.changeDate();
      this.afStore.collection('salons').doc(this.salonName).collection('haircut').doc(date).valueChanges().subscribe((data:any) => {
        if(data){
        this.error = false;
        this.salonSchedule = data.schedule;
        console.log(this.salonSchedule);
        let durationInHours = data.duration/60;
        for(let interval of data.schedule){
          let intervalMini = interval.split('^');
          for(let start = +intervalMini[0];start<=(+intervalMini[1]) - durationInHours;start+=durationInHours){
            let fractPart = start - Math.floor(start);
            let formDateTobePushed;
            if(fractPart > 0)formDateTobePushed = start.toFixed(0) + ':' + (fractPart*60).toString(); 
            else formDateTobePushed = start.toFixed(0) + ':' + '00';
            this.slotsAvailable.push(formDateTobePushed);
          }
        }
      }
      else {
        this.error = true;
      }

      });

    });

    this.afStore.collection('salons').doc(this.salonName).valueChanges().subscribe(data => {

      this.salonInfo = data;
      this.dataLoaded = true;
    
    })
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

  ngOnInit() {}

}
