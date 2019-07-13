import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-salon',
  templateUrl: './salon.component.html',
  styleUrls: ['./salon.component.scss'],
})
export class SalonComponent implements OnInit {

  public salonName:string;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  public salonData :any;
  public dataLoaded:boolean = false;
  public servicesByCategory;
  public servicesTags;

  constructor(private activatedRoute: ActivatedRoute, private afStore: AngularFirestore, private router: Router) { 
  }

  public book(service){
    this.router.navigate(['/home/appointment', this.salonName], {queryParams: {
      service
    }});
  }

  ngOnInit() {
    this.salonName = this.activatedRoute.snapshot.params.salonName;
    this.afStore.collection('salons').doc('1').valueChanges().subscribe(data => {
      //change needed 
      this.salonData = data;
      this.dataLoaded = true;
      this.servicesByCategory = this.salonData.servicesInfo;
      this.servicesTags = this.salonData.servicesTags;
    })


    this.galleryOptions = [
      {
          width: '600px',
          height: '400px',
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
          breakpoint: 800,
          width: '100%',
          height: '600px',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20
      },
      // max-width 400
      {
          breakpoint: 400,
          preview: false,
          height: '300px'
      }
  ];

  this.galleryImages = [
      {
          small: 'assets/pictures/charme.jpg',
          medium: 'assets/pictures/charme.jpg',
          big: 'assets/pictures/charme.jpg'
      },
      {
          small: 'assets/pictures/charme.jpg',
          medium: 'assets/pictures/charme.jpg',
          big: 'assets/pictures/charme.jpg'
      },
      {
          small: 'assets/pictures/charme.jpg',
          medium: 'assets/pictures/charme.jpg',
          big: 'assets/pictures/charme.jpg'
      }
  ];


  }

}
