import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { HousingComponent } from 'app/pages/housing/housing.component';
import {ReportcommentComponent} from 'app/pages/reportcomment/reportcomment.component';



export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TableComponent },
    { path: 'housing',          component: HousingComponent },
    { path: 'housing/reportcomment/:facilityreportID',       component: ReportcommentComponent}
 
];
