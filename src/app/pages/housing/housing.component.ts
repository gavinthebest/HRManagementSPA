import { Component, OnInit } from '@angular/core';
import { HouseService } from 'app/services/house.service';
//import { Housing } from 'app/pages/housing/housing.model';
import { Observable, Subject} from "rxjs";
import { house } from 'app/models/house';
 

declare interface HousingData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'housing-cmp',
    moduleId: module.id,
    templateUrl: 'housing.component.html'
})

export class HousingComponent implements OnInit{
    // public housingData1: HousingData;
    // public housingData2: HousingData;
    id: number = 1;
    house : house;
    hide = true;
    constructor(private housingservice : HouseService){}   

    ngOnInit() {
        this.housingservice.getHouse(this.id)
          .subscribe( data => {
            this.house = data;
          });
      };

      onChange() {
        this.hide = !this.hide;
      }
}
