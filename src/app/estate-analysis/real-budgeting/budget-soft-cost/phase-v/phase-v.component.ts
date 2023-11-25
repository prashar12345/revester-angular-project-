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
  selector: 'app-phase-v',
  templateUrl: './phase-v.component.html',
  styleUrls: ['./phase-v.component.scss', '../budget-soft-cost.component.scss']
})
export class PhaseVComponent implements OnInit {
  firstForm: boolean;
  secondForm: boolean;
  thirdForm: boolean;
  forthForm: boolean;
  propertySoftPhase_v: FormGroup;
  submitted: boolean;
  isdisabled: any = false
  user: any
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
    this.propertySoftPhase_v = this.fb.group({
      id: ['',],
      rough_electrical_labor_cost: ['',],
      rough_electrical_material_cost: ['',],
      rough_electrical_time_to_complete: ['',],
      rough_electrical_notes: ['',],
      hardwire_fire_labor_cost: ['',],
      hardwire_fire_material_cost: ['',],
      hardwire_fire_time_to_complete: ['',],
      hardwire_fire_notes: ['',],
      finish_electrical_labor_cost: ['',],
      finish_electrical_material_cost: ['',],
      finish_electrical_time_to_complete: ['',],
      finish_electrical_notes: ['',],
      rough_plumbing_labor_cost: ['',],
      rough_plumbing_material_cost: ['',],
      rough_plumbing_time_to_complete: ['',],
      rough_plumbing_notes: ['',],
      finish_plumbing_labor_cost: ['',],
      finish_plumbing_material_cost: ['',],
      finish_plumbing_time_to_complete: ['',],
      finish_plumbing_notes: ['',],
      rough_HVAC_labor_cost: ['',],
      rough_HVAC_material_cost: ['',],
      rough_HVAC_time_to_complete: ['',],

      rough_HVAC_notes: ['',],
      finish_HVAC_labor_cost: ['',],
      finish_HVAC_time_to_complete: ['',],
      finish_HVAC_material_cost: ['',],
      finish_HVAC_notes: ['',],
      chimney_labor_cost: ['',],
      chimney_material_cost: ['',],
      chimney_time_to_complete: ['',],
      chimney_notes: ['',],
      other_labor_cost: ['',],
      other_material_cost: ['',],
      other_time_to_complete: ['',],
      other_notes: ['',],
      other: this.fb.array([])



    });
  }
  get f() { return this.propertySoftPhase_v.controls; }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  ngOnInit(): void {
    if (!this.user?.subscriptionPlan  || !this.user) {
      this.isdisabled = true
      let data = {
        rough_electrical_labor_cost: 34,
        rough_electrical_material_cost: 45,
        rough_electrical_time_to_complete: "7Days",
        rough_electrical_notes: "Notes",
        hardwire_fire_labor_cost: 45,
        hardwire_fire_material_cost: 45,
        hardwire_fire_time_to_complete: "7Days",
        hardwire_fire_notes: "Notes",
        finish_electrical_labor_cost: 45,
        finish_electrical_material_cost: 54,
        finish_electrical_time_to_complete: "7Days",
        finish_electrical_notes: "Notes",
        rough_plumbing_labor_cost: 45,
        rough_plumbing_material_cost: 45,
        rough_plumbing_time_to_complete: "7Days",
        rough_plumbing_notes: "Notes",
        finish_plumbing_labor_cost: 45,
        finish_plumbing_material_cost: 45,
        finish_plumbing_time_to_complete: "7Days",
        finish_plumbing_notes: "Notes",
        rough_HVAC_labor_cost: 54,
        rough_HVAC_material_cost: 45,
        rough_HVAC_time_to_complete: "7Days",

        rough_HVAC_notes: "Notes",
        finish_HVAC_labor_cost: 45,
        finish_HVAC_time_to_complete: "7Days",
        finish_HVAC_material_cost: 45,
        finish_HVAC_notes: "Notes",
        chimney_labor_cost: 45,
        chimney_material_cost: 54,
        chimney_time_to_complete: "7Days",
        chimney_notes: "Notes",
        other_labor_cost: 55,
        other_material_cost: 55,
        other_time_to_complete: "7Days",

        other_notes: "Notes",
      }
      this.propertySoftPhase_v.patchValue(data)
    }

    this.firstForm = true;
    this.appStateSvc.softCostFun$.subscribe(val => {
      this.onSubmit()
    })
    this.addmore()
  }

  onSubmit() {
    this.submitted = true;
    if (this.propertySoftPhase_v.invalid) {
      return;
    }

    console.log(this.propertySoftPhase_v.value);


    this._bs.load(true);
    this.propertySoftPhase_v.value.id = this.appStateSvc.stateData.budgetData.phase_5?.id;
    Object.keys(this.propertySoftPhase_v.value).forEach((key) => (this.propertySoftPhase_v.value[key] == "") && delete this.propertySoftPhase_v.value[key]);
    Object.keys(this.propertySoftPhase_v.value).forEach((key) => (this.propertySoftPhase_v.value[key] == null) && delete this.propertySoftPhase_v.value[key]);
    console.log(this.propertySoftPhase_v.value);



    this.appService.put('phase5', this.propertySoftPhase_v.value).pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
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

    const form = this.propertySoftPhase_v.get('other') as FormArray
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

    const form = this.propertySoftPhase_v.get('course') as FormArray
    form.push(val);

  }
}
