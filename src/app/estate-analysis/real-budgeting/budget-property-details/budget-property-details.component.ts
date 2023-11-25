import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { AppStateService } from 'src/app/shared/app-state.service';
import { BehaviorService } from 'src/app/shared/behavior.service';

@Component({
  selector: 'app-budget-property-details',
  templateUrl: './budget-property-details.component.html',
  styleUrls: ['./budget-property-details.component.scss']
})
export class BudgetPropertyDetailsComponent implements OnInit {
  firstForm: boolean;
  secondForm: boolean;
  thirdForm: boolean;
  forthForm: boolean;
  propertyDetails: FormGroup;
  submitted: boolean;
  user:any 
  show:any=true
  showButton: any = true
  filters: { page: number; pageSize: number; attomId:any } =
  { page: 1, pageSize: 20, attomId:17972229  };
transerresult:any=true
  propertyD: any=[];
  id: string | null;


  constructor(
    private fb: FormBuilder,
    private _bs: BehaviorService,
    private appService: AppService,
    private router: Router,
    private toastr: ToastrService,
    public appStateSvc: AppStateService,
    private route: ActivatedRoute
  ) {
    this.user=this._bs.getLocalUser()
    this.propertyDetails = this.fb.group({
      current_property_type: [''],
      rehabbed_property_type: [''],
      current_est_sqft: [''],
      rehabbed_est_sqft: [''],
      current_no_of_beds: [''],
      rehabbed_no_of_beds: [''],
      current_no_of_baths: [''],
      rehabbed_no_of_baths: [''],
      unit_mix: ['2-4 units, Multi-Fam of +5 units, Commercial / Residential',],
      addedBy:[ this.user?this.user?.id:''] 
    });
  }
  get f() { return this.propertyDetails.controls; }


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.filters.attomId= this.id
    }
    this.getPropertyD()
    // window.location.reload();
 
    this.firstForm = true;

  }


// viewSubmit(){

//   this.appService.post('add/property', this.propertyDetails.value).subscribe((res: any) => {
  
//     if (res.success) {
//       this.appStateSvc.setState({
//         budgetData: res.data,
//       })
//       console.log('budgetData', this.appStateSvc.stateData);

//     } else {
//       this.toastr.error(res.message)
//     }
//     this._bs.load(false)
//   }, error => {
//     this._bs.load(false)
//   });


// }



  onSubmit() {
    this.submitted = true;
    if (this.propertyDetails.invalid) {
      return;
    }
 

    console.log(this.propertyDetails.value);


    this._bs.load(true);

    this.appService.post('add/property',this.propertyDetails.value).subscribe((res: any) => {
      console.log(res)
      if (res.success) {
        this.appStateSvc.setState({
          budgetData: res.data,
          
        })
        this.showButton = false
        const result=this.transerresult
        this._bs.document(result)
 
        console.log('budgetData', this.appStateSvc.stateData);

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
  getPropertyD(){
    this.appService.getPropertyD(this.filters).subscribe((response) => { 
      console.log(response,"this.propertyD")
      this.propertyD = response.data.map((cat: any) => {
        return {
          propsubtype: cat.summary,
          building: cat.building,
          Indicate: cat.summary.propclass,
          status: cat.summary,
        };
      });
        this.propertyDetails.patchValue({
          unit_mix:this.propertyD[0].Indicate,
          current_est_sqft:this.propertyD[0].building.size.livingsize,
          current_no_of_beds:this.propertyD[0].building.rooms.beds,
          current_no_of_baths:this.propertyD[0].building.rooms.bathsfull,
          current_property_type:this.propertyD[0].propsubtype.propsubtype


        })

    })
  }

}
