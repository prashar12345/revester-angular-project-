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
  selector: 'app-phase-viii',
  templateUrl: './phase-viii.component.html',
  styleUrls: ['./phase-viii.component.scss', '../budget-soft-cost.component.scss']
})
export class PhaseViiiComponent implements OnInit {

  firstForm: boolean;
  secondForm: boolean;
  thirdForm: boolean;
  forthForm: boolean;
  propertySoftPhase_viii: FormGroup;
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
    this.propertySoftPhase_viii = this.fb.group({
      // property_id: ['',],
      id: ['',],
      kitchen_floor_type: ['',],
      bathroom_floor_labor_cost: ['', []],
      bathroom_floor_material_cost: ['', []],
      bathroom_floor_time_to_complete: ['', []],
      bathroom_floor_notes: ['', []],
      lighting_labor_cost: ['', []],
      lighting_material_cost: ['', []],
      lighting_time_to_complete: ['', []],
      lighting_notes: ['', []],
      bathroom_vent_labor_cost: ['', []],
      bathroom_vent_material_cost: ['', []],
      bathroom_vent_time_to_complete: ['', []],
      bathroom_vent_notes: ['', []],
      vanity_labor_cost: ['', []],
      vanity_material_cost: ['', []],
      vanity_time_to_complete: ['', []],
      vanity_notes: ['', []],
      vanity_hardware_labor_cost: ['', []],
      vanity_hardware_material_cost: ['', []],
      vanity_hardware_time_to_complete: ['', []],
      vanity_hardware_notes: ['', []],
      medicine_cabinet_labor_cost: ['', []],
      medicine_cabinet_material_cost: ['', []],
      medicine_cabinet_time_to_complete: ['', []],
      medicine_cabinet_notes: ['', []],
      tile_backsplash_lobor_cost: ['', []],
      tile_backsplash_material_cost: ['', []],
      tile_backsplash_time_to_complete: ['', []],
      tile_backsplash_notes: ['', []],
      sink_labor_cost: ['', []],
      sink_material_cost: ['', []],
      sink_time_to_complete: ['', []],
      sink_notes: ['', []],
      faucet_labor_cost: ['', []],
      faucet_material_cost: ['', []],
      faucet_time_to_complete: ['', []],
      faucet_notes: ['', []],
      tub_shower_lobor_cost: ['', []],
      tub_shower_material_cost: ['', []],
      tub_time_to_Shower: ['', []],
      tub_backsplash_notes: ['', []],
      toilet_labor_cost: ['', []],
      toilet_material_cost: ['', []],
      toilet_time_to_complete: ['', []],
      toilet_notes: ['', []],
      other_labor_cost: ['', []],
      other_material_cost: ['', []],
      other_time_to_complete: ['', []],
      other_notes: ['', []],
      other: this.fb.array([]),
      new: this.fb.array([])

    });
  }
  get f() { return this.propertySoftPhase_viii.controls; }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  ngOnInit(): void {
    if (!this.user?.subscriptionPlan  || !this.user) {
      this.isdisabled = true
      let data = {
        kitchen_floor_type: ['',],
        bathroom_floor_labor_cost: 22,
        bathroom_floor_material_cost: 22,
        bathroom_floor_time_to_complete: "9Days",
        bathroom_floor_notes: "Notes",
        lighting_labor_cost: 22,
        lighting_material_cost: 22,
        lighting_time_to_complete: "9Days",
        lighting_notes: "Notes",
        bathroom_vent_labor_cost: 22,
        bathroom_vent_material_cost: 22,
        bathroom_vent_time_to_complete: "9Days",
        bathroom_vent_notes: "Notes",
        vanity_labor_cost: 22,
        vanity_material_cost: 22,
        vanity_time_to_complete: "9Days",
        vanity_notes: "Notes",
        vanity_hardware_labor_cost: 22,
        vanity_hardware_material_cost: 22,
        vanity_hardware_time_to_complete: "9Days",
        vanity_hardware_notes: "Notes",
        medicine_cabinet_labor_cost: 22,
        medicine_cabinet_material_cost: 22,
        medicine_cabinet_time_to_complete: "9Days",
        medicine_cabinet_notes: "Notes",
        tile_backsplash_lobor_cost: 22,
        tile_backsplash_material_cost: 22,
        tile_backsplash_time_to_complete: "9Days",
        tile_backsplash_notes: "Notes",
        sink_labor_cost: 22,
        sink_material_cost: 22,
        sink_time_to_complete: "9Days",
        sink_notes: "Notes",
        faucet_labor_cost: 22,
        faucet_material_cost: 22,
        faucet_time_to_complete: "9Days",
        faucet_notes: "Notes",
        tub_shower_lobor_cost: 22,
        tub_shower_material_cost: 22,
        tub_time_to_Shower: "Notes",
        tub_backsplash_notes: "9Days",
        toilet_labor_cost: 22,
        toilet_material_cost: 22,
        toilet_time_to_complete: "9Days",
        toilet_notes: "Notes",
        other_labor_cost: 22,
        other_material_cost: 22,
        other_time_to_complete: "9Days",
        other_notes: "Notes",
      }
      this.propertySoftPhase_viii.patchValue(data)
    }


    this.firstForm = true;
    this.appStateSvc.softCostFun$.subscribe(val => {
      this.onSubmit()
    })
    this.addmore()
  }

  onSubmit() {
    this.submitted = true;
    if (this.propertySoftPhase_viii.invalid) {
      return;
    }



    this._bs.load(true);
    this.propertySoftPhase_viii.value.id = this.appStateSvc.stateData.budgetData.phase_8?.id;
    Object.keys(this.propertySoftPhase_viii.value).forEach((key) => (this.propertySoftPhase_viii.value[key] == "") && delete this.propertySoftPhase_viii.value[key]);
    Object.keys(this.propertySoftPhase_viii.value).forEach((key) => (this.propertySoftPhase_viii.value[key] == null) && delete this.propertySoftPhase_viii.value[key]);
    console.log(this.propertySoftPhase_viii.value);


    this.appService.put('phase8', this.propertySoftPhase_viii.value).pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
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

    const form = this.propertySoftPhase_viii.get('other') as FormArray
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

    const form = this.propertySoftPhase_viii.get('course') as FormArray
    form.push(val);

  }
  addmoreinput() {
    const val = this.fb.group({
      other_labor_cost: [''],

    });

    const form = this.propertySoftPhase_viii.get('new') as FormArray
    form.push(val);
    // this.appService.get('phase1',).subscribe((result:any)=>{
    //   console.log(result)
    // })
  }

}
