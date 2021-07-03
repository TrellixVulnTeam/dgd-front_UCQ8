import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { SpecialtyModel, DeleteSpecialtyModel } from './specialty-model.component';
import { EditSpecialtyUrl, GetSpecialtiesUrl } from '../configUrls';
import { DialogService } from '../shared/dialog.service';
import { AppComponent } from '../app.component';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-specialty',
  templateUrl: './specialty.component.html',
  styleUrls: ['./specialty.component.css', '../app.component.css']
})
export class SpecialtyComponent implements OnInit {
  title = 'لیست انواع تخصص‌ها' ;
  createForm : boolean = false ;
  displayedColumns: string[] = ['id', 'name', 'name_en', 'created_at', 'edit', 'delete'];
  constructor(
    private httpClient: HttpClient, 
    private dialogService : DialogService,
    private appComponent : AppComponent
  ) { }

  
  createSpecialty = new SpecialtyModel(0, '', '', '','post',false);


  Specialties : SpecialtyModel[] = []
  ngOnInit(): void {
    this.getSpecialties();
  }
 
  getSpecialties() {  
    this.appComponent.loading=true;
    this.httpClient.get<any>(GetSpecialtiesUrl).subscribe(
      response => {
        this.appComponent.loading= false;
        if (response.success) {
          this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
          this.Specialties = response.data;
          this.Specialties.forEach(element => {
            element.is_editable =false;
          })
        } else {
          this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','notok');
          console.log('fail.')
        }
       
      }
    );
  }

  onDelete(specialty: SpecialtyModel) {
    this.dialogService.openConfirmDialog().afterClosed().subscribe(
      res => {
        if (res) {
          this.appComponent.loading = true;
          this.httpClient.delete<any>(EditSpecialtyUrl + '/' + specialty.id).subscribe(
            response => {
              this.appComponent.loading = false;
            if (response.success) {
              this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
              this.getSpecialties();
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

  onEdit(specialty: SpecialtyModel) {
    specialty.is_editable = !specialty.is_editable;
  }

  cancelEdit(specialty: SpecialtyModel) {
    specialty.is_editable = !specialty.is_editable;
  }

  update(specialty: SpecialtyModel) {
    specialty._method = "put";
    this.appComponent.loading=true;
    this.httpClient.post<any>(EditSpecialtyUrl + '/' + specialty.id, specialty).subscribe(
      response => {
        console.log(response);
        this.appComponent.loading= false;
       if (response.success) {
        this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
        specialty.is_editable =false;
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

  create(create: SpecialtyModel){
    this.appComponent.loading=true;
    this.httpClient.post<any>(EditSpecialtyUrl, create).pipe(
      catchError(this.appComponent.handleError<any[]>('', [])),  
    ).subscribe(
      response => {
        this.appComponent.loading= false;
       if (response.success) {
        this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
        this.createForm =false;
       this.getSpecialties();
       } else {
      
       }
      }
    );
  }

}








