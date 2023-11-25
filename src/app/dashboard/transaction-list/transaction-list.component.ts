import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { AppService } from 'src/app/app.service';
import { AppStateService } from 'src/app/shared/app-state.service';
import { SharedserviceService } from 'src/app/shared/sharedservice.service';
import { PageServiceService } from 'src/app/theme/pages/page-service.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {

  isDataTableReady = false;
  _subscriberData: any;
  public faqData: Array<any> = [];
  public faqData_isBooked: Array<any> = [];
  catData: any;
  user: any;
  totalItems: any;
  public response: any;
  page = 1;
  filters: { page: number; count: number; search: string; isDeleted: boolean; } =
    { page: this.page, count: 5, search: "", isDeleted: false, };
  ColumnMode = ColumnMode;
  loaderForPrice: any;
  columns = [];
  rows = [];
  loader: any;
  loading: boolean = false;
  selectedfeature: any;
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
    this.getPlans();
    this.get_isBooked_plan();

  }

  getPlans() {
    this.appStateSvc.stateData.loader = true;
    this.pageserviceservice
      .Transaction(this.appStateSvc.stateData.user.id, this.filters)
      .subscribe((response: any) => {
        if (response.data.length == 0) {
          this.faqData = [];
          this.loaderForPrice = false
          this.totalItems = response.total;
        } else {
          this.totalItems = response.total;
          this.appStateSvc.stateData.loader = false;
          this.faqData = response.data.map((cat: any) => {
            console.log(cat.price);
            return {
              id: cat._id,
              txnId: cat.txnId,
              planName: cat.userDetails.planName,
              currency: cat.currency,
              chargeId: cat.chargeId,
              price: cat.amount == 0 ? "Free" : cat.amount,
              userName: cat.userName,
              userDetails: cat.userDetails,
              userId: cat.userId,
              txnStatus: cat.status,
              txnDate: cat.txnDate,

            };
          });
          this.loading = false
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
  setPage(e?: any, type?: any) {
    console.log(e);
    this.page = e.offset + 1;
    Object.assign(this.filters, { page: this.page });
    // let route = '/users/users/' + this.page;
    // this.router.navigate([route]);

    this.getPlans();
  }
  searchValue() {
    this.page = 1;
    Object.assign(this.filters, {
      page: this.page,
      search: this.filters.search,
    });
    this.getPlans();
  }

  clearValue() {
    this.page = 1;
    this.filters.search = "";
    Object.assign(this.filters, {
      page: this.page,
      search: this.filters.search,
    });
    this.getPlans();
  }
}
