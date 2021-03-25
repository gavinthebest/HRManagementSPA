
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutHrRoutes } from './admin-layout-hr.routing';

import { DashboardComponent }       from '../../pages-hr/dashboard/dashboard.component';
import { UserComponent }            from '../../pages-hr/user/user.component';
import { TableComponent }           from '../../pages-hr/table/table.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HousingComponent } from 'app/pages-hr/housing/housing.component';
import { HireComponent } from 'app/pages-hr/hire/hire.component';
import { ShowUsersComponent } from 'app/pages-hr/user/show-users/show-users.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutHrRoutes),
    FormsModule,
    NgbModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TableComponent,
    HireComponent,
    HousingComponent,
    ShowUsersComponent
  ]
})

export class AdminLayoutHrModule {}