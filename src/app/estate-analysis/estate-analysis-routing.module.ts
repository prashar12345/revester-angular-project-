import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarkitCapComponent } from './markit-cap/markit-cap.component';
import { RealAnalysisComponent } from './real-analysis/real-analysis.component';
import { LayoutBudgetComponent } from './real-budgeting/layout-budget/layout-budget.component';

const routes: Routes = [
  {
    path: 'analysis',
    component: RealAnalysisComponent,
  },
  {
    path: 'budgeting',
    component: LayoutBudgetComponent,
  },
  {
    path:'markit/cap',
    component:MarkitCapComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstateAnalysisRoutingModule { }
