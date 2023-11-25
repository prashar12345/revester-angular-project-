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
  selector: 'app-phase-ix',
  templateUrl: './phase-ix.component.html',
  styleUrls: ['./phase-ix.component.scss', '../budget-soft-cost.component.scss']
})
export class PhaseIxComponent implements OnInit {

  firstForm: boolean;
  secondForm: boolean;
  thirdForm: boolean;
  forthForm: boolean;
  propertySoftPhase_ix: FormGroup;
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
    this.propertySoftPhase_ix = this.fb.group({
      // property_id: ['',],
      id: ['',],
      laundry_floor_labor_cost: ['', []],
      laundry_floor_material_cost: ['', []],
      laundry_floor_time_to_complete: ['', []],
      laundry_floor_notes: ['', []],
      lighting_labor_cost: ['', []],
      lighting_material_cost: ['', []],
      lighting_time_to_complete: ['', []],
      lighting_notes: ['', []],
      laundry_vent_labor_cost: ['', []],
      laundry_vent_material_cost: ['', []],
      laundry_vent_time_to_complete: ['', []],
      laundry_vent_notes: ['', []],
      laundry_water_hook_up_labor_cost: ['', []],
      laundry_water_hook_up_material_cost: ['', []],
      laundry_water_hook_up_time_to_complete: ['', []],
      laundry_water_hook_up_notes: ['', []],
      laundry_cabinets_labor_cost: ['', []],
      laundry_cabinets_material_cost: ['', []],
      laundry_cabinets_time_to_complete: ['', []],
      laundry_cabinets_notes: ['', []],
      laundry_sink_labor_cost: ['', []],
      laundry_sink_material_cost: ['', []],
      laundry_sink_time_to_complete: ['', []],
      laundry_sink_notes: ['', []],
      faucet_labor_cost: ['', []],
      faucet_material_cost: ['', []],
      faucet_time_to_complete: ['', []],
      faucet_notes: ['', []],
      other_labor_cost: ['', []],
      other_material_cost: ['', []],
      other_time_to_complete: ['', []],
      other_notes: ['', []],
      other: this.fb.array([]),
      new: this.fb.array([])

    });
  }
  get f() { return this.propertySoftPhase_ix.controls; }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  ngOnInit(): void {
    if (!this.user?.subscriptionPlan  || !this.user) {
      this.isdisabled = true
      let data = {
        laundry_floor_labor_cost: 98,
        laundry_floor_material_cost: 89,
        laundry_floor_time_to_complete: "5Days",
        laundry_floor_notes: "Notes",
        lighting_labor_cost: 98,
        lighting_material_cost: 45,
        lighting_time_to_complete: "5Days",
        lighting_notes: "Notes",
        laundry_vent_labor_cost: 34,
        laundry_vent_material_cost: 23,
        laundry_vent_time_to_complete: "5Days",
        laundry_vent_notes: "Notes",
        laundry_water_hook_up_labor_cost: 23,
        laundry_water_hook_up_material_cost: 23,
        laundry_water_hook_up_time_to_complete: "5Days",
        laundry_water_hook_up_notes: "Notes",
        laundry_cabinets_labor_cost: 23,
        laundry_cabinets_material_cost: 23,
        laundry_cabinets_time_to_complete: "5Days",
        laundry_cabinets_notes: "Notes",
        laundry_sink_labor_cost: 23,
        laundry_sink_material_cost: 23,
        laundry_sink_time_to_complete: "5Days",
        laundry_sink_notes: "Notes",
        faucet_labor_cost: 43,
        faucet_material_cost: 32,
        faucet_time_to_complete: "5Days",
        faucet_notes: "Notes",
        other_labor_cost: 43,
        other_material_cost: 43,
        other_time_to_complete: "5Dayss",
        other_notes: "Notes",
      }
      this.propertySoftPhase_ix.patchValue(data)
    }

    this.firstForm = true;
    this.appStateSvc.softCostFun$.subscribe(val => {
      this.onSubmit()
    })
    this.addmore()
  }

  onSubmit() {
    this.submitted = true;
    if (this.propertySoftPhase_ix.invalid) {
      return;
    }

    console.log(this.propertySoftPhase_ix.value);


    this._bs.load(true);
    this.propertySoftPhase_ix.value.id = this.appStateSvc.stateData.budgetData.phase_9?.id;
    Object.keys(this.propertySoftPhase_ix.value).forEach((key) => (this.propertySoftPhase_ix.value[key] == "") && delete this.propertySoftPhase_ix.value[key]);
    Object.keys(this.propertySoftPhase_ix.value).forEach((key) => (this.propertySoftPhase_ix.value[key] == null) && delete this.propertySoftPhase_ix.value[key]);
    console.log(this.propertySoftPhase_ix.value);


    this.appService.put('phase9', this.propertySoftPhase_ix.value).pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
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

    const form = this.propertySoftPhase_ix.get('other') as FormArray
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

    const form = this.propertySoftPhase_ix.get('course') as FormArray
    form.push(val);

  }
  addmoreinput() {
    const val = this.fb.group({
      other_labor_cost: [''],

    });

    const form = this.propertySoftPhase_ix.get('new') as FormArray
    form.push(val);
    // this.appService.get('phase1',).subscribe((result:any)=>{
    //   console.log(result)
    // })
  }


}
