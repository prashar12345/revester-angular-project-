import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { AppService } from 'src/app/app.service';
import { AppStateService } from 'src/app/shared/app-state.service';
import { SharedserviceService } from 'src/app/shared/sharedservice.service';
import { PageServiceService } from 'src/app/theme/pages/page-service.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {
  items = [
    { name: "archie" },
    { name: "jake" },
    { name: "richard" }];
  filterItem: any = ''

  filters: { page: number; pageSize: number; postalcode: any; propetyType: any; } =
    { page: 1, pageSize: 10, postalcode: '', propetyType: '' };


  public propertyData: Array<any> = [];
  catData: any;
  user: any;
  totalItems: any;
  public response: any;
  ColumnMode = ColumnMode;
  userId: any;
  columns = [];
  rows = [];
  selectedfeature: any;
  page = 1;
  sortable: any;
  search_Data: any;
  freeSearch: boolean = false;
  allPlanState: any;
  isDataTableReady: boolean = false;
  constructor(
    private pageserviceservice: PageServiceService,
    private modalService: NgbModal,
    private appService: AppService,
    private router: Router,
    private sharedserviceService: SharedserviceService,
    public appStateSvc: AppStateService) {

  }

  ngOnInit(): void {
    this.appStateSvc.propertySearchFree$.subscribe(val => {
      console.log(this.appStateSvc.stateData)
      this.filters.postalcode = this.appStateSvc.stateData.postalCode;
      // this.getPropertylist();
    })
    this.getPropertylist();
  }
  appStateSvcEvent() {
    // console.log(this.appStateSvc.stateData)
    // this.filters.postalcode = this.appStateSvc.stateData.postalCode;
    // this.getPropertylist();

  }
  getPropertylist() {
    this.appStateSvc.stateData.loader = true;
    if (!this.appStateSvc.stateData.freeSearch) {
      console.log('if');
      this.pageserviceservice
        .getPropertyListAll(this.filters)
        .subscribe((response: any) => {
          console.log(response);
          if (response.data.length == 0) {
            this.propertyData = [];
            this.totalItems = response.totalResult;
            this.isDataTableReady = true;
          } else {
            this.totalItems = response.totalResult;
            this.appStateSvc.stateData.loader = false
            this.isDataTableReady = true;
            this.propertyData = response.data.map((cat: any) => {
              console.log(cat);
              return {
                address: cat.address.country + cat.address.countrySubd + cat.address.line1 + cat.address.line2
                  + cat.address.locality + cat.address.matchCode + cat.address.oneLine
                  + cat.address.postal1 + cat.address.postal2 + cat.address.postal3,
                identifier: cat.identifier.attomId,
                location: cat.location.accuracy + ', lat -> ' + cat.location.latitude + ', long -> ' + cat.location.longitude
              };
            });

          }
          console.log("this.propertyData", this.propertyData)
        })

    } else {
      console.log('else');
      this.pageserviceservice
        .getPropertyList(this.filters)
        .subscribe((response: any) => {
          console.log(response);
          if (response.data.length == 0) {
            this.totalItems = response.totalResult;
            this.propertyData = [];
            this.isDataTableReady = true;
          } else {
            this.appStateSvc.stateData.loader = false
            this.totalItems = response.totalResult;
            this.isDataTableReady = true;

            this.propertyData = response.data.map((cat: any) => {
              console.log(cat);
              return {
                address: cat.address.country + cat.address.countrySubd + cat.address.line1 + cat.address.line2
                  + cat.address.locality + cat.address.matchCode + cat.address.oneLine
                  + cat.address.postal1 + cat.address.postal2 + cat.address.postal3,
                identifier: cat.identifier.attomId,
                location: cat.location.accuracy + ', lat -> ' + cat.location.latitude + ', long -> ' + cat.location.longitude
              };
            });

          }
          console.log("this.propertyData", this.propertyData)
        })
    }
  }
  getAllPlanState() {
    // this.spinner.show();
    this.appService.getAllPlanState('property/state').subscribe((res: any) => {
      if (res.success) {
        this.allPlanState = res.data.item
      }
      // console.log(this.allPlanState);
    });

  }


  viewDetail(userID?: any, type?: any) {
    // console.log(userID);
    // this.userService.actionType.next(type);
    let route = "/property-list/" + userID;
    this.router.navigate([route]);
  }
  onSubmit() {

  }
  setPage(e: any) {
    // console.log(e);
    this.page = e.offset + 1;
    Object.assign(this.filters, { page: this.page });
    // let route = '/users/users/' + this.page;
    // this.router.navigate([route]);

    this.getPropertylist();
  }


  searchValue() {
    this.page = 1;
    Object.assign(this.filters, {
      page: this.page,
      // search: this.filters.search,
    });
    this.getPropertylist();
  }

  clearValue() {
    this.page = 1;
    // this.filters.search = "";
    Object.assign(this.filters, {
      page: this.page,
      // search: this.filters.search,
    });
    this.getPropertylist();
  }

}
