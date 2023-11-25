import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
// Material
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CountdownModule } from 'ngx-countdown';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommingSoonComponent } from './comming-soon/comming-soon.component';
import { FindPropertyComponent } from './find-property/find-property.component';
import { HomeComponent } from './home/home.component';
// Compement
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthInterceptor } from './shared/auth-interceptor';
import { BehaviorService } from './shared/behavior.service';
import { ErrorInterceptor } from './shared/error.interceptor';
// import { SidebarComponent } from './theme/sidebar/sidebar.component';
import { SharedModule } from './shared/shared.module';
import { SubscriptionPlanComponent } from './subscription-plan/subscription-plan.component';
import { FooterComponent } from './theme/footer/footer.component';
import { HeaderComponent } from './theme/header/header.component';
import { LayoutComponent } from './theme/layout/layout.component';
import { AuthSubscriptionComponent } from './auth-subscription/auth-subscription.component';
import { AgmCoreModule } from '@agm/core';
import { NgxMaskModule } from 'ngx-mask';

import { PropertyCrawlComponent } from './property-crawl/property-crawl.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDatepickerModule } from '@angular/material/datepicker';


// import { ChecklistsComponent } from './component/checklists/checklists.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    PropertyCrawlComponent,
    NotFoundComponent,
    // SidebarComponent,
    SubscriptionPlanComponent,
    FindPropertyComponent,
    CommingSoonComponent,
    AuthSubscriptionComponent,


    // ChecklistsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule, MatTabsModule,
    ToastrModule.forRoot(),
    SlickCarouselModule,
    MatToolbarModule,
    MatCheckboxModule,
    NgxPaginationModule,
    MatDatepickerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCbRhC6h9Pp43-5t_Knyrd_ewAdLMIJtCg',
      libraries: ['places']
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    SharedModule,
    MatChipsModule,
    CountdownModule,
    Ng2SearchPipeModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    NgxMaskModule.forRoot(),



  ],
  providers: [BehaviorService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
