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
    
    houses : house[];
    constructor(private housingservice : HouseService){}   

    ngOnInit() {
        this.housingservice.getHouses()
          .subscribe( data => {
            this.houses = data;
          });
      };

      

}
