import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { BehaviorService } from 'src/app/shared/behavior.service';



@Component({
  selector: 'app-real-analysis',
  templateUrl: './real-analysis.component.html',
  styleUrls: ['./real-analysis.component.scss']
})
export class RealAnalysisComponent implements OnInit {

  purchaseprice:number
  RehabCost:number
  Taxes:number
  Insuarance:number
  Fees:number
  Depriciation:number
  Other:number
  Total:number
  totaloff:number

  Saleprice:number
  Rentcollection:number
  other:number
  Totalnetprofit:number
  ROI:number
  allproperty:any
  Taxesof:number
  collect:number

  constructor(private _bs:BehaviorService,
    private appService:AppService,
    private toastr:ToastrService) {
    }

  ngOnInit(): void {
    this.getData()
  }

  somethingChanged(){
    this.Total= this.purchaseprice+this.RehabCost+this.Taxes+this.Insuarance+this.Fees+this.Depriciation+this.Other
  }


somethingChangedIN(){
  this.totaloff=this.Saleprice+this.Rentcollection+this.other
  console.log(this.totaloff,"this is the total")
this.Taxesof=Math.round(this.totaloff*0.28)
console.log(this.Taxesof,"this is the taxes of 28%")

}
totaloperatingincom(){
  let value=this.totaloff-this.Taxesof
  return value
    }
    round(){
      return Math.round
    }
showoperation(){
  let value=0
  let sum=this.totaloff-this.Taxesof
 value=this.Total/sum
 return value
}
showresult(){
  let value=0
  let sum=this.totaloff-this.Taxesof
 value=this.Total/sum *100
 return value
}


getData() {
  this._bs.load(true)
  this.appService.getAll('properties/dropdown').subscribe((res: any) => {
    if (res.success) {
   this.allproperty=res.data
     
    }
    this._bs.load(false)
    })

}
getPropertyid(id:any){
  

  this._bs.load(true)
  this.appService.getAll('rehabcost?id'+id).subscribe((res: any) => {
    if (res.success) {
  let data =res.data
 
     
    }
    this._bs.load(false)
    })

}





}
