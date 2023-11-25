import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { MyPlanComponent } from './my-plan/my-plan.component';
import { PropertyViewComponent } from './property-view/property-view.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';

const routes: Routes = [

  { 
    path: "",
    component: LayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path:'',
        component:DashboardComponent
      },
      {
        path:'plan',
        component:MyPlanComponent
      },
      {
        path:'transaction',
        component:TransactionListComponent
      },
      {
        path:'property-view',
        component:PropertyViewComponent
      },
    ],
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
