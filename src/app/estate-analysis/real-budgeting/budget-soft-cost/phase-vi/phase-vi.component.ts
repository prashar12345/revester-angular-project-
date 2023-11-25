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
  selector: 'app-phase-vi',
  templateUrl: './phase-vi.component.html',
  styleUrls: ['./phase-vi.component.scss', '../budget-soft-cost.component.scss']
})
export class PhaseViComponent implements OnInit {
  firstForm: boolean;
  secondForm: boolean;
  thirdForm: boolean;
  forthForm: boolean;
  propertySoftPhase_vi: FormGroup;
  submitted: boolean;
  user: any
  isdisabled = false
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
    this.propertySoftPhase_vi = this.fb.group({
      // property_id: ['',],
      id: ['',],
      doors_labor_cost: ['',],
      doors_material_cost: ['',],
      doors_time_to_complete: ['',],
      doors_notes: ['',],
      drywall_labor_cost: ['',],
      drywall_material_cost: ['',],
      drywall_time_to_complete: ['',],
      drywall_notes: ['',],
      trim_labor_cost: ['',],
      trim_material_cost: ['',],
      trim_time_to_complete: ['',],
      trim_notes: ['',],
      Interior_paint_labor_cost: ['',],
      Interior_paint_material_cost: ['',],
      Interior_paint_time_to_complete: ['',],
      Interior_paint_notes: ['',],
      lighting_labor_cost: ['',],
      lighting_material_cost: ['',],
      lighting_time_to_complete: ['',],
      lighting_notes: ['',],
      stairs_labor_cost: ['',],
      stairs_material_cost: ['',],
      stairs_time_to_complete: ['',],
      stairs_notes: ['',],
      flooring_labor_cost: ['',],
      flooring_material_cost: ['',],
      flooring_time_to_complete: ['',],
      flooring_notes: ['',],
      other_labor_cost: ['',],
      other_material_cost: ['',],
      other_time_to_complete: ['',],
      other_notes: ['',],
      other: this.fb.array([]),
      new: this.fb.array([])

    });
  }
  get f() { return this.propertySoftPhase_vi.controls; }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  ngOnInit(): void {

    if (!this.user?.subscriptionPlan  || !this.user) {
      this.isdisabled = true
      let data = {
        doors_labor_cost: 56,
        doors_material_cost: 56,
        doors_time_to_complete: "9Days",
        doors_notes: "notes",
        drywall_labor_cost: 56,
        drywall_material_cost: 56,
        drywall_time_to_complete: "9Days",
        drywall_notes: "notes",
        trim_labor_cost: 56,
        trim_material_cost: 56,
        trim_time_to_complete: "9Days",
        trim_notes: "notes",
        Interior_paint_labor_cost: 56,
        Interior_paint_material_cost: 56,
        Interior_paint_time_to_complete: "9Days",
        Interior_paint_notes: "Notes",
        lighting_labor_cost: 56,
        lighting_material_cost: 56,
        lighting_time_to_complete: "9Days",
        lighting_notes: "notes",
        stairs_labor_cost: 56,
        stairs_material_cost: 56,
        stairs_time_to_complete: "9Days",
        stairs_notes: "notes",
        flooring_labor_cost: 56,
        flooring_material_cost: 56,
        flooring_time_to_complete: "9Days",
        flooring_notes: "notes",
        other_labor_cost: 56,
        other_material_cost: 56,
        other_time_to_complete: "9Days",
        other_notes: "notes",

      }
      this.propertySoftPhase_vi.patchValue(data)
    }


    this.firstForm = true;
    this.appStateSvc.softCostFun$.subscribe(val => {
      this.onSubmit()
    })
    this.addmore()
  }

  onSubmit() {


    this.submitted = true;
    if (this.propertySoftPhase_vi.invalid) {
      return;
    }

    console.log(this.propertySoftPhase_vi.value);


    this._bs.load(true);
    this.propertySoftPhase_vi.value.id = this.appStateSvc.stateData.budgetData.phase_6?.id;
    Object.keys(this.propertySoftPhase_vi.value).forEach((key) => (this.propertySoftPhase_vi.value[key] == "") && delete this.propertySoftPhase_vi.value[key]);
    Object.keys(this.propertySoftPhase_vi.value).forEach((key) => (this.propertySoftPhase_vi.value[key] == null) && delete this.propertySoftPhase_vi.value[key]);
    console.log(this.propertySoftPhase_vi.value);


    this.appService.put('phase6', this.propertySoftPhase_vi.value).pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
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
  addmore() {

    const val = this.fb.group({
      other_labor_cost: [''],
      other_material_cost: [''],
      other_time_to_complete: [''],
      other_notes: ['']
    });

    const form = this.propertySoftPhase_vi.get('other') as FormArray
    form.push(val);
    // this.appService.get('phase1',).subscribe((result:any)=>{
    //   console.log(result)
    // })
  }

  trackByFn(index: any, item: any) {
    return index;
  }
  addmoreinput() {
    const val = this.fb.group({
      other_labor_cost: [''],

    });

    const form = this.propertySoftPhase_vi.get('new') as FormArray
    form.push(val);
    // this.appService.get('phase1',).subscribe((result:any)=>{
    //   console.log(result)
    // })
  }




  addmore1(value: any) {

    const val = this.fb.group({
      course: [value.course, Validators.required],
      percentage: [value.percentage, Validators.required]
    });

    const form = this.propertySoftPhase_vi.get('course') as FormArray
    form.push(val);

  }

}
