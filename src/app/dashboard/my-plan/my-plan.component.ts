import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from "@swimlane/ngx-datatable";
import { AppService } from 'src/app/app.service';
import { AppStateService } from 'src/app/shared/app-state.service';
import { SharedserviceService } from 'src/app/shared/sharedservice.service';
import { PageServiceService } from 'src/app/theme/pages/page-service.service';

@Component({
  selector: 'app-my-plan',
  templateUrl: './my-plan.component.html',
  styleUrls: ['./my-plan.component.scss']
})
export class MyPlanComponent implements OnInit {
  isDataTableReady = false;
  _subscriberData: any;
  public faqData: Array<any> = [];
  public faqData_isBooked: Array<any> = [];
  catData: any;
  totalItems: any;
  public response: any;
  filters: { search: any; isDeleted: boolean; userId: any; } =
    { search: "", isDeleted: false, userId: "" };
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
  shineItem: number[];
  constructor(

    private pageserviceservice: PageServiceService,
    private modalService: NgbModal,
    private appService: AppService,
    private sharedserviceService: SharedserviceService,
    public appStateSvc: AppStateService
  ) {
  }

  ngOnInit(): void {
    this.getPlans();
    this.get_isBooked_plan();

  }

  getPlans() {
    this.appStateSvc.stateData.loader = true

    this.filters.userId = this.appStateSvc.stateData.user.id
    this.pageserviceservice
      .getAllPlans(this.filters)
      .subscribe((response: any) => {
        if (response.data.length == 0) {
          this.faqData = [];
          // this.totalItems = response.total;
        } else {
          this.appStateSvc.stateData.loader = false
          this.loader = false
          this.faqData = response.data.map((cat: any) => {
            return {
              id: cat._id,
              name: cat.name,
              status: cat.status,
              createdAt: cat.createdAt,
              price: cat.price == 0 ? "Free" : cat.price,
              planType: cat.planType,
              stripePlanId: cat.stripePlanId,
              features: cat.features,
              planInterval: cat.planInterval,
              isBooked: cat.isBooked

            };
          });
        }
        console.log(this.faqData);
        this.get_isBooked_plan();
      });
  }
  get_isBooked_plan() {
    this.faqData.forEach(element => {
      if (element.isBooked == true) {
        this.faqData_isBooked.push(element);
      }
      this.isDataTableReady = true;
      console.log(this.faqData_isBooked);
    });

  }
  setPage(e: { offset: number; }) {
    console.log(e);
    this.page = e.offset + 1;
    Object.assign(this.filters, { page: this.page });
    let route = "/blogs/blog/" + this.page;
    this.router.navigate([route]);
    this.get_isBooked_plan();
  }

  searchValue() {
    this.page = 1;
    Object.assign(this.filters, {
      page: this.page,
      search: this.filters.search,
    });
    this.get_isBooked_plan();
  }

  clearValue() {
    this.page = 1;
    this.filters.search = "";
    Object.assign(this.filters, {
      page: this.page,
      search: this.filters.search,
    });
    this.get_isBooked_plan();
  }
}
