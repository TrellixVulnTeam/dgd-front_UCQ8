import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CenterTypeModel, DeleteCenterTypeModel } from './center-type-model.component';
import { CreateCenterTypeUrl, DeleteCenterTypeUrl, EditCenterTypeUrl, GetCenterTypesUrl } from '../configUrls';
import { DialogService } from '../shared/dialog.service';
import { AppComponent } from '../app.component';

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
    private dialogService : DialogService,
    private appComponent : AppComponent
  ) { }

  
  createCenterType = new CenterTypeModel(0, '', '', '','post',false);


  CenterTypes : CenterTypeModel[] = []
  ngOnInit(): void {
    this.getCenterTypes();
  }
 
  getCenterTypes() {  
    this.appComponent.loading=true;
    this.httpClient.get<any>(GetCenterTypesUrl).subscribe(
      response => {
        this.appComponent.loading= false;
        if (response.success) {
          this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
          this.CenterTypes = response.data;
          this.CenterTypes.forEach(element => {
            element.is_editable =false;
          })
        } else {
          this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','notok');
          console.log('fail.')
        }
       
      }
    );
  }

  onDelete(center: CenterTypeModel) {
    this.dialogService.openConfirmDialog().afterClosed().subscribe(
      res => {
        if (res) {
          this.appComponent.loading = true;
          this.httpClient.delete<any>(DeleteCenterTypeUrl + '/' + center.id).subscribe(
            response => {
              this.appComponent.loading = false;
            if (response.success) {
              this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
              this.getCenterTypes();
            //  this.CenterTypes = this.appComponent.removeElementFromArray(center, this.CenterTypes); 
            } else {
              console.log('fail');
              this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','notok');
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
    this.appComponent.loading=true;
    this.httpClient.post<any>(EditCenterTypeUrl + '/' + centerType.id, centerType).subscribe(
      response => {
        console.log(response);
        this.appComponent.loading= false;
       if (response.success) {
        this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
         centerType.is_editable =false;
       } else {
         console.log('fail');
         this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','notok');
       }
       
      }
    );
  }

  showCreateForm() {
    this.createForm = true;
  }

  create(create: CenterTypeModel){
    this.appComponent.loading=true;
    this.httpClient.post<any>(CreateCenterTypeUrl, create).subscribe(
      response => {
        this.appComponent.loading= false;
       if (response.success) {
        this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
        this.createForm =false;
       this.getCenterTypes();
       } else {
        this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','notok');
         console.log('fail');
       }
      }
    );
  }

}








