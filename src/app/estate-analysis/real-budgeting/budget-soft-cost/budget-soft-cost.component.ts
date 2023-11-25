import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { AppStateService } from 'src/app/shared/app-state.service';
import { BehaviorService } from 'src/app/shared/behavior.service';
import { environment } from 'src/environments/environment';
// import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-budget-soft-cost',
  templateUrl: './budget-soft-cost.component.html',
  styleUrls: ['./budget-soft-cost.component.scss']
})
export class BudgetSoftCostComponent implements OnInit {
  loginModal: boolean = false;
  firstForm: boolean;
  secondForm: boolean;
  thirdForm: boolean;
  totalPropertyCost: any
  totalSoftCost: any
  allproperty:any
  forthForm: boolean;
  propertySoftCost: FormGroup;
  compare: any
  totalHardCost: any
  totalAmount: any
  showfield: any = true
  card_added: any = false
  submitted: boolean;
  currentDate = new Date()
  data: any
  user: any
  showButton = true
  pdf: any = false
  propertyid: any
  api = environment.apiUrl

  constructor(
    private fb: FormBuilder,
    private _bs: BehaviorService,
    private appService: AppService,
    private router: Router,
    private toastr: ToastrService,
    public appStateSvc: AppStateService
  ) {

    this.user = this._bs.getLocalUser()
    console.log(this.user)
    this.propertySoftCost = this.fb.group({
      id: ['',],
      permit_price: ['',],
      permit_notes: ['',],
      plans_price: ['',],
      plans_notes: ['',],
      survey_price: ['',],
      survey_notes: ['',],
      // other_price: ['',],
      // other_notes: ['',],
      // other_labor_cost: ['',],
      // other_material_cost: ['',],

      other: this.fb.array([])
    });
  }
  get f() { return this.propertySoftCost.controls; }


  ngOnInit(): void {
    // this.getData()
    // this.getPdf()
    if (!this.user?.subscriptionPlan || !this.user) {

      let data = {
        permit_price: 65,
        permit_notes: "Permits",
        plans_price: 65,
        plans_notes: "Permits",
        survey_price: 65,
        survey_notes: "Plans",
        other_price: 65,
        other_notes: "Surveys",
        other_labor_cost: 65,
        other_material_cost: "Surveys",
      }
      this.propertySoftCost.patchValue(data)
    }
    this.addmore()
    this.compare = new Date(this.user.validupto)
  }






  onSubmit() {
    this.submitted = true;
    if (this.propertySoftCost.invalid) {
      return;
    }

    this.appStateSvc.softCost()
    this._bs.load(true);
    this.propertySoftCost.value.id = this.appStateSvc.stateData.budgetData.hard_cost?.id;
    Object.keys(this.propertySoftCost.value).forEach((key) => (this.propertySoftCost.value[key] == "") && delete this.propertySoftCost.value[key]);
    Object.keys(this.propertySoftCost.value).forEach((key) => (this.propertySoftCost.value[key] == null) && delete this.propertySoftCost.value[key]);

    console.log(this.propertySoftCost.value);

    this.appService.put('update/hardcost', this.propertySoftCost.value).subscribe((res: any) => {

      this.propertyid = res.data.property_id
      console.log(this.propertyid, "ye hai result ")

      if (res.success) {
        this.toastr.success("HardCost updated successfully")
        this.getPdf()
        // this.getData()
        this.appStateSvc.setState({
          budgetHardCostSubmit: true
        })


        this.showButton = false
        this.showfield = false

      } else {
        this.toastr.error("res.message")
      }

    }, error => {

    });

  }

  // getimg(img:any){


  //   let value = '/assets/img/dummyLogo.png'
  //   if(img){
  //    value = this.api+img
  //   }
  //   return value
  // }

  addmore() {

    const val = this.fb.group({
      other_labor_cost: [''],
      other_material_cost: [''],
    });

    const form = this.propertySoftCost.get('other') as FormArray
    form.push(val);
    // this.appService.get('phase1',).subscribe((result:any)=>{
    //   console.log(result)
    // })
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  addmore1(value: any) {

    const val = this.fb.group({
      other_labor_cost: [''],
      other_material_cost: [''],
    });

    const form = this.propertySoftCost.get('course') as FormArray
    form.push(val);

  }


  getPdf() {
    this._bs.load(true);
    console.log(this.propertyid, "may be its property id")
    let filter: any =
    {
      id: this.propertyid

    }
    this._bs.load(true)
    this.appService.getAll('pdf', filter).subscribe(res => {
      if (res.success) {
        this.data = res.data
        this.totalAmount = res.totalAmount
        this.totalHardCost = res.totalHardCost
        this.totalSoftCost = res.totalSoftCost
        this.totalPropertyCost = res.totalPropertyCost
        this.pdf = true
        console.log(this.data)
       
      }
      console.log(this.data);
      this._bs.load(false)
    })

    console.log(this.data);
    this._bs.load(false)

  }
  
  pay_subscription() {
    this.router.navigate(['/subscriptionplan']);
  }
  show() {
    if (!this.user?.subscriptionPlan  || !this.user) {
      this.card_added = true;
    }
    else {
      var URL = this.api + this.data
      window.open(URL);
    }
  }

  getData() {
    this._bs.load(true)
    this.appService.getAll('properties/dropdown').subscribe((res: any) => {
      if (res.success) {
     this.allproperty=res.data
       
      }
      this._bs.load(false)
      })
  
  }
}
