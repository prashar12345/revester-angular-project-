import { Component } from '@angular/core';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { AppStateService } from './shared/app-state.service';
import { BehaviorService } from './shared/behavior.service';
import { StateData } from './shared/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Revestor';
  loading: boolean = false;
  user: any;
  constructor(
    private router: Router,
    private _bs: BehaviorService,
    private route: ActivatedRoute,
    private appStateSvc: AppStateService) {
    this.appStateSvc.stateData = new StateData();
    this.router.events.subscribe((event: any) => {
      this._bs.closeModal();
      _bs.load(false);
      window.scroll(0, 0);
    });
    router.events.subscribe((routerEvent: any): void => {
      this.checkRouterEvent(routerEvent)
    })
  }
  ngOnInit() {
    if (localStorage.getItem('credentials')) {
      this.user = localStorage.getItem('credentials')
      this.user = JSON.parse(this.user)
      const state = this.appStateSvc.stateData;
      state.user = this.user
      state.userId = this.user.id
      state.subcriptionStatus = this.user.subscriptionPlan
      if(this.user)
      {
      state.isLoggedIn = true
      }
      if(this.user.subscriptionPlan){
      state.subcriptionStatus = true
      }
      console.log(state);
    }
  }
  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }
    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }
}


