import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-potential-arv',
  templateUrl: './potential-arv.component.html',
  styleUrls: ['./potential-arv.component.scss']
})
export class PotentialARVComponent implements OnInit {
  add: string | null;
  PotentialARV: any;
  add1: string | null;

  constructor(
    private route: ActivatedRoute,
    public appService: AppService
  ) { }

  ngOnInit(): void {
    this.add=  this.route.snapshot.paramMap.get('add')
    this.add1=  this.route.snapshot.paramMap.get('add1')
    this.getPotentialARV()
  }
  getPotentialARV(){
    this.appService.getPotentialARV(this.add,this.add1).subscribe((response) => { 
   console.log(response);
   
      this.PotentialARV= response.data.map((cat: any) => {
        return {
          area: cat.area,
          saleHistory: cat.saleHistory,
          summary: cat.summary,
          address: cat.address,
          owner: cat.owner,
          utilities: cat.utilities,
          building: cat.building.size,
          buildingroom: cat.building.rooms,
          avm: cat.avm.amount,
        };
      });
      console.log( this.PotentialARV,"PotentialARV");
      
      

    })
  }
}
