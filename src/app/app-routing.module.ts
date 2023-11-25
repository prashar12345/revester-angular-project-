import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthSubscriptionComponent } from './auth-subscription/auth-subscription.component';
import { AuthModule } from './auth/auth.module';
import { LoginComponent } from './auth/login/login.component';
import { BlogModule } from './blog/blog.module';
import { CommingSoonComponent } from './comming-soon/comming-soon.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { EstateAnalysisModule } from './estate-analysis/estate-analysis.module';
import { FindPropertyComponent } from './find-property/find-property.component';
import { HomeComponent } from './home/home.component';
import { ProfileModule } from './profile/profile.module';
import { PropertyCrawlComponent } from './property-crawl/property-crawl.component';
import { PropertyModule } from './property/property.module';

import { AuthGuard } from './shared/auth.guard';
import { SubscriptionGuard } from './shared/subscription.guard';
import { SubscriptionPlanComponent } from './subscription-plan/subscription-plan.component';
import { LayoutComponent } from './theme/layout/layout.component';
import { PagesModule } from "./theme/pages/pages.module";
const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,
    children: [

      {
        path: '',
        // redirectTo: 'HomeComponent',
        pathMatch: 'full',
        component: HomeComponent,
      },
      {
        path: 'verify/user',
        // redirectTo: 'HomeComponent',
        component: HomeComponent,
      },
      {
        path: 'property-crawl',
        component: PropertyCrawlComponent,
      },
       
      {
        canActivate: [AuthGuard],
        path: 'dashboard',
        loadChildren: () => DashboardModule,
      },
      {
        path: '',
        loadChildren: () => PagesModule,
      },

      {
        path: 'auth/subscription',
        component: AuthSubscriptionComponent,
      },
      // {
      //   path: 'blogs',
      //   component: BlogListingComponent,
      //   canActivate: [SubscriptionGuard],
      // },
      // {
      //   path: 'blogdetail/:id',
      //   component: BlogDetailComponent,
      //   canActivate: [SubscriptionGuard],
      // },
      {
        path: '',
        loadChildren: () => BlogModule,
      },
      {
        path: 'subscriptionplan',
        component: SubscriptionPlanComponent,
      },
      {
        path: 'comingsoon',
        component: CommingSoonComponent,
      },
      {
        path: 'search',
        component: FindPropertyComponent,
      },

      // {
      //   path: 'property-list',
      //   component: PropertyListComponent,
      // },
      // {
      //   path: 'property-detail/:id',
      //   component: PropertyDetailComponent,
      // },
      {
        path: '',
        loadChildren: () => PropertyModule,
      },


      {
        canActivate: [AuthGuard],
        path: 'profile',
        loadChildren: () => ProfileModule,
      },
      {
        // canActivate: [AuthGuard],
        path: 'estate',
        loadChildren: () => EstateAnalysisModule
      },
      {

        path: 'analysis',
        loadChildren: () => EstateAnalysisModule
      },
      
    ],
  },
  {
    path: 'auth',
    loadChildren: () => AuthModule,
  },
  { path: '**', component: LayoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }