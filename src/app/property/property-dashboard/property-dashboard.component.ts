import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-property-dashboard',
  templateUrl: './property-dashboard.component.html',
  styleUrls: ['./property-dashboard.component.scss']
})
export class PropertyDashboardComponent implements OnInit {
  id: any;
  filters: {  attomId:any } =
  { attomId:""  };
  propertyD: any;
  oneLine: any;
  legal1: any;
  propsubtype: any;
  pooltype: any;
  propIndicator: any;
  sizeInd: any;
  rooms: any;
  toggle: any = false
  propclass: any;
  layout: boolean;
  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
    public router:Router
  ) { }

  ngOnInit(): void {
    this.layout=true
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.filters.attomId= this.id
    }
    this.getPropertyD()
  }
  getPropertyD(){
    this.appService.getPropertyDetails(this.id).subscribe((response) => { 
   
      this.propertyD = response.data.map((cat: any) => {
        return {
          summary: cat.summary,
          building: cat.building,
          size: cat.building.size,
          Indicate: cat.summary,
          address: cat.address,
          lot: cat.lot
        };
      });
     this.oneLine=this.propertyD[0].address.oneLine
      this.legal1=this.propertyD[0].summary.legal1
      this.propsubtype=this.propertyD[0].summary.propsubtype
      this.pooltype=this.propertyD[0].lot.pooltype
      this.propIndicator=this.propertyD[0].summary.propIndicator
      this.sizeInd=this.propertyD[0].size.sizeInd
      this.rooms=this.propertyD[0].building.rooms
      this.propclass=this.propertyD[0].summary.propclass
      console.log("test",this.oneLine,)
      

    })
  }
 
}
