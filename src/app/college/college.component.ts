import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CollegeModel, DeleteCollegeModel } from './college-model.component';
import { EditCollegeUrl, GetColegesUrl } from '../configUrls';
import { DialogService } from '../shared/dialog.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.css', '../app.component.css']
})
export class CollegeComponent implements OnInit {
  title = 'لیست دانشگاه' ;
  createForm : boolean = false ;
  displayedColumns: string[] = ['id', 'name', 'name_en', 'created_at', 'edit', 'delete'];
  constructor(
    private httpClient: HttpClient, 
    private dialogService : DialogService,
    private appComponent : AppComponent
  ) { }

  
  createCollege = new CollegeModel(0, '', '', '','post',false);


  Colleges : CollegeModel[] = []
  ngOnInit(): void {
    this.getColleges();
  }
 
  getColleges() {  
    this.appComponent.loading=true;
    this.httpClient.get<any>(GetColegesUrl).subscribe(
      response => {
        this.appComponent.loading= false;
        if (response.success) {
          this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
          this.Colleges = response.data;
          this.Colleges.forEach(element => {
            element.is_editable =false;
          })
        } else {
          this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','notok');
          console.log('fail.')
        }
       
      }
    );
  }

  onDelete(college: CollegeModel) {
    this.dialogService.openConfirmDialog().afterClosed().subscribe(
      res => {
        if (res) {
          this.appComponent.loading = true;
          this.httpClient.delete<any>(EditCollegeUrl + '/' + college.id).subscribe(
            response => {
              this.appComponent.loading = false;
            if (response.success) {
              this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
              this.getColleges();
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

  onEdit(college: CollegeModel) {
    college.is_editable = !college.is_editable;
  }

  cancelEdit(college: CollegeModel) {
    college.is_editable = !college.is_editable;
  }

  update(college: CollegeModel) {
    college._method = "put";
    this.appComponent.loading=true;
    this.httpClient.post<any>(EditCollegeUrl + '/' + college.id, college).subscribe(
      response => {
        console.log(response);
        this.appComponent.loading= false;
       if (response.success) {
        this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
         college.is_editable =false;
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

  create(create: CollegeModel){
    this.appComponent.loading=true;
    this.httpClient.post<any>(EditCollegeUrl, create).subscribe(
      response => {
        this.appComponent.loading= false;
       if (response.success) {
        this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
        this.createForm =false;
       this.getColleges();
       } else {
        this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','notok');
         console.log('fail');
       }
      }
    );
  }

}








