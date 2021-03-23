import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/employee/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
    { path: '/employee/user',          title: 'Personal Info',      icon:'nc-single-02',  class: '' },
    { path: '/employee/table',         title: 'Visa Status Mgmt.',        icon:'nc-tile-56',    class: '' },
    { path: '/employee/hire',         title: 'Hire',        icon:'nc-badge',    class: '' },
    { path: '/employee/housing',         title: 'Housing',        icon:'nc-istanbul',    class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
