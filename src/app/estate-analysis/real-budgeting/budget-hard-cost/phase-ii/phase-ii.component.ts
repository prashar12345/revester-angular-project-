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
  selector: 'app-phase-ii',
  templateUrl: './phase-ii.component.html',
  styleUrls: ['./phase-ii.component.scss', '../budget-hard-cost.component.scss']
})
export class PhaseIiComponent implements OnInit {
  propertyHardPhase_ii: FormGroup;
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
    this.propertyHardPhase_ii = this.fb.group({
      id: ['',],
      siding_labor_cost: ['', []],
      siding_material_cost: ['', []],
      siding_time_to_complete: ['', []],
      siding_notes: ['', []],
      gutters_labor_cost: ['', []],
      gutters_material_cost: ['', []],
      gutters_time_to_complete: ['', []],
      gutters_notes: ['', []],
      exterior_paint_labor_cost: ['', []],
      exterior_paint_material_cost: ['', []],
      exterior_paint_time_to_complete: ['', []],
      exterior_paint_notes: ['', []],
      masonry_labor_cost: ['', []],
      masonry_material_cost: ['', []],
      masonry_time_to_complete: ['', []],
      masonry_notes: ['', []],
      deck_labor_cost: ['', []],
      deck_material_cost: ['', []],
      deck_time_to_complete: ['', []],
      deck_notes: ['', []],
      other_labor_cost: ['', []],
      other_material_cost: ['', []],
      other_time_to_complete: ['', []],
      other_notes: ['', []],
      other: this.fb.array([])
    });
  }
  get f() { return this.propertyHardPhase_ii.controls; }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  ngOnInit(): void {
    if (!this.user?.subscriptionPlan  || !this.user) {
      this.isdisabled = true
      let data = {
        siding_labor_cost: 56,
        siding_material_cost: 45,
        siding_time_to_complete: "7days",
        siding_notes: "notes",
        gutters_labor_cost: 56,
        gutters_material_cost: 56,
        gutters_time_to_complete: "7days",
        gutters_notes: "notes",
        exterior_paint_labor_cost: 56,
        exterior_paint_material_cost: 56,
        exterior_paint_time_to_complete: "7days",
        exterior_paint_notes: "notes",
        masonry_labor_cost: 56,
        masonry_material_cost: 56,
        masonry_time_to_complete: "7days",
        masonry_notes: "notes",
        deck_labor_cost: 56,
        deck_material_cost: 56,
        deck_time_to_complete: "7days",
        deck_notes: "notes",
        other_labor_cost: 56,
        other_material_cost: 56,
        other_time_to_complete: "7days",
        other_notes: "notes",
      }
      this.propertyHardPhase_ii.patchValue(data)
    }
    this.appStateSvc.softCostFun$.subscribe(val => {
      console.log('phase ii onSubmit works')
      this.onSubmit()
    })
    this.addmore()
  }

  onSubmit() {
    this.submitted = true;
    if (this.propertyHardPhase_ii.invalid) {
      return;
    }



    this._bs.load(true);
    this.propertyHardPhase_ii.value.id = this.appStateSvc.stateData.budgetData.phase_2?.id;
    Object.keys(this.propertyHardPhase_ii.value).forEach((key) => (this.propertyHardPhase_ii.value[key] == "") && delete this.propertyHardPhase_ii.value[key]);
    Object.keys(this.propertyHardPhase_ii.value).forEach((key) => (this.propertyHardPhase_ii.value[key] == null) && delete this.propertyHardPhase_ii.value[key]);
    console.log(this.propertyHardPhase_ii.value);


    this.appService.put('phase2', this.propertyHardPhase_ii.value).pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
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

    const form = this.propertyHardPhase_ii.get('other') as FormArray
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

    const form = this.propertyHardPhase_ii.get('course') as FormArray
    form.push(val);

  }



}
