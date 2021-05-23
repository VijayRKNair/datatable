import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserListingComponent } from './user-listing.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select'
import {MatSnackBarModule} from '@angular/material/snack-bar';

const uploadRoutes: Routes = [{
  path: '',
  component: UserListingComponent
}];

@NgModule({
  declarations: [UserListingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(uploadRoutes),
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatSnackBarModule
  ]
})
export class UserListingModule { }
