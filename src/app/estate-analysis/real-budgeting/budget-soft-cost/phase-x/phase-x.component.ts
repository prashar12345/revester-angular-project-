import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { AppStateService } from 'src/app/shared/app-state.service';
import { BehaviorService } from 'src/app/shared/behavior.service';

@Component({
  selector: 'app-phase-x',
  templateUrl: './phase-x.component.html',
  styleUrls: ['./phase-x.component.scss', '../budget-soft-cost.component.scss']
})
export class PhaseXComponent implements OnInit {

  firstForm: boolean;
  secondForm: boolean;
  thirdForm: boolean;
  forthForm: boolean;
  propertySoftPhase_x: FormGroup;
  submitted: boolean;
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
    this.propertySoftPhase_x = this.fb.group({
      // property_id: ['',],
      id: ['',],
      final_clean_out_labor_cost: ['', []],
      final_clean_out_material_cost: ['', []],
      final_clean_out_time_to_complete: ['', []],
      final_clean_out_notes: ['', []],

    });
  }
  get f() { return this.propertySoftPhase_x.controls; }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  ngOnInit(): void {
    if (!this.user?.subscriptionPlan  || !this.user) {

      let data = {
        final_clean_out_labor_cost: 23,
        final_clean_out_material_cost: 43,
        final_clean_out_time_to_complete: "6Days",
        final_clean_out_notes: "Notes",
      }
      this.propertySoftPhase_x.patchValue(data)
    }
    this.firstForm = true;
    this.appStateSvc.softCostFun$.subscribe(val => {
      this.onSubmit()
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.propertySoftPhase_x.invalid) {
      return;
    }



    this._bs.load(true);
    this.propertySoftPhase_x.value.id = this.appStateSvc.stateData.budgetData.phase_10?.id;
    Object.keys(this.propertySoftPhase_x.value).forEach((key) => (this.propertySoftPhase_x.value[key] == "") && delete this.propertySoftPhase_x.value[key]);
    Object.keys(this.propertySoftPhase_x.value).forEach((key) => (this.propertySoftPhase_x.value[key] == null) && delete this.propertySoftPhase_x.value[key]);
    console.log(this.propertySoftPhase_x.value);


    this.appService.put('phase10', this.propertySoftPhase_x.value).pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
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

}
