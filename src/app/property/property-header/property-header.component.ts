import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AppStateService } from 'src/app/shared/app-state.service';
import { BehaviorService } from 'src/app/shared/behavior.service';
import { environment } from 'src/environments/environment';
import { StateData } from 'src/app/shared/common'

@Component({
  selector: 'app-property-header',
  templateUrl: './property-header.component.html',
  styleUrls: ['./property-header.component.scss']
})
export class PropertyHeaderComponent implements OnInit {
  filters: {  attomId:any } =
  { attomId:""  };
  user: any;
  _host: any = environment.apiUrl;
  toggle: any = false
  user_SubscriptionPlan: any;
  propertyD: any;
  atomid: any;
  add: any;
  add1: any;
  lat: any;
  lng: any;
  id:any ;
  constructor(private _bs: BehaviorService,
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService,
    private activatedRoute: ActivatedRoute,
    public  appStateSvc: AppStateService) {
    this._bs.getUserData().subscribe((res: any) => {
      if (res) {
        this.user = res
      } else {
        this.user = _bs.getLocalUser()
      }
    });
    
  }

  ngOnInit(): void {
    this._bs.transferAtomIDreturn().subscribe((res:any)=>{
      this.atomid= res
    })
   
    this.getPropertyD()
  }

  userImg(img: any) {
    return this._bs.userImg(img)
  }

  login() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      if (evt.url.indexOf('/verify/user?id=') === 0) {
        console.log(evt.url.indexOf('/verify/user?id='));
        this.route.queryParams.subscribe(params => {
          let user_id = params['id'];
          localStorage.setItem("user_id", user_id);
          this.router.navigate(['/']);
          this._bs.getUserData().subscribe((res: any) => {
            if (res) {
              this.user = res
            } else {
              this.user = this._bs.getLocalUser()
            }
          });
        });
      }
    })
  }

  logout() {
    // localStorage.clear();
    
    localStorage.removeItem('credentials');
    this._bs.signOut()
  }
  GotoAnaliysis() {
    this.router.navigate(['estate/budgeting']);
  }
  GotoSelling() {
    this.router.navigate(['selling',{add:this.add,add1:this.add1}]);
  
  }
  GotoPotential() {
    this.router.navigate(['potentialARV',{add:this.add,add1:this.add1}]);
  
  }
  GotoLocation() {
    this.router.navigate(['location',{lat:this.lat,lng:this.lng}]);
  }
  getPropertyD(){
    this.appService.getPropertyDetails(this.atomid).subscribe((response) => { 
   console.log(response);
   
      this.propertyD = response.data.map((cat: any) => {
        return {
          summary: cat.summary,
          building: cat.building,
          size: cat.building.size,
          Indicate: cat.summary,
          address: cat.address,
          lot: cat.lot,
          location:cat.location
        };
      });
      this.add=this.propertyD[0].address.line1
      this.add1=this.propertyD[0].address.line2
      console.log( this.propertyD[0].address.line1,this.lat=this.propertyD[0].location.latitude,"heaader");
      this.lat=this.propertyD[0].location.latitude
      this.lng=this.propertyD[0].location.longitude
      

    })
  }
}
