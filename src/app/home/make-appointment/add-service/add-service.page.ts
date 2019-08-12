import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SalonInfoInterface } from 'src/app/models/salons';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.page.html',
  styleUrls: ['./add-service.page.scss'],
})
export class AddServicePage implements OnInit {

  @Input() salonInfo: SalonInfoInterface;
  @Input() servicesUsed:Array<any>;
  servicesThatCanBeUsed:Array<string>;
  public serviceChoosen:string;
  public stylistSelected:string;
  public optionsSelected:Array<any>;


  constructor(public modalController: ModalController) { }

  ngOnInit() {
    console.log(this.salonInfo);
    this.servicesThatCanBeUsed = this.salonInfo.services.filter(x => !this.servicesUsed.find(y => y.serviceName == x));
  }

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true,
      'serviceChoosen':this.serviceChoosen,
      'stylistSelected':this.stylistSelected,
      'optionsSelected':this.optionsSelected
    });
  }

  test(){
    console.log(this.serviceChoosen);
    console.log(this.salonInfo.servicesSoloInfo)
  }

  selectsService(){

    this.modalController.dismiss({
      'dismissed': false,
      'serviceChoosen':this.serviceChoosen,
      'stylistSelected':this.stylistSelected,
      'optionsSelected':this.optionsSelected
    });

  }

 
}
