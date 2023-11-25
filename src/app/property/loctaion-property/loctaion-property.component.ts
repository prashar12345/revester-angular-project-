import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-loctaion-property',
  templateUrl: './loctaion-property.component.html',
  styleUrls: ['./loctaion-property.component.scss']
})
export class LoctaionPropertyComponent implements OnInit {
  
  lat: number = 51.0447;
   lng: number = -114.0719;
  lat1: any;
  lng1: any;
  constructor( private route: ActivatedRoute,) { if (navigator )
    {
      this.lat1 = this.route.snapshot.paramMap.get('lat');
      this.lng1= this.route.snapshot.paramMap.get('lng');
      const position = ( pos:any ) => {
        this.lat = this.lat1;
        this.lng= this.lng1;
      };

      const error = ( error:any ) => {
      };

console.log(navigator.geolocation);

      // navigator.geolocation.getCurrentPosition( position, error );
      navigator.geolocation.watchPosition( position, error);
    
    } }

  ngOnInit(): void {
    
  }

}
