import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';
import { UserComponent }            from '../../pages/user/user.component';
import { TableComponent }           from '../../pages/table/table.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HousingComponent } from 'app/pages/housing/housing.component';
import { DetailsUploadComponent } from 'app/pages/user/details-upload/details-upload.component';
// import { DetailsUploadComponent_hr } from 'app/pages-hr/table/details-upload/details-upload.component';

import { FormUploadComponent } from 'app/shared/form-upload/form-upload.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        NgbModule
    ],
    exports: [
        FormUploadComponent
    ],
    declarations: [
        DashboardComponent,
        UserComponent,
        TableComponent,
        HousingComponent,
        DetailsUploadComponent,
        FormUploadComponent,
        // DetailsUploadComponent_hr
    ]
})

export class AdminLayoutModule {}
