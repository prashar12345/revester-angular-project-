import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { StateData } from './common';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private state: StateData;
  user: any;
  constructor() {

  }
  get stateData() {
    return this.state;
  }
  set stateData(state) {
    this.state = state;
  }


  public setState(state: Partial<StateData>) {
    this.state = { ...this.state, ...state };
  }

  private propertySearchFree = new ReplaySubject()
  public propertySearchFree$ = this.propertySearchFree.asObservable()


  freeSearch() {
    this.propertySearchFree.next(true);
  }
  /* hardCost FORM */
  private hardCostFun = new Subject();
  public hardCostFun$ = this.hardCostFun.asObservable();

  public hardCost() {
    this.hardCostFun.next(true)
  }

  /* ************************************** */

  /* hardCost FORM */
  private softCostFun = new Subject();
  public softCostFun$ = this.softCostFun.asObservable();

  public softCost() {
    this.softCostFun.next(true)
  }

  /* ************************************** */

}
