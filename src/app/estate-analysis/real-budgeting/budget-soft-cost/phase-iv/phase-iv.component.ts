import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { AppStateService } from 'src/app/shared/app-state.service';
import { BehaviorService } from 'src/app/shared/behavior.service';

@Component({
  selector: 'app-phase-iv',
  templateUrl: './phase-iv.component.html',
  styleUrls: ['./phase-iv.component.scss', '../budget-soft-cost.component.scss']
})
export class PhaseIvComponent implements OnInit {
  firstForm: boolean;
  secondForm: boolean;
  thirdForm: boolean;
  forthForm: boolean;
  propertySoftPhase_iv: FormGroup;
  submitted: boolean;
  user: any
  isdisabled: any = false
  private destroy$ = new Subject<boolean>();


  constructor(
    private fb: FormBuilder,
    private _bs: BehaviorService,
    private appService: AppService,
    private router: Router,
    private toastr: ToastrService,
    public appStateSvc: AppStateService
  ) {
    this.user = _bs.getLocalUser()
    this.propertySoftPhase_iv = this.fb.group({
      // property_id: ['',],
      id: ['',],
      demolition_labor_cost: ['',],
      demolition_material_cost: ['',],
      demolition_time_to_complete: ['',],
      demolition_notes: ['',],
      mold_retardation_labor_cost: ['',],
      mold_retardation_material_cost: ['',],
      mold_retardation_time_to_complete: ['',],
      mold_retardation_notes: ['',],
      sub_flooring_labor_cost: ['',],
      sub_flooring_material_cost: ['',],
      sub_flooring_time_to_complete: ['',],
      sub_flooring_notes: ['',],
      framing_labor_cost: ['',],
      framing_material_cost: ['',],
      framing_time_to_complete: ['',],
      framing_notes: ['',],
      insulation_labor_cost: ['',],
      insulation_material_cost: ['',],
      insulation_time_to_complete: ['',],
      insulation_notes: ['',],
      other_labor_cost: ['',],
      other_material_cost: ['',],
      other_time_to_complete: ['',],
      other_notes: ['',],
      other: this.fb.array([])
    });
  }
  get f() { return this.propertySoftPhase_iv.controls; }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  ngOnInit(): void {
    if (!this.user?.subscriptionPlan  || !this.user) {
      this.isdisabled = true
      let data = {
        demolition_labor_cost: 23,
        demolition_material_cost: 23,
        demolition_time_to_complete: "9days",
        demolition_notes: "Notes",
        mold_retardation_labor_cost: 23,
        mold_retardation_material_cost: 43,
        mold_retardation_time_to_complete: "9days",
        mold_retardation_notes: "Notes",
        sub_flooring_labor_cost: 34,
        sub_flooring_material_cost: 34,
        sub_flooring_time_to_complete: "9days",
        sub_flooring_notes: "Notes",
        framing_labor_cost: 23,
        framing_material_cost: 23,
        framing_time_to_complete: "9days",
        framing_notes: "Notes",
        insulation_labor_cost: 54,
        insulation_material_cost: 34,
        insulation_time_to_complete: "9days",
        insulation_notes: "Notes",
        other_labor_cost: 34,
        other_material_cost: 34,
        other_time_to_complete: "9days",
        other_notes: "Notes",
      }
      this.propertySoftPhase_iv.patchValue(data)
    }

    this.firstForm = true;
    this.appStateSvc.softCostFun$.subscribe(val => {
      this.onSubmit()
    })
    this.addmore()
  }

  onSubmit() {
    this.submitted = true;
    if (this.propertySoftPhase_iv.invalid) {
      return;
    }

    console.log(this.propertySoftPhase_iv.value);


    this._bs.load(true);
    this.propertySoftPhase_iv.value.id = this.appStateSvc.stateData.budgetData.phase_4?.id;
    Object.keys(this.propertySoftPhase_iv.value).forEach((key) => (this.propertySoftPhase_iv.value[key] == "") && delete this.propertySoftPhase_iv.value[key]);
    Object.keys(this.propertySoftPhase_iv.value).forEach((key) => (this.propertySoftPhase_iv.value[key] == null) && delete this.propertySoftPhase_iv.value[key]);
    console.log(this.propertySoftPhase_iv.value);


    this.appService.put('phase4', this.propertySoftPhase_iv.value).pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
      if (res.success) {
      } else {
        this.toastr.error(res.message)
      }
      this._bs.load(false)
    }, error => {
      this._bs.load(false)
    });

  }
  formFun(name?: any) {
    if (name === 'property_details') {
      this.firstForm = false;
      this.secondForm = true;
    } else if (name === 'hard_cost') {
      this.secondForm = false;
      this.thirdForm = true;
    } else if (name === 'soft_cost') {
      this.thirdForm = false;
      this.forthForm = true;
    }
  }
  value = this.fb.group({
    other_labor_cost: [''],
    other_material_cost: [''],
    other_time_to_complete: [''],
    other_notes: ['']
  });


  addmore() {

    const val = this.fb.group({
      other_labor_cost: [''],
      other_material_cost: [''],
      other_time_to_complete: [''],
      other_notes: ['']
    });

    const form = this.propertySoftPhase_iv.get('other') as FormArray
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
      course: [value.course, Validators.required],
      percentage: [value.percentage, Validators.required]
    });

    const form = this.propertySoftPhase_iv.get('course') as FormArray
    form.push(val);

  }


}
