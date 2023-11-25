import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstateAnalysisRoutingModule } from './estate-analysis-routing.module';
import { RealAnalysisComponent } from './real-analysis/real-analysis.component';
import { BudgetPropertyDetailsComponent } from './real-budgeting/budget-property-details/budget-property-details.component';
import { BudgetHardCostComponent } from './real-budgeting/budget-hard-cost/budget-hard-cost.component';
import { BudgetSoftCostComponent } from './real-budgeting/budget-soft-cost/budget-soft-cost.component';
import { LayoutBudgetComponent } from './real-budgeting/layout-budget/layout-budget.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhaseIvComponent } from './real-budgeting/budget-soft-cost/phase-iv/phase-iv.component';
import { PhaseVComponent } from './real-budgeting/budget-soft-cost/phase-v/phase-v.component';
import { PhaseViComponent } from './real-budgeting/budget-soft-cost/phase-vi/phase-vi.component';
import { PhaseViiComponent } from './real-budgeting/budget-soft-cost/phase-vii/phase-vii.component';
import { PhaseIComponent } from './real-budgeting/budget-hard-cost/phase-i/phase-i.component';
import { PhaseIiComponent } from './real-budgeting/budget-hard-cost/phase-ii/phase-ii.component';
import { PhaseIiiComponent } from './real-budgeting/budget-hard-cost/phase-iii/phase-iii.component';
import { PhaseViiiComponent } from './real-budgeting/budget-soft-cost/phase-viii/phase-viii.component';
import { PhaseIxComponent } from './real-budgeting/budget-soft-cost/phase-ix/phase-ix.component';
import { PhaseXComponent } from './real-budgeting/budget-soft-cost/phase-x/phase-x.component';
import { MarkitCapComponent } from './markit-cap/markit-cap.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 

@NgModule({
  declarations: [
    RealAnalysisComponent,
    BudgetPropertyDetailsComponent,
    BudgetHardCostComponent,
    BudgetSoftCostComponent,
    LayoutBudgetComponent,
    PhaseIvComponent,
    PhaseVComponent,
    PhaseViComponent,
    PhaseViiComponent,
    PhaseIComponent,
    PhaseIiComponent,
    PhaseIiiComponent,
    PhaseViiiComponent,
    PhaseIxComponent,
    PhaseXComponent,
    MarkitCapComponent,
  ],
  imports: [
    CommonModule,
    EstateAnalysisRoutingModule,
    FormsModule,
    ReactiveFormsModule,NgbModule
  ]
})
export class EstateAnalysisModule { }
