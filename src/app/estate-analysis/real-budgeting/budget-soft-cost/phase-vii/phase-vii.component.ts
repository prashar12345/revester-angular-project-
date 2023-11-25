import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { AppStateService } from 'src/app/shared/app-state.service';
import { BehaviorService } from 'src/app/shared/behavior.service';

@Component({
  selector: 'app-phase-vii',
  templateUrl: './phase-vii.component.html',
  styleUrls: ['./phase-vii.component.scss', '../budget-soft-cost.component.scss']
})
export class PhaseViiComponent implements OnInit {

  firstForm: boolean;
  secondForm: boolean;
  thirdForm: boolean;
  forthForm: boolean;
  propertySoftPhase_vii: FormGroup;
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
    this.propertySoftPhase_vii = this.fb.group({
      // property_id: ['',],
      id: ['',],
      kitchen_floor_type: ['',],
      kitchen_floor_labor_cost: ['',],
      kitchen_floor_material_cost: ['',],
      kitchen_floor_time_to_complete: ['',],
      kitchen_floor_notes: ['',],
      lighting_labor_cost: ['',],
      lighting_material_cost: ['',],
      lighting_time_to_complete: ['',],
      lighting_notes: ['',],
      cabinets_labor_cost: ['',],
      cabinets_material_cost: ['',],
      cabinets_time_to_complete: ['',],
      cabinets_notes: ['',],
      cabinet_hardware_labor_cost: ['',],
      cabinet_hardware_material_cost: ['',],
      cabinet_hardware_time_to_complete: ['',],
      cabinet_hardware_notes: ['',],
      countertops_labor_cost: ['',],
      countertops_material_cost: ['',],
      countertops_time_to_complete: ['',],
      countertops_notes: ['',],
      tile_backsplash_lobor_cost: ['',],
      tile_backsplash_material_cost: ['',],
      tile_backsplash_time_to_complete: ['',],
      tile_backsplash_notes: ['',],
      sink_labor_cost: ['',],
      sink_material_cost: ['',],
      sink_time_to_complete: ['',],
      sink_notes: ['',],
      faucet_labor_cost: ['',],
      faucet_material_cost: ['',],
      faucet_time_to_complete: ['',],
      faucet_notes: ['',],
      garbage_disposal_labor_cost: ['',],
      garbage_disposal_material_cost: ['',],
      garbage_disposal_time_to_complete: ['',],
      garbage_disposal_notes: ['',],
      dishwasher_labor_cost: ['',],
      dishwasher_material_cost: ['',],
      dishwasher_time_to_complete: ['',],
      dishwasher_notes: ['',],
      stove_labor_cost: ['',],
      stove_material_cost: ['',],
      stove_time_to_complete: ['',],
      stove_notes: ['',],
      refrigerator_labor_cost: ['',],
      refrigerator_material_cost: ['',],
      refrigerator_time_to_complete: ['',],
      refrigerator_notes: ['',],
      venting_hood_labor_cost: ['',],
      venting_hood_material_cost: ['',],
      venting_hood_time_to_complete: ['',],
      venting_hood_notes: ['',],
      microwave_labor_cost: ['',],
      microwave_material_cost: ['',],
      microwave_time_to_complete: ['',],
      microwave_notes: ['',],
      new: this.fb.array([])

    });
  }
  get f() { return this.propertySoftPhase_vii.controls; }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  ngOnInit(): void {
    if (!this.user?.subscriptionPlan  || !this.user) {
      this.isdisabled = true
      let data = {
        kitchen_floor_type: ['',],
        kitchen_floor_labor_cost: 23,
        kitchen_floor_material_cost: 23,
        kitchen_floor_time_to_complete: "6Days",
        kitchen_floor_notes: "Notes",
        lighting_labor_cost: 23,
        lighting_material_cost: 23,
        lighting_time_to_complete: "6Days",
        lighting_notes: "Notes",
        cabinets_labor_cost: 23,
        cabinets_material_cost: 23,
        cabinets_time_to_complete: "6Days",
        cabinets_notes: "Notes",
        cabinet_hardware_labor_cost: 23,
        cabinet_hardware_material_cost: 23,
        cabinet_hardware_time_to_complete: "6Days",
        cabinet_hardware_notes: "Notes",
        countertops_labor_cost: 23,
        countertops_material_cost: 23,
        countertops_time_to_complete: "6Days",
        countertops_notes: "Notes",
        tile_backsplash_lobor_cost: 23,
        tile_backsplash_material_cost: 23,
        tile_backsplash_time_to_complete: "6Days",
        tile_backsplash_notes: "Notes",
        sink_labor_cost: 23,
        sink_material_cost: 23,
        sink_time_to_complete: "6Days",
        sink_notes: "Notes",
        faucet_labor_cost: 23,
        faucet_material_cost: 23,
        faucet_time_to_complete: "6Days",
        faucet_notes: "Notes",
        garbage_disposal_labor_cost: 23,
        garbage_disposal_material_cost: 23,
        garbage_disposal_time_to_complete: "6Days",
        garbage_disposal_notes: "Notes",
        dishwasher_labor_cost: 23,
        dishwasher_material_cost: 23,
        dishwasher_time_to_complete: "6Days",
        dishwasher_notes: "Notes",
        stove_labor_cost: 23,
        stove_material_cost: 23,
        stove_time_to_complete: "6Days",
        stove_notes: "Notes",
        refrigerator_labor_cost: 23,
        refrigerator_material_cost: 23,
        refrigerator_time_to_complete: "6Days",
        refrigerator_notes: "Notes",
        venting_hood_labor_cost: 23,
        venting_hood_material_cost: 23,
        venting_hood_time_to_complete: "6Days",
        venting_hood_notes: "Notes",
        microwave_labor_cost: 23,
        microwave_material_cost: 23,
        microwave_time_to_complete: "6Days",
        microwave_notes: "Notes",
      }
      this.propertySoftPhase_vii.patchValue(data)
    }

    this.firstForm = true;
    this.appStateSvc.softCostFun$.subscribe(val => {
      this.onSubmit()
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.propertySoftPhase_vii.invalid) {
      return;
    }

    console.log(this.propertySoftPhase_vii.value);


    this._bs.load(true);
    this.propertySoftPhase_vii.value.id = this.appStateSvc.stateData.budgetData.phase_7?.id;
    Object.keys(this.propertySoftPhase_vii.value).forEach((key) => (this.propertySoftPhase_vii.value[key] == "") && delete this.propertySoftPhase_vii.value[key]);
    Object.keys(this.propertySoftPhase_vii.value).forEach((key) => (this.propertySoftPhase_vii.value[key] == null) && delete this.propertySoftPhase_vii.value[key]);
    console.log(this.propertySoftPhase_vii.value);

    this.appService.put('phase7', this.propertySoftPhase_vii.value).pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
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
  trackByFn(index: any, item: any) {
    return index;
  }
  addmoreinput() {
    const val = this.fb.group({
      other_labor_cost: [''],

    });

    const form = this.propertySoftPhase_vii.get('new') as FormArray
    form.push(val);
    // this.appService.get('phase1',).subscribe((result:any)=>{
    //   console.log(result)
    // })
  }

}
