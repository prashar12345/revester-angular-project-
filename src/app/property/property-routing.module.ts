import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoctaionPropertyComponent } from './loctaion-property/loctaion-property.component';
import { PotentialARVComponent } from './potential-arv/potential-arv.component';
// import { PropertyCrawlComponent } from '../property-crawl/property-crawl.component';
import { PropertyDashboardComponent } from './property-dashboard/property-dashboard.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { PropertyListComponent } from './property-list/property-list.component';
import { SellingPropertyComponent } from './selling-property/selling-property.component';

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    data: {
      title: 'Property'
    },
    children: [
      {
        path: 'property-dash',
        component: PropertyDashboardComponent,
      },
      {
        path: 'property-list',
        component: PropertyListComponent,
      },
      {
        path: 'property-list/:id',
        component: PropertyDetailComponent,
      },
      {
        path: 'selling',
        component: SellingPropertyComponent,
      },
      {
        path: 'potentialARV',
        component: PotentialARVComponent,
      },
      {
        path: 'location',
        component: LoctaionPropertyComponent,
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyRoutingModule { }
