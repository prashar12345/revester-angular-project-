import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AppStateService } from 'src/app/shared/app-state.service';

@Component({
  selector: 'app-selling-property',
  templateUrl: './selling-property.component.html',
  styleUrls: ['./selling-property.component.scss']
})
export class SellingPropertyComponent implements OnInit {
  add: any;
  add1: any;
  SellingData: any;

  constructor(private route: ActivatedRoute,
    public appService: AppService) { }

  ngOnInit(): void {
    this.add=  this.route.snapshot.paramMap.get('add')
    this.add1=  this.route.snapshot.paramMap.get('add1')
    this.getSellingArea()
  }

  getSellingArea(){
    this.appService.getSellingArea(this.add,this.add1).subscribe((response) => { 
   console.log(response);
   
      this.SellingData= response.data.map((cat: any) => {
        return {
          area: cat.area,
          saleHistory: cat.saleHistory,
          summary: cat.summary,
          address: cat.address,
          owner: cat.owner
        };
      });
      console.log( this.SellingData,"heaader");
      
      

    })
  }
}
