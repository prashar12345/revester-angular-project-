import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{ AboutUsComponent } from './about-us/about-us.component'
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';

const routes: Routes = [
  {
		path: '',
		redirectTo: 'home',
		pathMatch: 'prefix',
	},
  {
    path:'contact-us',
    component: ContactUsComponent
  },
  {
    path:'about-us',
    component: AboutUsComponent
  },
  {
    path:'privacy-policy',
    component: PrivacyPolicyComponent
  },
  {
    path:'trems-condition',
    component: TermsConditionComponent
  },
 
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule {
 
 }
