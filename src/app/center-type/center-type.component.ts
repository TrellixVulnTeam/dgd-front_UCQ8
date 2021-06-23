import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CenterType } from './center-type-model.component';
import { GetCenterTypes } from '../configUrls';

@Component({
  selector: 'app-center-type',
  templateUrl: './center-type.component.html',
  styleUrls: ['./center-type.component.css']
})
export class CenterTypeComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'name_en', 'created_at', 'updated_at'];

  constructor(
    private httpClient: HttpClient
  ) { }

  CenterTypes : CenterType[] = []
  ngOnInit(): void {
    this.getCenterTypes();
  }

  getCenterTypes() {  
    this.httpClient.get<any>(GetCenterTypes).subscribe(
      response => {
      
        this.CenterTypes = response.data;
        console.log(this.CenterTypes);
        
      }
    );
  }

}
