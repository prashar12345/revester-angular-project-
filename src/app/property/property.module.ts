import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyRoutingModule } from './property-routing.module';
import { PropertyListComponent } from './property-list/property-list.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutComponent } from './layout/layout.component';
import { PropertyHeaderComponent } from './property-header/property-header.component';
import { PropertyDashboardComponent } from './property-dashboard/property-dashboard.component';
// import { PropertyCrawlComponent } from '../property-crawl/property-crawl.component';
import { AgmCoreModule } from '@agm/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SellingPropertyComponent } from './selling-property/selling-property.component';
import { LoctaionPropertyComponent } from './loctaion-property/loctaion-property.component';
import { PotentialARVComponent } from './potential-arv/potential-arv.component';


@NgModule({
  declarations: [
    PropertyListComponent,
    PropertyDetailComponent,
    LayoutComponent,
    PropertyHeaderComponent,
    PropertyDashboardComponent,
    SellingPropertyComponent,
    LoctaionPropertyComponent,
    PotentialARVComponent,
    // PropertyCrawlComponent
  ],
  imports: [
    CommonModule,
    PropertyRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    GooglePlaceModule,
    NgxDatatableModule,
    NgbModule,
    MatCheckboxModule,
    NgxPaginationModule,
    MatDatepickerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCbRhC6h9Pp43-5t_Knyrd_ewAdLMIJtCg',
      libraries: ['places']
    }),
  ]
})
export class PropertyModule { }
