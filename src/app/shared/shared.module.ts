import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    UserSidebarComponent
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,MatChipsModule,
    NgbModule,RouterModule,MatCheckboxModule,MatDatepickerModule,
    NgxPaginationModule,MatIconModule,MatFormFieldModule,MatNativeDateModule
  ],
  exports:[
    FormsModule,ReactiveFormsModule,UserSidebarComponent,MatDatepickerModule,
    NgbModule,RouterModule,MatCheckboxModule,MatChipsModule,
    NgxPaginationModule,MatIconModule,MatFormFieldModule
  ]
})
export class SharedModule { }
