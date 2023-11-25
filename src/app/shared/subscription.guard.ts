import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { BehaviorService } from './behavior.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionGuard implements CanActivate {
  constructor(
    private router: Router,
    private _bs:BehaviorService,
    private appService: AppService
  ) {
  }

  token:any
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.token = this._bs.getLocalUser()

    if (this.appService.user_SubscriptionPlan()) {
      // console.log("token",token);   
      // authorised so return true
      return true;
    }
    // not logged in so redirect to landing page 
    this.router.navigate(['auth/subscription']);
    return false;
  }
  
}
