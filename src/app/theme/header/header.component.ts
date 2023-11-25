import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AppStateService } from 'src/app/shared/app-state.service';
import { BehaviorService } from 'src/app/shared/behavior.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: any;
  _host: any = environment.apiUrl;
  toggle: any = false
  user_SubscriptionPlan: any;
  constructor(private _bs: BehaviorService,
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService,
    private appStateSvc: AppStateService) {

    this._bs.getUserData().subscribe((res: any) => {
      if (res) {
        this.user = res
      } else {
        this.user = _bs.getLocalUser()
      }
    });
  }

  ngOnInit(): void {
    // this.login();
    this.user_SubscriptionPlan = this.appService.user_SubscriptionPlan()
    // console.log(this.user_SubscriptionPlan);

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
    this.appStateSvc.setState({
      postalCode:"",
      investorType:"",
      freeSearch:false,
      loader:false,
      isLoggedIn:false,
      user: false,
      budgetHardCostSubmit:false,
      shineItem:[1, 2, 3, 4, 5, 6, 7, 8, 9,],
      subcriptionStatus:false,
      subcriptionValid: false,
    })
    this._bs.signOut()
  }

}
