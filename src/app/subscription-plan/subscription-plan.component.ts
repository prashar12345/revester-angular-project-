import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AppStateService } from '../shared/app-state.service';
import { SharedserviceService } from '../shared/sharedservice.service';
import { PageServiceService } from '../theme/pages/page-service.service';

@Component({
  selector: 'app-subscription-plan',
  templateUrl: './subscription-plan.component.html',
  styleUrls: ['./subscription-plan.component.scss']
})
export class SubscriptionPlanComponent implements OnInit {
  actionType: any = "active";
  public faqData: Array<any> = [];
  public PlanTypedata: Array<any> = [];
  public response: any;
  public PaidPlan: Array<any> = [];
  public freePlan: Array<any> = [];
  public response2: any;
  totalItems: any
  loader: boolean = false
  rows = [];
  public customer_id: any;
  columns = [];
  selectedfeature: any
  paymentModal: Boolean = false;
  _subscriberData: any;
  isLoading: boolean = false;
  cardModal: Boolean = false;
  loginModal: Boolean = false;
  card_added: Boolean = false;
  addcardModal: Boolean = false;
  addcardModal_new: Boolean = false;
  addpaymentModal: Boolean = false;
  page = 1;
  isDeleted = false;
  filters: { search: string; isDeleted: boolean; userId: any; } =
    { search: "", isDeleted: false, userId: "" };
  arrr: any;
  Decription: any = [];
  finalfeature: any = []
  addcardform: FormGroup
  submitted: any
  user: any;
  cardId: any;
  val: any = [];
  pricedata: any;
  loaderpayment: boolean = false;
  paidPlandata: any = [];
  paidPlanfetature: any = [];
  freePlanData: any = [];
  GoldPlan: any = [];
  loaderForPrice: boolean = false;
  cardDetails: any = [];
  all_cards: any;
  card_details: any;

  constructor(
    private sharedserviceService: SharedserviceService,
    private pageserviceservice: PageServiceService,
    private formBuilder: FormBuilder,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private router: Router,
    private _activateRouter: ActivatedRoute,
    public appStateSvc: AppStateService) {
    this.user = localStorage.getItem('credentials')
    this.user = JSON.parse(this.user)
    this.addcardform = this.fb.group({
      ownerName: ['', [Validators.required, Validators.maxLength(20)]],
      cardNumber: ['', [Validators.required, Validators.minLength(14), Validators.pattern("^[0-9]*$")]],
      expMonth: [
        "",
        [
          Validators.required,
          Validators.minLength(2), Validators.pattern("^[0-9]*$")
        ]
      ],

      expYear: [
        "",
        [
          Validators.required,
          Validators.minLength(4), Validators.pattern("^[0-9]*$")

        ],
      ],
      cvc: ["", [Validators.required, Validators.minLength(3), Validators.pattern("^[0-9]*$")]],
      // address: ["", [Validators.required]],
      id: [this.user?.id]
    },

    )
  }

  ngOnInit(): void {
    this.getPlans()
    this.getDetailPlanType()
    this.getAllCard();
  }





  getPlans() {
    // this.appStateSvc.stateData.loader = true
    if (this.user !== null) {
      this.filters.userId = this.appStateSvc.stateData.user.id
      console.log(this.filters)
      this.pageserviceservice
        .getAllPlans(this.filters)
        .subscribe((response: any) => {
          console.log("data of responce",response)
          if (response.data.length == 0) {
            this.faqData = [];
            // this.totalItems = response.total;
          } else {
            this.appStateSvc.stateData.loader = false;
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
          this.faqData.forEach((data) => {
            this.selectedfeature = data.features
            console.log(data)
            if (data.planType == "paid") {
              this.paidPlandata.push(data)
            } if (data.planType == "free") {
              this.freePlanData.push(data)
            } if (data.planType == "premium plan") {
              this.GoldPlan.push(data)
            }
            // this.loaderForPrice = false
          })

          console.log(this.paidPlandata, "this.paidPlan",)
          console.log(this.freePlanData, "this.freeplan")
          console.log(this.GoldPlan, "this.GoldPlan")

        });
    } else {
      this.pageserviceservice
        .getAllPlans(this.filters)
        .subscribe((response: any) => {
          if (response.data.length == 0) {
            this.faqData = [];
            // this.totalItems = response.total;
          } else {
            this.appStateSvc.stateData.loader = false

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
          this.faqData.forEach((data) => {
            this.selectedfeature = data.features
            if (data.planType == "paid") {
              this.paidPlandata.push(data)
            } if (data.planType == "free") {
              this.freePlanData.push(data)
            } if (data.name == "premium plan") {
              this.GoldPlan.push(data)
            }
            this.loaderForPrice = false
          })

          console.log(this.paidPlandata, "this.paidPlan",)
          console.log(this.freePlanData, "this.freeplan")
          console.log(this.GoldPlan, "this.GoldPlan")

        });
    }

  }
  getDetailPlanType() {
    // this.spinner.show();
    this.pageserviceservice.getDetailPlanType().subscribe((res: any) => {
      if (res.success) {
        this.PlanTypedata = res.data
        // console.log(this.PlanTypedata,)
        // .map((cat:any) => {
        //   return {
        //     id: cat._id,
        //     type: cat.type,
        //     description: cat.description,
        //     name: cat.name
        //   };
        // });
        // console.log( this.selectedfeature)
        // this.selectedfeature.forEach((data:any) => {
        // this.PlanTypedata.forEach((element) => {
        //   if(element.name.includes(data))
        //   this.finalfeature.push(element)
        //   console.log(data)

        //   });
        // });
        // console.log(this.finalfeature)
      } else {
        // this.ngxNotificationMsgService.open({
        //   status: NgxNotificationStatusMsg.FAILURE,
        //   header: '',
        //   messages: [res.error.message]
        // });
        // this.toastr.error(res.error.message, 'Error');
      }
      // this.spinner.hide();
    },
      // error => {
      //   this.spinner.hide();
      //   this.ngxNotificationMsgService.open({
      //     status: NgxNotificationStatusMsg.FAILURE,
      //     header: '',
      //     messages: [error]
      //   }
      //   );
      //   // this.toastr.error(error, 'Error');
      // }
    );
  }
  getAllCard() {
    if (this.user !== null) {
      this.sharedserviceService.getAllCard().subscribe((response: any) => {
        // this.customer_id=response.data.customerId;
        this.all_cards = response;
        this.card_details = response.data.cards;
        this.customer_id = response.data.customerId;
        // this.cardId = "card_1L1OUzSFlLKOV69ugoSGO45v";
        console.log(this.all_cards.data.cards);

      });
    }

  }
  openCardModal(data: any) {
    if (this.user !== null) {

      console.log(data, "itemitemitemitemitem")
      this.pricedata = data
      console.log(this.card_details);
      console.log(this.all_cards);
      if (this.all_cards.data.cards !== null) {
        this.openAddcardModal_new();
        this.all_cards.data.cards.forEach((element: any) => {
          if (element.isDefault == true) {
            this.cardId = element.cardId;
            console.log(this.cardId);
          }
        });
        this.make_default();
      } else {
        this.cardModal = true
      }
    } else {
      this.loginModal = true
    }

  }
  savecard() {
    this.submitted = true;
    if (this.addcardform!.invalid) {
      return;
    }
    this.loaderpayment = true;
    // this.loader = true;
    this.pageserviceservice
      .savecard(this.addcardform.value)
      .subscribe((response: any) => {
        console.log(response, "response 1")
        if (response.success == true) {
          console.log("in if 1")
          this.cardId = response.cardId
          console.log("test", this.cardId)
          this.sharedserviceService.getAllCard().subscribe((response: any) => {
            this.customer_id = response.data.customerId;
            console.log(this.customer_id);
            this.Paynow()
          });

          this.loaderpayment = false;

        }
        else {
          console.log("in else 1")
          this.loaderpayment = false;
        }



      },
        error => {
          console.log(error);

          this.loaderpayment = false;
        }
      );
  }

  save_card() {
    this.submitted = true;
    if (this.addcardform!.invalid) {
      return;
    }
    this.loaderpayment = true;
    // this.loader = true;
    this.pageserviceservice
      .savecard(this.addcardform.value)
      .subscribe((response: any) => {
        console.log(response, "response 1")
        if (response.success == true) {
          console.log("in if 1")
          this.cardId = response.cardId
          console.log("test", this.cardId)
          this.sharedserviceService.getAllCard().subscribe((response: any) => {
            this.customer_id = response.data.customerId;
            console.log(this.customer_id);
            this.cardAdded()
          });

          this.loaderpayment = false;

        }
        else {
          console.log("in else 1")
          this.loaderpayment = false;
        }



      },
        error => {
          console.log(error);

          this.loaderpayment = false;
        }
      );
  }

  openLoginModal() {
    this.getcarddetails()
  }
  make_default() {
    if (this.user !== null) {
      console.log(this.cardId);
      const object = { "cardId": this.cardId };
      this.sharedserviceService.make_card_default(object).subscribe((response: any) => {
        // this.customer_id=response.data.customerId;
        console.log(response);
      });
    }
  }
  getcarddetails() {
    console.log("test", this.cardId)
    this.pageserviceservice
      .getcarddetails(this.cardId)
      .subscribe((response: any) => {
        console.log(response, "response 1")
        if (response.success == true) {
          this.cardDetails = response
          console.log(this.cardDetails, "card data ")
        }
        else {
        }



      },
        error => {
          console.log(error);
        }
      );
  }
  onItemChange(value: any) {
    this.cardId = value;
    this.make_default();
    console.log(" Value is : ", value);
  }
  Paynow() {
    this.loaderpayment = true;
    // this.loader = true
    const obj = {
      "plan_id": this.pricedata.id,
      "subscriptionPlanID": this.pricedata.stripePlanId,
      "user_id": this.appStateSvc.stateData.user.id,
      "customer_id": this.customer_id,
      "amount": this.pricedata.price
    }
    console.log(this.addcardform.value)
    this.pageserviceservice
      .Paynow(obj)
      .subscribe((response: any) => {
        console.log(response, "response 2")
        const state =  this.appStateSvc.stateData
        if (response.success == true) {
          this.appStateSvc.setState({
            subcriptionStatus: true,
          })
          state.user.subscriptionPlan = response.response.id;
          localStorage.setItem("credentials", JSON.stringify(state.user));
          console.log("in if 2")
          this.loaderpayment = false
          this.paymentModal = true
          this.cardModal = false
          this.addcardModal_new = false
          this.addcardform.reset()
          
        }
        else {
          console.log("in else 2")
          this.loaderpayment = false
        }
      });
  }

  onSubmit() {
    this.submitted = true;
    if (this.addcardform.invalid) {
      return;
    }
  }
  get f() {
    return this.addcardform.controls;
  }


  openpaymentModal() {
    this.router.navigateByUrl('/')
  }
  clickdata() {
    this.router.navigateByUrl('/')
  }



  openAddpaymentModal() {
    this.addpaymentModal = true
  }



  openAddcardModal() {
    this.addcardModal = true
    // this.getcarddetails()
  }
  openAddcardModal_new() {
    this.addcardModal_new = true
    // this.getcarddetails()
  }

  cardAdded(): any {
    this.cardModal = false
    this.card_added = true
    this.getAllCard();
    // this.getcarddetails()
  }
  click_added(): any {
    this.card_added = false
    this.cardModal = false
    // this.getcarddetails()
  }
  save_card_new() {
    this.cardModal = true
    this.addcardModal_new = false
  }



  contactuspage() {
    this.router.navigateByUrl('contact-us')
  }
  close_cardModal() {
    this.cardModal = false
    this.addcardform.reset()
  }
}




