import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogListingComponent } from './blog-listing/blog-listing.component';

const routes: Routes = [
  {
    path: 'blogs',
    component: BlogListingComponent,
  },
  {
    path: 'blogdetail/:id',
    component: BlogDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
