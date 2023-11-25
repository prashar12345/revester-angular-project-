import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-markit-cap',
  templateUrl: './markit-cap.component.html',
  styleUrls: ['./markit-cap.component.scss']
})
export class MarkitCapComponent implements OnInit {
  rentcollection:number
  LaundryParking:number
  NetProfit:number
  next:any=Number

  MortgageLoan:number
  RealEstate:number
  Insurance:number
  Utilities:number
  Vacancy:number
  nextone:number
  Other:number
  shownext:number
  OperatingExpenses:number


  RiskierProperty:number
  RiskierPropertyNOI:number
  RiskierResult:number
  RiskierPurchase:any

  ModerateRisk:number
  ModerateRiskNOI:number
  ModerateResult:number
  ModeratePurchase:any

  SaferProperty:number
  SaferPropertyNOI:number
  SaferPropertyResult:number
  SaferPropertyPurchase:any

 total:number
  totalRisk:any
  totalamount:number
  constructor() { }

  ngOnInit(): void {
  }
  somethingChanged(){
    this.NetProfit=this.rentcollection+this.LaundryParking
    
    this.Vacancy= 0.07*this.rentcollection
    this.next=Number(this.Vacancy.toFixed(0));


  }
  somethingget(){

    console.log(this.MortgageLoan)
    console.log(this.RealEstate)
    console.log(this.Insurance)
    console.log(this.next)
    console.log(this.Other)
    this.OperatingExpenses=this.RealEstate+this.Insurance+this.Utilities+this.next+this.Other
    console.log(this.OperatingExpenses)
  }

  totaloperatingincom(){
let value=0

let sum=this.NetProfit- this.OperatingExpenses
value=sum*0.28
this.total=sum-value
this.totalamount=Number(this.total.toFixed(0));
return value

  }



  RiskierPropertyNOIChange(){
this. RiskierResult=this.RiskierProperty/this.RiskierPropertyNOI
this.RiskierPurchase=this.RiskierResult.toFixed(3)


  }
  totalpurchase(){
    let value =0
     value= this.RiskierPurchase*100
     return value
  }
  
  ModerateRiskNOIChange(){
    this.ModerateResult=this.ModerateRisk/this.ModerateRiskNOI
this.ModeratePurchase=this.ModerateResult.toFixed(3)

  }
  totalpurchase2(){
    let value =0
     value= this.ModeratePurchase*100
     return value
  }

  SaferPropertyNOIChange(){
    this.SaferPropertyResult=this.SaferProperty/this.SaferPropertyNOI
    this.SaferPropertyPurchase=this.SaferPropertyResult.toFixed(3)
  }
  totalpurchase3(){
    let value =0
     value= this.SaferPropertyPurchase*100
     return value
  }

}
