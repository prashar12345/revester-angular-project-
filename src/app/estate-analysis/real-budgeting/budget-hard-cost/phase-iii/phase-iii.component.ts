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
  selector: 'app-phase-iii',
  templateUrl: './phase-iii.component.html',
  styleUrls: ['./phase-iii.component.scss', '../budget-hard-cost.component.scss']
})
export class PhaseIiiComponent implements OnInit {
  propertyHardPhase_iii: FormGroup;
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
    this.propertyHardPhase_iii = this.fb.group({
      id: ['',],
      garage_doors_labor_cost: ['', []],
      garage_doors_material_cost: ['', []],
      garage_doors_time_to_complete: ['', []],
      garage_doors_notes: ['', []],
      driveway_labor_cost: ['', []],
      driveway_material_cost: ['', []],
      driveway_time_to_complete: ['', []],
      driveway_notes: ['', []],
      sidewalks_labor_cost: ['', []],
      sidewalks_material_cost: ['', []],
      sidewalks_time_to_complete: ['', []],
      sidewalks_notes: ['', []],
      fencing_labor_cost: ['', []],
      fencing_material_cost: ['', []],
      fencing_time_to_complete: ['', []],
      fencing_notes: ['', []],
      septic_labor_cost: ['', []],
      septic_material_cost: ['', []],
      septic_time_to_complete: ['', []],
      septic_notes: ['', []],
      landscaping_labor_cost: ['', []],
      landscaping_material_cost: ['', []],
      landscaping_time_to_complete: ['', []],
      landscaping_notes: ['', []],
      other_labor_cost: ['', []],
      other_material_cost: ['', []],
      other_time_to_complete: ['', []],
      other_notes: ['', []],
      other: this.fb.array([])
    });
  }
  get f() { return this.propertyHardPhase_iii.controls; }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  ngOnInit(): void {
    if (!this.user?.subscriptionPlan  || !this.user) {
      this.isdisabled = true
      let data = {
        garage_doors_labor_cost: 56,
        garage_doors_material_cost: 56,
        garage_doors_time_to_complete: "9days",
        garage_doors_notes: "notes",
        driveway_labor_cost: 56,
        driveway_material_cost: 56,
        driveway_time_to_complete: "9days",
        driveway_notes: "notes",
        sidewalks_labor_cost: 56,
        sidewalks_material_cost: 56,
        sidewalks_time_to_complete: "9days",
        sidewalks_notes: "notes",
        fencing_labor_cost: 56,
        fencing_material_cost: 56,
        fencing_time_to_complete: "9days",
        fencing_notes: "notes",
        septic_labor_cost: 56,
        septic_material_cost: 56,
        septic_time_to_complete: "9days",
        septic_notes: "notes",
        landscaping_labor_cost: 56,
        landscaping_material_cost: 56,
        landscaping_time_to_complete: "9days",
        landscaping_notes: "notes",
        other_labor_cost: 56,
        other_material_cost: 56,
        other_time_to_complete: "9days",
        other_notes: "notes",

      }
      this.propertyHardPhase_iii.patchValue(data)
    }
    this.appStateSvc.softCostFun$.subscribe(val => {
      console.log('phase iii onSubmi works')
      this.onSubmit()
    })
    this.addmore()

  }

  onSubmit() {
    this.submitted = true;
    if (this.propertyHardPhase_iii.invalid) {
      return;
    }



    this._bs.load(true);
    this.propertyHardPhase_iii.value.id = this.appStateSvc.stateData.budgetData.phase_3?.id;

    Object.keys(this.propertyHardPhase_iii.value).forEach((key) => (this.propertyHardPhase_iii.value[key] == "") && delete this.propertyHardPhase_iii.value[key]);
    Object.keys(this.propertyHardPhase_iii.value).forEach((key) => (this.propertyHardPhase_iii.value[key] == null) && delete this.propertyHardPhase_iii.value[key]);
    console.log(this.propertyHardPhase_iii.value);


    this.appService.put('phase3', this.propertyHardPhase_iii.value).pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
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

    const form = this.propertyHardPhase_iii.get('other') as FormArray
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

    const form = this.propertyHardPhase_iii.get('course') as FormArray
    form.push(val);

  }




}
