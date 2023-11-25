import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { AppService } from 'src/app/app.service';
import { AppStateService } from 'src/app/shared/app-state.service';
import { SharedserviceService } from 'src/app/shared/sharedservice.service';
import { PageServiceService } from 'src/app/theme/pages/page-service.service';

@Component({
  selector: 'app-property-view',
  templateUrl: './property-view.component.html',
  styleUrls: ['./property-view.component.scss']
})
export class PropertyViewComponent implements OnInit {


  isDataTableReady=false;
  _subscriberData:any;
  public faqData: Array<any> = [];
  public faqData_isBooked: Array<any> = [];
  catData:any;
  user: any;
  totalItems:any;
  public response: any;
  filters_new: { page: number;pageSize:number; attomId: string } =
  { page: 1,pageSize:5, attomId: '184594075' };
  filters: { page: number;count:number; search: string, isDeleted: boolean } = { page: 1,count:5, search: '', isDeleted: false };
  ColumnMode = ColumnMode;
  loaderForPrice: any;
  columns = [];
  rows = [];
  loader: any;
  loading: boolean = false;
  selectedfeature: any;
  page = 1;
  sortable: any;
  router: any;
  constructor(
    
    private pageserviceservice: PageServiceService,
    private modalService: NgbModal,
    private appService: AppService,
    private sharedserviceService: SharedserviceService,
    public appStateSvc: AppStateService
  ) { 
  }

  ngOnInit(): void {
    this.getPropertyDetails();
    // this.get_isBooked_plan();

  }
  
  getPropertyDetails() {
    this.loading = true
    this.pageserviceservice
    .getPropertyDetails(this.filters_new)
    .subscribe((response:any) => {
      if (response.data.length == 0) {
        this.faqData = [];
        this.loaderForPrice =false
        // this.totalItems = response.total;
      } else {
        this.loaderForPrice =false
        this.loader = false
        this.faqData = response.data.map((cat:any) => {
          console.log(cat.price);
          // this.faqData = cat;
          return {
            // id: cat._id,
            area: cat.area.loctype + cat.area.countrysecsubd + 
            cat.area.countyuse1+ cat.area.muncode+ cat.area.munname+ 
            cat.area.srvyRange+ cat.area.srvySection+ cat.area.srvyTownship+ cat.area.subdname,
            address: cat.address.country,
          };
        });
        this.loading = false
        }
        
    console.log(this.faqData);
    // this.get_isBooked_plan();
      });
}
// get_isBooked_plan()
// {
//   this.faqData.forEach(element => {
//     if(element.isBooked == true)
//     {
//      this.faqData_isBooked.push(element);
//     }
//     this.isDataTableReady = true;
//     console.log(this.faqData_isBooked);
//   });

// }
setPage(e: { offset: number; }) {
  console.log(e);
  this.page = e.offset + 1;
  Object.assign(this.filters, { page: this.page });
  let route = "/blogs/blog/" + this.page;
  this.router.navigate([route]);
  this.getPropertyDetails();
}

searchValue() {
  this.page = 1;
  Object.assign(this.filters, {
    page: this.page,
    search: this.filters.search,
  });
  this.getPropertyDetails();
}

clearValue() {
  this.page = 1;
  this.filters.search = "";
  Object.assign(this.filters, {
    page: this.page,
    search: this.filters.search,
  });
  this.getPropertyDetails();
}
}
