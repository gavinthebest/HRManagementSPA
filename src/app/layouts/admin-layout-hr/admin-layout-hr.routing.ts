import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages-hr/dashboard/dashboard.component';
import { UserComponent } from '../../pages-hr/user/user.component';
import { TableComponent } from '../../pages-hr/table/table.component';
import { HousingComponent } from 'app/pages-hr/housing/housing.component';
import { HireComponent } from 'app/pages-hr/hire/hire.component';


export const AdminLayoutHrRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TableComponent },
    { path: 'hire',          component: HireComponent },
    { path: 'housing',          component: HousingComponent },
];
