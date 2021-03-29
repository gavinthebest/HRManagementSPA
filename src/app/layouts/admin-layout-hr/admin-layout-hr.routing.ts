import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages-hr/dashboard/dashboard.component';
import { UserComponent } from '../../pages-hr/user/user.component';
import { TableComponent } from '../../pages-hr/table/table.component';
import { HousingComponent } from 'app/pages-hr/housing/housing.component';
import { HireComponent } from 'app/pages-hr/hire/hire.component';
import { HousingdetailComponent } from 'app/pages-hr/housingdetail/housingdetail.component';
import { FacilityReportDetailComponent } from 'app/pages-hr/facility-report-detail/facility-report-detail.component';


export const AdminLayoutHrRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TableComponent },
    { path: 'hire',          component: HireComponent },
    { path: 'housing',          component: HousingComponent },
    { path: 'housing/housingdetail/:houseID',          component: HousingdetailComponent },
    { path: 'housing/facilityreportdetail/:facilityreportID',      component: FacilityReportDetailComponent}
];
