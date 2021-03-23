import { Component, OnInit } from "@angular/core";

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTESHR: RouteInfo[] = [
  { path: '/hr/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
  { path: '/hr/user',          title: 'Employee Profile',      icon:'nc-single-02',  class: '' },
  { path: '/hr/table',         title: 'Visa Status Mgmt.',        icon:'nc-tile-56',    class: '' },
  { path: '/hr/hire',         title: 'Hire',        icon:'nc-badge',    class: '' },
  { path: '/hr/housing',         title: 'House Mgmt.',        icon:'nc-istanbul',    class: '' },
];

@Component({
  moduleId: module.id,
  selector: 'sidebar-hr-cmp',
  templateUrl: 'sidebar-hr.component.html',
})

export class SidebarHrComponent implements OnInit {
  public menuItems: any[];
  ngOnInit() {
    this.menuItems = ROUTESHR.filter(menuItem => menuItem);
}

}
