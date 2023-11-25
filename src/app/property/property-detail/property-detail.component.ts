import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/app.service';
import { SharedserviceService } from 'src/app/shared/sharedservice.service';
import { PageServiceService } from 'src/app/theme/pages/page-service.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {
  PropertyData: any =[];
  loader: boolean= true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appService:AppService,
    private formBuilder: FormBuilder,
    private pageserviceservice: PageServiceService,
    private modalService: NgbModal,
    private sharedserviceService: SharedserviceService
  ) { }

  filters: {  page: number; pageSize: number; attomId: any;  } =
  { page: 1, pageSize: 10,attomId: ''};

  ngOnInit(): void {
    this.getPropertyDetail()
  }
  getPropertyDetail() {
    this.filters.attomId = this.route.snapshot.params['id'];
   console.log(this.filters.attomId);
  //  throw "sad";
    this.pageserviceservice
    .getPropertyDetail(this.filters)
    .subscribe((response:any) => {
      console.log(response);
      if (response.data.length == 0) {
        this.PropertyData = [];
      } else {
        this.loader = false
        this.PropertyData = response.data.map((cat:any) => {
          console.log(cat);
          return {
            name: cat.summary.propclass+' '+cat.summary.propsubtype,
            smallAddress: cat.address.country+' '+cat.address.line2,
            fullSummary: cat.summary.propclass+' '+cat.summary.propsubtype+' '+cat.summary.absenteeInd
            +' '+cat.summary.legal1+' '+cat.summary.propIndicator+' '+cat.summary.propLandUse+' Year Built'+cat.summary.yearbuilt,
            bathfixtures: cat.building.rooms.bathfixtures?cat.building.rooms.bathfixtures:'0'+' Guests, ',
            bathsfull: cat.building.rooms.bathsfull?cat.building.rooms.bathsfull:'0'+' Store Room, ',
            bathstotal: cat.building.rooms.bathstotal?cat.building.rooms.bathstotal:'0'+' Bathrooms, ',
            beds: cat.building.rooms.beds?cat.building.rooms.beds:'0'+' Beds,',
            roomsTotal: cat.building.rooms.roomsTotal?cat.building.rooms.roomsTotal:'0'+' Bedrooms,',

            address: cat.address.country + cat.address.countrySubd+ cat.address.line1+ cat.address.line2
             + cat.address.locality + cat.address.matchCode + cat.address.oneLine
             + cat.address.postal1 + cat.address.postal2 + cat.address.postal3,
            identifier: cat.identifier.Id + cat.identifier.apn + cat.identifier.attomId + cat.identifier.fips,
            location: cat.location.accuracy +', lat -> ' + cat.location.latitude+', long -> '+cat.location.longitude  
          };
        });

        }
        console.log("this.PropertyData",this.PropertyData)

})
  }
}
