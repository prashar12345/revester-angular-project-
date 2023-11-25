import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AgChartsAngularModule } from 'ag-charts-angular';
import { ChartsModule } from 'ng2-charts';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from '../shared/shared.module';
import { SidebarComponent } from '../theme/sidebar/sidebar.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { MyPlanComponent } from './my-plan/my-plan.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { PropertyViewComponent } from './property-view/property-view.component';
@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    MyPlanComponent,
    SidebarComponent,
    LayoutComponent,
    TransactionListComponent,
    PropertyViewComponent
  ],  
  imports: [
    CommonModule,
    SharedModule,
    AgChartsAngularModule,
    DashboardRoutingModule,
    ChartsModule,
    NgxMaskModule.forRoot(),
    NgxDatatableModule

  ]
})
export class DashboardModule { }
