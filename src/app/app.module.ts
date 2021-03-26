import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule } from './shared/fixedplugin/fixedplugin.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { EmployeeDetailComponent } from "./components/employee-detail/employee-detail.component";
import { LoginComponent } from "./components/login/login.component";
import { AdminLayoutHrComponent } from "./layouts/admin-layout-hr/admin-layout-hr.component";
import { SidebarHrModule } from "./sidebar-hr/sidebar-hr.module";
import { SidebarHrComponent } from './sidebar-hr/sidebar-hr.component';
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { RegisterComponent } from './components/register/register.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HousingdetailComponent } from './pages-hr/housingdetail/housingdetail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AdminLayoutHrComponent,
    EmployeeDetailComponent,
    LoginComponent,
    SidebarHrComponent,
    OnboardingComponent,
    RegisterComponent,
    HousingdetailComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, {
    useHash: true,
    relativeLinkResolution: 'legacy'
}),
    HttpClientModule,
    ReactiveFormsModule,
    SidebarModule,
    SidebarHrModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FixedPluginModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
