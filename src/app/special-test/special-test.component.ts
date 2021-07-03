import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { SpecialTestModel, DeleteSpecialTestModel } from './special-test-model.component';
import { EditSpecialTestUrl,  GetSpecialTestsUrl } from '../configUrls';
import { DialogService } from '../shared/dialog.service';
import { AppComponent } from '../app.component';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-special-test',
  templateUrl: './special-test.component.html',
  styleUrls: ['./special-test.component.css', '../app.component.css']
})

export class SpecialTestComponent implements OnInit {
  title = 'لیست انواع تست‌های خاص' ;
  createForm : boolean = false ;
  displayedColumns: string[] = ['id', 'name', 'name_en', 'created_at', 'edit', 'delete'];
  constructor(
    private httpClient: HttpClient, 
    private dialogService : DialogService,
    private appComponent : AppComponent
  ) { }

  
  createSpecialTestType = new SpecialTestModel(0, '', '', '','post',false);


  SpecialTests : SpecialTestModel[] = []
  ngOnInit(): void {
    this.getSpecialTests();
  }
 
  getSpecialTests() {  
    this.appComponent.loading=true;
    this.httpClient.get<any>(GetSpecialTestsUrl).subscribe(
      response => {
        this.appComponent.loading= false;
        if (response.success) {
          this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
          this.SpecialTests = response.data;
          this.SpecialTests.forEach(element => {
            element.is_editable =false;
          })
        } else {
          this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','notok');
          console.log('fail.')
        }
       
      }
    );
  }

  onDelete(special_test: SpecialTestModel) {
    this.dialogService.openConfirmDialog().afterClosed().subscribe(
      res => {
        if (res) {
          this.appComponent.loading = true;
          this.httpClient.delete<any>(EditSpecialTestUrl + '/' + special_test.id).subscribe(
            response => {
              this.appComponent.loading = false;
            if (response.success) {
              this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
              this.getSpecialTests();
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

  onEdit(special_test: SpecialTestModel) {
    special_test.is_editable = !special_test.is_editable;
  }

  cancelEdit(special_test: SpecialTestModel) {
    special_test.is_editable = !special_test.is_editable;
  }

  update(special_test: SpecialTestModel) {
    special_test._method = "put";
    this.appComponent.loading=true;
    this.httpClient.post<any>(EditSpecialTestUrl + '/' + special_test.id, special_test).subscribe(
      response => {
        this.appComponent.loading= false;
       if (response.success) {
        this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
        special_test.is_editable =false;
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

  create(create: SpecialTestModel){
    this.appComponent.loading=true;
    this.httpClient.post<any>(EditSpecialTestUrl, create).pipe(
      catchError(this.appComponent.handleError<any[]>('', [])),  
    ).subscribe(
      response => {
        this.appComponent.loading= false;
       if (response.success) {
        this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
        this.createForm =false;
       this.getSpecialTests();
       } else {
       
       }
      }
    );
  }

}









