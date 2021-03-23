import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { HousingComponent } from 'app/pages/housing/housing.component';
import { HireComponent } from 'app/pages/hire/hire.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TableComponent },
    { path: 'hire',          component: HireComponent },
    { path: 'housing',          component: HousingComponent },
];
