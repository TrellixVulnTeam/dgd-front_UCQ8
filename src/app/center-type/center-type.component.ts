import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CenterTypeModel, DeleteCenterTypeModel } from './center-type-model.component';
import { CreateCenterTypeUrl, DeleteCenterTypeUrl, EditCenterTypeUrl, GetCenterTypesUrl } from '../configUrls';
import { DialogService } from '../shared/dialog.service';
import { center } from '../center/center-model.component';

@Component({
  selector: 'app-center-type',
  templateUrl: './center-type.component.html',
  styleUrls: ['./center-type.component.css', '../app.component.css']
})
export class CenterTypeComponent implements OnInit {
  title = 'لیست انواع مراکز' ;
  createForm : boolean = false ;
  displayedColumns: string[] = ['id', 'name', 'name_en', 'created_at', 'edit', 'delete'];
  constructor(
    private httpClient: HttpClient, 
    private dialogService : DialogService
  ) { }

  
  createCenterType = new CenterTypeModel(0, '', '', '','post',false);


  CenterTypes : CenterTypeModel[] = []
  ngOnInit(): void {
    this.getCenterTypes();
  }
 
  getCenterTypes() {  
    this.httpClient.get<any>(GetCenterTypesUrl).subscribe(
      response => {
        this.CenterTypes = response.data;
        this.CenterTypes.forEach(element => {
          element.is_editable =false;
        })
      }
    );
  }

  onDelete(id: number) {
    this.dialogService.openConfirmDialog().afterClosed().subscribe(
      res => {
        if (res) {
          this.httpClient.delete<any>(DeleteCenterTypeUrl + '/' + id).subscribe(
            response => {
            if (response.success) {
              this.getCenterTypes();
            }
            }
          );
        }
      }

    )
  }

  onEdit(centerType: CenterTypeModel) {
    centerType.is_editable = !centerType.is_editable;
  }

  cancelEdit(centerType: CenterTypeModel) {
    centerType.is_editable = !centerType.is_editable;
  }

  update(centerType: CenterTypeModel) {
    centerType._method = "put";
    this.httpClient.post<any>(EditCenterTypeUrl + '/' + centerType.id, centerType).subscribe(
      response => {
       if (response.success) {
         centerType.is_editable =false;
       } else {
         console.log(response.message);
       }
       
      }
    );
  }

  showCreateForm() {
    this.createForm = true;
  }

  create(create: CenterTypeModel){
    this.httpClient.post<any>(CreateCenterTypeUrl, create).subscribe(
      response => {
       if (response.success) {
       this.getCenterTypes();
       } else {
         console.log(response.message);
       }
      }
    );
  }

}








