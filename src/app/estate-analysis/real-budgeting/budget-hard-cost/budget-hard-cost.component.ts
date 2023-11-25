import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { AppStateService } from 'src/app/shared/app-state.service';
import { BehaviorService } from 'src/app/shared/behavior.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-budget-hard-cost',
  templateUrl: './budget-hard-cost.component.html',
  styleUrls: ['./budget-hard-cost.component.scss']
})
export class BudgetHardCostComponent implements OnInit, OnDestroy {
  propertyHardCost: FormGroup;
  submitted: boolean;
  showButton: any = true
  isdisabled: any = false
  user: any
  api = environment.apiUrl
  card_added: any = false
  pdf: any = false
  propertyid:any
totalAmount:any
totalHardCost:any
totalSoftCost:any
totalPropertyCost:any
data:any
showtrue:any=false
  private destroy$ = new Subject<boolean>();
  constructor(
    private fb: FormBuilder,
    private _bs: BehaviorService,
    private appService: AppService,
    private router: Router,
    private toastr: ToastrService,
    public appStateSvc: AppStateService
  ) {

    this._bs.documentReturn().subscribe((res: any) => {
      console.log("hii result",res)
      this.showtrue=res
    
    });

    this.user = _bs.getLocalUser()
    this.propertyHardCost = this.fb.group({

   


      id: ['',],
      current_property_type: ['',],
      rehabbed_property_type: ['',],
      permit_price: ['',],
      permit_notes: ['',],
      plans_price: ['',],
      plans_notes: ['',],
      survey_price: ['',],
      survey_notes: ['',],
      other_price: ['',],
      other_notes: ['',],
      // other_labor_cost: ['',],
      // other_material_cost: [''],
      other: this.fb.array([])
    });
  }
  get f() { return this.propertyHardCost.controls; }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  ngOnInit(): void {
    this.addmore()
    if (!this.user?.subscriptionPlan  || !this.user) {
      this.isdisabled = true

      let data = {
        current_property_type: 1,
        rehabbed_property_type: "Permits",
        permit_price: 22,
        permit_notes: "Plans",
        plans_price: 32,
        plans_notes: "Surveys",
        survey_price: 23,
        survey_notes: "Permits",
        other_price: 43,
        other_notes: "Permits",
        // other_labor_cost: 33,
        // other_material_cost: "Permits",

      }
      this.propertyHardCost.patchValue(data)

    }

  }

  onSubmit() {
    this.submitted = true;
    if (this.propertyHardCost.invalid) {
      return;
    }

    this.appStateSvc.hardCost();
    this._bs.load(true);
    this.propertyHardCost.value.id = this.appStateSvc.stateData.budgetData.soft_cost?.id;
    Object.keys(this.propertyHardCost.value).forEach((key) => (this.propertyHardCost.value[key] == "") && delete this.propertyHardCost.value[key]);
    Object.keys(this.propertyHardCost.value).forEach((key) => (this.propertyHardCost.value[key] == null) && delete this.propertyHardCost.value[key]);
    console.log(this.propertyHardCost.value);

    this.appService.put('update/softcost', this.propertyHardCost.value).subscribe((res: any) => {
      if (res.success) {
        console.log(res,"this is the result")

      this.propertyid = res.data.property_id
      console.log(this.propertyid, "ye hai result ")
     
        this.toastr.success("SoftCost updated successfully")
        this.showButton = false
        this.appStateSvc.setState({
          budgetHardCostSubmit: true
       
        })
      } else {
        this.toastr.error(res.message)
      }
      this._bs.load(false)
    }, error => {
      this._bs.load(false)
    });

  }
  value = this.fb.group({
    other_price: [''],
    other_notes: [''],

  });

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

        const result=this.data
        this._bs.shareId(result)
      }
      console.log(this.data);
      this._bs.load(false)
    })

    console.log(this.data);
    this._bs.load(false)

  }
  

  addmore() {

    const val = this.fb.group({
      other_price: [''],
      other_notes: [''],
    });

    const form = this.propertyHardCost.get('other') as FormArray
    form.push(val);
    console.log(val.value)
    // this.appService.get('phase1',).subscribe((result:any)=>{
    //   console.log(result)
    // })
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  addmore1(value: any) {

    const val = this.fb.group({
      other_price: [''],
      other_notes: [''],
    });

    const form = this.propertyHardCost.get('other') as FormArray
    form.push(val);

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
  pay_subscription() {
    this.router.navigate(['/subscriptionplan']);
  }
}
