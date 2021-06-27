import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { InsurranceCompanyModel, DeleteInsurranceCompanyModel } from './insurrance-company-mode.component';
import { GetInsuranceCompaniesUrl, EditInsuranceCompanyUrl } from '../configUrls';
import { DialogService } from '../shared/dialog.service';
import { AppComponent } from '../app.component'

@Component({
  selector: 'app-insurance-company',
  templateUrl: './insurrance-company.component.html',
  styleUrls: ['./insurrance-company.component.css', '../app.component.css']
})
export class InsurranceCompanyComponent implements OnInit {
  title = 'لیست انواع بیمه' ;  

  createForm : boolean = false ;
  displayedColumns: string[] = ['id', 'name', 'name_en', 'type', 'created_at', 'edit', 'delete'];
  constructor(
    private httpClient: HttpClient, 
    private dialogService : DialogService,
    private appComponent : AppComponent
  ) { }

  
  createInsuranceCompany = new InsurranceCompanyModel(0, '', '', '','post', false, 'private');


  InsuranceCompanies : InsurranceCompanyModel[] = []
  ngOnInit(): void {
    this.getInsuranceCompanies();
  }
 
  getInsuranceCompanies() {  
    this.appComponent.loading=true;
    this.httpClient.get<any>(GetInsuranceCompaniesUrl).subscribe(
      response => {
        this.appComponent.loading = false;
        if(response.success) {
          this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
          this.InsuranceCompanies = response.data;
          this.InsuranceCompanies.forEach(element => {
            element.is_editable =false;
          })
        } else {
          this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','notok');
          console.log('fail');
        }
       
      }
    );
  }

  onDelete(id: number) {
    this.dialogService.openConfirmDialog().afterClosed().subscribe(
      res => {
        if (res) {
          this.appComponent.loading=true;
          this.httpClient.delete<any>(EditInsuranceCompanyUrl + '/' + id).subscribe(
            response => {
              this.appComponent.loading = false;
            if (response.success) {
              this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
              this.getInsuranceCompanies();
            } else {
              this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','notok');
              console.log('fail');
            }
            }
          );
        }
      }

    )
  }

  onEdit(insuranceCompany: InsurranceCompanyModel) {
    insuranceCompany.is_editable = !insuranceCompany.is_editable;
  }

  cancelEdit(insuranceCompany: InsurranceCompanyModel) {
    insuranceCompany.is_editable = !insuranceCompany.is_editable;
  }

  update(insuranceCompany: InsurranceCompanyModel) {
    insuranceCompany._method = "put";
    this.appComponent.loading=true;
    this.httpClient.post<any>(EditInsuranceCompanyUrl + '/' + insuranceCompany.id, insuranceCompany).subscribe(
      response => {
        this.appComponent.loading = false;
       if (response.success) {
        this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
        insuranceCompany.is_editable =false;
       } else {
        this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','notok');
         console.log('fail');
       }
       
      }
    );
  }

  showCreateForm() {
    this.createForm = true;
  }

  create(insuranceCompany: InsurranceCompanyModel){
    this.appComponent.loading=true;
    this.httpClient.post<any>(EditInsuranceCompanyUrl, insuranceCompany).subscribe(
      response => {
        this.appComponent.loading = false;
       if (response.success) {
        this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
         this.createForm =false;
       this.getInsuranceCompanies();
       } else {
        this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','notok');
         console.log('fail');
       }
      }
    );
  }

}








