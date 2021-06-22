import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { center } from './center-model.component'

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.css']
})


export class CenterComponent implements OnInit {

  constructor(
    private httpClient: HttpClient
  ) { }

  centers : center[] = [];
  ngOnInit(): void {
    this.getCenters();
  }


  getCenters(){
    this.httpClient.get<any>('http://185.81.96.196:8000/api/centers').subscribe(
      response => {
        this.centers = response.data;
      }
    );
  }

}
