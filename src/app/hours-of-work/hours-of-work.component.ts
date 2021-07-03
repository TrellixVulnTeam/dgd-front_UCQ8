import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { HoursOfWorkModel, DeleteHoursOfWorkModel } from './hourse-of-work-model.component';
import { EditHourseOfWorkUrl, GetHoursOfWorksUrl } from '../configUrls';
import { DialogService } from '../shared/dialog.service';
import { AppComponent } from '../app.component';
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'app-hours-of-work',
  templateUrl: './hours-of-work.component.html',
  styleUrls: ['./hours-of-work.component.css',  '../app.component.css']
})
export class HoursOfWorkComponent implements OnInit {


  title = 'لیست انواع ساعت کاری' ;
  createForm : boolean = false ;
  displayedColumns: string[] = ['id', 'saturday_start', 'saturday_end', 'sunday_start', 'sunday_end', 'monday_start', 'monday_end',
  'thursday_start', 'thursday_end', 'wednesday_start', 'wednesday_end', 'tuesday_start', 'tuesday_end',
   'friday_start', 'friday_end', 'edit', 'delete'];
  constructor(
    private httpClient: HttpClient, 
    private dialogService : DialogService,
    private appComponent : AppComponent
  ) { }

  
  createHoursOfWork = new HoursOfWorkModel(0, '', '', '','','','','','','','','','','','','','post',false);


  HourseOfWorks : HoursOfWorkModel[] = []
  ngOnInit(): void {
    this.getHourseOfWorks();
  }
 
  getHourseOfWorks() {  
    this.appComponent.loading=true;
    this.httpClient.get<any>(GetHoursOfWorksUrl).subscribe(
      response => {
        this.appComponent.loading= false;
        if (response.success) {
          this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
          this.HourseOfWorks = response.data;
          this.HourseOfWorks.forEach(element => {
            element.is_editable =false;
          })
        } else {
          this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','notok');
          console.log('fail.')
        }
       
      }
    );
  }

  onDelete(hourse_of_work: HoursOfWorkModel) {
    this.dialogService.openConfirmDialog().afterClosed().subscribe(
      res => {
        if (res) {
          this.appComponent.loading = true;
          this.httpClient.delete<any>(EditHourseOfWorkUrl + '/' + hourse_of_work.id).subscribe(
            response => {
              this.appComponent.loading = false;
            if (response.success) {
              this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
              this.getHourseOfWorks();
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

  onEdit(hourse_of_work: HoursOfWorkModel) {
    hourse_of_work.is_editable = !hourse_of_work.is_editable;
  }

  cancelEdit(hourse_of_work: HoursOfWorkModel) {
    hourse_of_work.is_editable = !hourse_of_work.is_editable;
  }

  update(hourse_of_work: HoursOfWorkModel) {
    hourse_of_work._method = "put";
    this.appComponent.loading=true;
    this.httpClient.post<any>(EditHourseOfWorkUrl + '/' + hourse_of_work.id, hourse_of_work).subscribe(
      response => {
        console.log(response);
        this.appComponent.loading= false;
       if (response.success) {
        this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
        hourse_of_work.is_editable =false;
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

  create(create: HoursOfWorkModel){
    this.appComponent.loading=true;
    this.httpClient.post<any>(EditHourseOfWorkUrl, create).pipe(
      catchError(this.appComponent.handleError<any[]>('', [])),  
    ).subscribe(
      response => {
        this.appComponent.loading= false;
       if (response.success) {
        this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
        this.createForm =false;
       this.getHourseOfWorks();
       } else {
        this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','notok');
         console.log('fail');
       }
      }
    );
  }


}







