import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-upload',
  templateUrl: './details-upload.component.html',
  styleUrls: ['./details-upload.component.css']
})
export class DetailsUploadComponent_hr implements OnInit {

  @Input() fileUpload: string;

  constructor() { }

  ngOnInit(): void {
  }

}
