import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AddressModel, CenterModel, City, ImageModel, InsuranceCompanyCenterModel, DoctorCenterModel, PhoneModel, Pivot, Province, SpecialTestCenterModel } from './center-model.component';
import { ImageUrl, EditCenterUrl, EditHourseOfWorkUrl, GetCentersUrl, PhoneUrl, AddressUrl, SpecialTestsCenterUrl, InsuranceCompaniesCenterUrl, GetProvincesUrl, GetCitiesUrl, DownloadImgUrl, CenterDoctorUrl, GetDoctorsUrl } from '../configUrls';
import { DialogService } from '../shared/dialog.service';
import { AppComponent } from '../app.component';
import { SpecialTestModel } from '../special-test/special-test-model.component';
import { SpecialTestComponent } from '../special-test/special-test.component';
import { InsurranceCompanyModel } from '../insurrance-company/insurrance-company-mode.component';
import { DoctorModel } from '../doctor/doctor-model.component';
import { InsurranceCompanyComponent } from '../insurrance-company/insurrance-company.component';
import { HoursOfWorkComponent } from '../hours-of-work/hours-of-work.component';
import { HoursOfWorkModel } from '../hours-of-work/hourse-of-work-model.component';
import { CenterTypeComponent } from '../center-type/center-type.component';
import { CenterTypeModel } from '../center-type/center-type-model.component';
import { catchError } from 'rxjs/operators';

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
         'phones',
         'addresses',
         'special_tests',
         'insurance_companies',
         'doctors',
         'edit',
         'delete',
        //  'updated_at',
        ];
  constructor(
    private httpClient: HttpClient, 
    private dialogService : DialogService,
    private appComponent : AppComponent,
    private specialTestComponent : SpecialTestComponent,
    private insuranceCompanyComponent : InsurranceCompanyComponent,
    private hoursOfWorkComponent : HoursOfWorkComponent,
    private centerTypeComponent : CenterTypeComponent
  ) { }

  
// columns
showPhoneColumns = false;
showImagesColumns = false;
showAddressesColumns = false;
showSpecialTestsColumns = false;
showInsuranceCompaniesColumns = false;
showDoctorsColumns = false;
showHoursOfWorksColumns = false;




Provinces : Province[] = [];
Cities : City[] = [];

emptyProvince = new Province(32,1,'',''); //  defult no provicne with id= 32
emptyCities = new City(473,32,'','');//  defult no city with id= 473

  technical_manager_name = 'ندارد';
  createCenter = new CenterModel(0, '', '', this.technical_manager_name, 0, '', 0, 0, 13, 'private', 0 , 0, '' , 'post',false, false, false, false, false,false,1,32,473,null ,[],[],this.emptyProvince,this.emptyCities,[],[],[], [],[],[]);
  createPhone = new PhoneModel(0,'','centers','post');
  createAddress = new AddressModel(0,'','','centers','post');
  

  pivot = new Pivot(0,null,null,0, null);
  pivot_id : number = 0
  createSpecialTests = new SpecialTestCenterModel(0, '', '', '', this.pivot);
  createInsuranceCompanies = new InsuranceCompanyCenterModel(0, '', '', 'post', this.pivot, '');
  createDoctors = new DoctorCenterModel(0, '', 'post', this.pivot);


  
  Centers : CenterModel[] = []
  SpecialTests : SpecialTestModel[] = []
  HoursOfWorks : HoursOfWorkModel[] = []
  CenterTypes : CenterTypeModel[] = []
  InsuranceCompanies : InsurranceCompanyModel[] = []
  Doctors : DoctorModel[] = []

 
  formData = new FormData();

  ngOnInit(): void {
    this.getProvinces();
    this.getCenters();
    this.specialTestComponent.getSpecialTests();
    this.insuranceCompanyComponent.getInsuranceCompanies();
    this.getDoctors();
    this.hoursOfWorkComponent.getHourseOfWorks();
    this.centerTypeComponent.getCenterTypes();
  
  }
  getDoctors() {  
    this.appComponent.loading=true;
    this.httpClient.get<any>(GetDoctorsUrl).subscribe(
      response => {
        this.appComponent.loading= false;
        if (response.success) {
          this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
          this.Doctors = response.data;
          this.Doctors.forEach(element => {
            element.is_editable =false;
          })
        } else {
          this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','notok');
          console.log('fail.')
        }
       
      }
    );
  }

  getProvinces() {
    this.httpClient.get<any>(GetProvincesUrl).subscribe(
      response => {
        if (response.success) {
          
          this.Provinces = response.data;
        } else {
          
          console.log('fail.')
        }
       
      }
    );
  }

  getCities(province_id: number | null) {
  console.log(22);
    this.httpClient.get<any>(GetCitiesUrl + '/' + province_id).subscribe(
      response => {
        if (response.success) {
          this.Cities = response.data;
        } else {
          
          console.log('fail.')
        }
       
      }
    );
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
          this.httpClient.delete<any>(EditCenterUrl + '/' + center.id).subscribe(
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
    this.HoursOfWorks = this.hoursOfWorkComponent.HourseOfWorks;
    this.CenterTypes = this.centerTypeComponent.CenterTypes;
  
  }

  cancelEdit(center: CenterModel) {
    center.is_editable = !center.is_editable;
  }

  update(center: CenterModel) {
    center._method = "put";
    this.appComponent.loading=true;
    Object.entries(center).forEach(
      ([key, value]: any[]) => {
        if (key != 'logo') {
          this.formData.set(key, value);
        }
      })
    this.httpClient.post<any>(EditCenterUrl + '/' + center.id, this.formData).subscribe(
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
    this.CenterTypes = this.centerTypeComponent.CenterTypes;
    this.HoursOfWorks = this.hoursOfWorkComponent.HourseOfWorks;
  }

  create(create: CenterModel){
    this.appComponent.loading=true;
    Object.entries(create).forEach(
      ([key, value]: any[]) => {
        this.formData.set(key, value);
      })
    this.httpClient.post<any>(EditCenterUrl, this.formData).pipe(
      catchError(this.appComponent.handleError<any[]>('', [])),  
    ).subscribe(
      response => {
        console.log(response);
        this.appComponent.loading= false;
       if (response.success == true) {
        this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
        this.createForm =false;
       this.getCenters();
       } 
        if (response.success == false) {
        console.log(response.message);
        this.appComponent.openSnackBar(response.message,'ok');
       }
      }
    );
  }

  deleteImage(image: any) {
    console.log(image);
    this.dialogService.openConfirmDialog().afterClosed().subscribe(
      res => {
        if (res) {
          this.appComponent.loading = true;
          this.httpClient.delete<any>(ImageUrl + '/' + image.id).subscribe(
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

  addImage(center_id : number, event:any) {
    let file = <File>event.target.files[0];
     const formData = new FormData(); 
     formData.append('image', file);
     formData.append('type', 'centers');
    this.appComponent.loading=true;
    this.httpClient.post<any>(ImageUrl + '/' + center_id, formData).subscribe(
      response => {
        this.appComponent.loading= false;
       if (response.success) {
        this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
       this.getCenters();
       } else {
        this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','notok');
         console.log('fail');
       }
      }
    );

  }

  setLogo(event : any) {
    let file = <File>event.target.files[0];
    this.formData.append('logo', file);
  }

  Download(img: string, subUrl : string) {
    window.open(DownloadImgUrl + subUrl + '/' + img);
  }

  deletePhone(phone: any) {
    this.dialogService.openConfirmDialog().afterClosed().subscribe(
      res => {
        if (res) {
          this.appComponent.loading = true;
          this.httpClient.delete<any>(PhoneUrl + '/' + phone.id).subscribe(
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
  
  editPhone(elemen:any) {
    elemen.phone_editable = true;
    
  }

  addPhone(phone: PhoneModel, center_id: number) {
    console.log(phone);
    this.appComponent.loading=true;
    this.httpClient.post<any>(PhoneUrl + '/' + center_id, phone).pipe(
      catchError(this.appComponent.handleError<any[]>('', [])),  
    ).subscribe(
      response => {
        this.appComponent.loading= false;
       if (response.success) {
        this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
       this.getCenters();
       } else {
  
       }
      }
    );

  }


  deleteAddress(address: any) {
    this.dialogService.openConfirmDialog().afterClosed().subscribe(
      res => {
        if (res) {
          this.appComponent.loading = true;
          this.httpClient.delete<any>(AddressUrl + '/' + address.id).subscribe(
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
  
  editAddress(elemen:any) {
    elemen.address_editable = true;
  }

  addAddress(address: AddressModel, center_id: number) {
    this.appComponent.loading=true;
    this.httpClient.post<any>(AddressUrl + '/' + center_id, address).pipe(
      catchError(this.appComponent.handleError<any[]>('', [])),  
    ).subscribe(
      response => {
        this.appComponent.loading= false;
       if (response.success) {
        this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
       this.getCenters();
       } else {
       
       }
      }
    );

  }


  deleteSpecialTestCenter(specialTestCenterPivot: any) {
    console.log(specialTestCenterPivot);
    this.dialogService.openConfirmDialog().afterClosed().subscribe(
      res => {
        if (res) {
          this.appComponent.loading = true;
          this.httpClient.delete<any>(SpecialTestsCenterUrl + '/' + specialTestCenterPivot.id).subscribe(
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
  
  editSpecialTestCenter(elemen:any) {
    elemen.special_test_center_editable = true;
    this.SpecialTests = this.specialTestComponent.SpecialTests;
  }

  addSpecialTestCenter(special_test_center_id: number, center_id: number) {
   
    if(special_test_center_id != 0) {
      this.pivot.special_test_id = special_test_center_id;
    }
    this.appComponent.loading=true;
    this.httpClient.post<any>(SpecialTestsCenterUrl + '/' + center_id, this.pivot).pipe(
      catchError(this.appComponent.handleError<any[]>('', [])),  
    ).subscribe(
      response => {
        this.appComponent.loading= false;
       if (response.success) {
        this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
       this.getCenters();
       } else {
        
       }
      }
    );

  }

  deleteInsuranceCompanyCenter(insuranceCompanyPivot: any) {
   this.dialogService.openConfirmDialog().afterClosed().subscribe(
      res => {
        if (res) {
          this.appComponent.loading = true;
          this.httpClient.delete<any>(InsuranceCompaniesCenterUrl + '/' + insuranceCompanyPivot.id).subscribe(
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
  
  editInsuranceCompanyCenter(elemen:any) {
    elemen.insurance_company_center_editable = true;
    this.InsuranceCompanies = this.insuranceCompanyComponent.InsuranceCompanies;
  }

  addInsuranceCompanyCenter(insurance_company_center_id: number, center_id: number) {
  
    if (insurance_company_center_id != 0) {
      this.pivot.insurance_company_id = insurance_company_center_id;
    }
    
    this.appComponent.loading=true;
    this.httpClient.post<any>(InsuranceCompaniesCenterUrl + '/' + center_id, this.pivot).pipe(
      catchError(this.appComponent.handleError<any[]>('', [])),  
    ).subscribe(
      response => {
        this.appComponent.loading= false;
       if (response.success) {
        this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
       this.getCenters();
       } else {
    
       }
      }
    );

  }

  deleteDoctorCenter(doctorPivot: any) {
    this.dialogService.openConfirmDialog().afterClosed().subscribe(
       res => {
         if (res) {
           this.appComponent.loading = true;
           this.httpClient.delete<any>(CenterDoctorUrl + '/' + doctorPivot.id).subscribe(
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
   
   editDoctorCenter(elemen:any) {
     elemen.doctor_center_editable = true;
   }
 
   addDoctorCenter(doctor_center_id: number, center_id: number) {
   
     if (doctor_center_id != 0) {
       this.pivot.doctor_id = doctor_center_id;
       this.pivot.center_id = center_id;
     }
     
     this.appComponent.loading=true;
     this.httpClient.post<any>(CenterDoctorUrl + '/' + center_id, this.pivot).pipe(
       catchError(this.appComponent.handleError<any[]>('', [])),  
     ).subscribe(
       response => {
         this.appComponent.loading= false;
        if (response.success) {
         this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
        this.getCenters();
        } else {
     
        }
       }
     );
 
   }

  toggleColumn(column: string){
    switch (column)
    {
      case "phones" :
      this.showPhoneColumns = !this.showPhoneColumns;
      break;
      case "images": 
      this.showImagesColumns = !this.showImagesColumns;
      break;
      case "addresses": 
      this.showAddressesColumns = !this.showAddressesColumns;
      break;
      case "special_tests": 
      this.showSpecialTestsColumns = !this.showSpecialTestsColumns;
      break;
      case "insurance_companies": 
      this.showInsuranceCompaniesColumns = !this.showInsuranceCompaniesColumns;
      break;
      case "doctors": 
      this.showDoctorsColumns = !this.showDoctorsColumns;
      break;
      case "special_doctors": 
    }
 
  }

}








