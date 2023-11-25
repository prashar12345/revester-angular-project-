import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { AppStateService } from 'src/app/shared/app-state.service';
import { BehaviorService } from 'src/app/shared/behavior.service';

@Component({
  selector: 'app-phase-i',
  templateUrl: './phase-i.component.html',
  styleUrls: ['./phase-i.component.scss', '../budget-hard-cost.component.scss']
})
export class PhaseIComponent implements OnInit, OnDestroy {
  propertyHardPhase_i: FormGroup;
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
    this.propertyHardPhase_i = this.fb.group({
      id: ['',],
      demolition_labor_cost: ['', []],
      demolition_material_cost: ['', []],
      demolition_time_to_complete: ['', []],
      demolition_notes: ['', []],
      dumpster_labor_cost: ['', []],
      dumpster_material_cost: ['', []],
      dumpster_time_to_complete: ['', []],
      dumpster_notes: ['', []],
      site_prep_labor_cost: ['', []],
      site_prep_material_cost: ['', []],
      site_prep_time_to_complete: ['', []],
      site_prep_notes: ['', []],
      excavation_labor_cost: ['', []],
      excavation_material_cost: ['', []],
      excavation_time_to_complete: ['', []],
      excavation_notes: ['', []],
      backfill_labor_cost: ['', []],
      backfill_material_cost: ['', []],
      backfill_time_to_complete: ['', []],
      backfill_notes: ['', []],
      foundation_labor_cost: ['', []],
      foundation_material_cost: ['', []],
      foundation_time_to_complete: ['', []],
      foundation_notes: ['', []],
      brick_pointing_labor_cost: ['', []],
      brick_pointing_material_cost: ['', []],
      brick_pointing_time_to_complete: ['', []],
      brick_pointing_notes: ['', []],
      framing_labor_cost: ['', []],
      framing_material_cost: ['', []],
      framing_time_to_complete: ['', []],
      framing_notes: ['', []],
      exterior_doors_labor_cost: ['', []],
      exterior_doors_material_cost: ['', []],
      exterior_doors_time_to_complete: ['', []],
      exterior_doors_notes: ['', []],
      roof_labor_cost: ['', []],
      roof_material_cost: ['', []],
      roof_time_to_complete: ['', []],
      roof_notes: ['', []],
      windows_labor_cost: ['', []],
      windows_material_cost: ['', []],
      windows_time_to_complete: ['', []],
      windows_notes: ['', []],
      other_labor_cost: ['', []],
      other_material_cost: ['', []],
      other_time_to_complete: ['', []],
      other_notes: ['', []],
      other: this.fb.array([])

    });
  }
  get f() { return this.propertyHardPhase_i.controls; }


  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  ngOnInit(): void {
    if (!this.user?.subscriptionPlan  || !this.user ) {
      this.isdisabled = true


      let data = {
        demolition_labor_cost: 23,
        demolition_material_cost: 32,
        demolition_time_to_complete: 2 + "Days",
        demolition_notes: "Notes",
        dumpster_labor_cost: 65,
        dumpster_material_cost: 74,
        dumpster_time_to_complete: "5days",
        dumpster_notes: "Notes",
        site_prep_labor_cost: 34,
        site_prep_material_cost: 43,
        site_prep_time_to_complete: 2 + "Days",
        site_prep_notes: "Notes",
        excavation_labor_cost: 32,
        excavation_material_cost: 34,
        excavation_time_to_complete: "5days",
        excavation_notes: "Notes",
        backfill_labor_cost: 32,
        backfill_material_cost: "5days",
        backfill_time_to_complete: "32dys",
        backfill_notes: "Notes",
        foundation_labor_cost: 43,
        foundation_material_cost: 34,
        foundation_time_to_complete: "32dys",
        foundation_notes: "Notes",
        brick_pointing_labor_cost: 43,
        brick_pointing_material_cost: 34,
        brick_pointing_time_to_complete: "32dys",
        brick_pointing_notes: "Notes",
        framing_labor_cost: 34,
        framing_material_cost: 34,
        framing_time_to_complete: "32dys",
        framing_notes: "Notes",
        exterior_doors_labor_cost: 34,
        exterior_doors_material_cost: 34,
        exterior_doors_time_to_complete: "32dys",
        exterior_doors_notes: "Notes",
        roof_labor_cost: 34,
        roof_material_cost: 34,
        roof_time_to_complete: "32dys",
        roof_notes: "Notes",
        windows_labor_cost: 34,
        windows_material_cost: 34,
        windows_time_to_complete: "32dys",
        windows_notes: "Notes",
        // other_labor_cost: 34,
        // other_material_cost:34,
        // other_time_to_complete: "32dys",
        // other_notes: "Notes",
      }
      this.propertyHardPhase_i.patchValue(data)
    }
    this.appStateSvc.softCostFun$.subscribe(val => {
      console.log('phase i onSubmit works')
      this.onSubmit()

    })

    this.addmore()

  }
  onSubmit() {
    this.submitted = true;
    if (this.propertyHardPhase_i.invalid) {
      return;
    }


    this._bs.load(true);
    this.propertyHardPhase_i.value.id = this.appStateSvc.stateData.budgetData.phase_1?.id;
    Object.keys(this.propertyHardPhase_i.value).forEach((key) => (this.propertyHardPhase_i.value[key] == "") && delete this.propertyHardPhase_i.value[key]);
    Object.keys(this.propertyHardPhase_i.value).forEach((key) => (this.propertyHardPhase_i.value[key] == null) && delete this.propertyHardPhase_i.value[key]);
    console.log(this.propertyHardPhase_i.value);


    this.appService.put('phase1', this.propertyHardPhase_i.value).pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
      if (res.success) {
      } else {
        this.toastr.error(res.message)
      }
      this._bs.load(false)
    }, error => {
      this._bs.load(false)
    });

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

    const form = this.propertyHardPhase_i.get('other') as FormArray
    form.push(val);
    console.log(val.value, "value of 1")
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

    const form = this.propertyHardPhase_i.get('course') as FormArray
    form.push(val);

  }
}
