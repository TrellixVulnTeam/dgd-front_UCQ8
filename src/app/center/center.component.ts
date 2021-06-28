import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CenterModel } from './center-model.component';
import { EditCenterUrl, EditHourseOfWorkUrl, GetCentersUrl } from '../configUrls';
import { DialogService } from '../shared/dialog.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.css', '../app.component.css']
})
export class CenterComponent implements OnInit {
  title = 'لیست مراکز' ;
  createForm : boolean = false ;
  displayedColumns: string[] = [  
          'id' ,
         'name' ,
         'center_type',
         'site' ,
         'technical_manager_name' ,
         'area' ,
         'area_name' ,
         'discount' ,
         'satisfaction' ,
         'hours_of_work_id' ,
         'governmental_type' ,
         'latitude' ,
         'longitude' ,
         'logo' ,
         'country',
         'province',
         'city',
         'images',
         'edit',
         'delete',
        //  'updated_at',
        ];
  constructor(
    private httpClient: HttpClient, 
    private dialogService : DialogService,
    private appComponent : AppComponent
  ) { }

  
  createCenter = new CenterModel(0, '', '', '', 0, '', 0, 0, 0, '', 0 , 0, '', '' , '',false, [],[],[],[],[]);


  Centers : CenterModel[] = []
  ngOnInit(): void {
    this.getCenters();
  }
 
  getCenters() {  
    this.appComponent.loading=true;
    this.httpClient.get<any>(GetCentersUrl).subscribe(
      response => {
        this.appComponent.loading= false;
        if (response.success) {
          this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
          this.Centers = response.data;
          this.Centers.forEach(element => {
            element.is_editable =false;
          })
        } else {
          this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','notok');
          console.log('fail.')
        }
       
      }
    );
  }

  onDelete(center: CenterModel) {
    this.dialogService.openConfirmDialog().afterClosed().subscribe(
      res => {
        if (res) {
          this.appComponent.loading = true;
          this.httpClient.delete<any>(EditHourseOfWorkUrl + '/' + center.id).subscribe(
            response => {
              this.appComponent.loading = false;
            if (response.success) {
              this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
              this.getCenters();
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

  onEdit(center: CenterModel) {
    center.is_editable = !center.is_editable;
  }

  cancelEdit(center: CenterModel) {
    center.is_editable = !center.is_editable;
  }

  update(center: CenterModel) {
    center._method = "put";
    this.appComponent.loading=true;
    this.httpClient.post<any>(EditCenterUrl + '/' + center.id, center).subscribe(
      response => {
        console.log(response);
        this.appComponent.loading= false;
       if (response.success) {
        this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
        center.is_editable =false;
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

  create(create: CenterModel){
    this.appComponent.loading=true;
    this.httpClient.post<any>(EditCenterUrl, create).subscribe(
      response => {
        this.appComponent.loading= false;
       if (response.success) {
        this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
        this.createForm =false;
       this.getCenters();
       } else {
        this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','notok');
         console.log('fail');
       }
      }
    );
  }

}








