import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AddressModel, DoctorModel, City, ImageModel, PhoneModel, Pivot, Province, SpecialtyDoctorModel, CenterDoctorModel, College } from './doctor-model.component';
import { ImageUrl, EditDoctorUrl, GetDoctorsUrl, PhoneUrl, AddressUrl, SpecialtyDoctorUrl, CenterDoctorUrl, GetProvincesUrl, GetCitiesUrl, EditSpecialtyUrl, GetColegesUrl, DownloadImgUrl } from '../configUrls';
import { DialogService } from '../shared/dialog.service';
import { AppComponent } from '../app.component';
import { SpecialtyModel } from '../specialty/specialty-model.component';
import { CenterModel } from '../center/center-model.component';
import { SpecialtyComponent } from '../specialty/specialty.component';
import { CollegeComponent } from '../college/college.component';
import { CollegeModel } from '../college/college-model.component';
import { catchError } from 'rxjs/operators';
import { HoursOfWorkComponent } from '../hours-of-work/hours-of-work.component';
import { HoursOfWorkModel } from '../hours-of-work/hourse-of-work-model.component';
import { CenterComponent } from '../center/center.component';

@Component({
  selector: 'app-center',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css', '../app.component.css']
})
export class DoctorComponent implements OnInit {
  title = 'لیست دکترها' ;
  createForm : boolean = false ;
  displayedColumns: string[] = [  
          'id' ,
         'name' ,
         'site' ,
         'system_medicine_number' ,
         'work_experience' ,
         'has_office' ,
         'area' ,
         'area_name' ,
         'satisfaction' ,
         'hours_of_work_id' ,
         'latitude' ,
         'longitude' ,
         'country',
         'province',
         'city',
         'college',
         'images',
         'phones',
         'addresses',
         'specialties',
         'centers',
         'edit',
         'delete',
        //  'updated_at',
        ];
  constructor(
    private httpClient: HttpClient, 
    private dialogService : DialogService,
    private appComponent : AppComponent,
    private specialtyComponent : SpecialtyComponent,
    private centerComponent : CenterComponent,
    private collegeComponent : CollegeComponent,
    private hoursOfWorkComponent : HoursOfWorkComponent,
  ) { }

  
// columns
showPhoneColumns = false;
showImagesColumns = false;
showAddressesColumns = false;
showSpecialtiesColumns = false;
showCentersColumns = false;
showHoursOfWorksColumns = false;




Provinces : Province[] = [];
Cities : City[] = [];
Colleges : CollegeModel[] = [];
HoursOfWorks : HoursOfWorkModel[] = []

emptyProvince = new Province(32,1,'','');
emptyCities = new City(473,32,'','');
emptyCollege = new College(0,'','');


  createDoctor = new DoctorModel(0, '', '', 0, 0, 1, 32, 473, null, 0, '', 0, null, 0, 0, '', 'post', false, false,false, false , false, false, [] , this.emptyProvince, this.emptyCities, this.emptyCollege,[],[],[], [], []);
  createPhone = new PhoneModel(0,'','doctors','post');
  createAddress = new AddressModel(0,'','','doctors','post');
  createSpecialty = new SpecialtyModel(0,'', '', '', '','post',false);

  pivot = new Pivot(0,null,0,null);
  pivot_id : number = 0
  createSpecialties = new SpecialtyDoctorModel(0, '', '', '', this.pivot);
  createCenters = new CenterDoctorModel(0, '', 'post', this.pivot);
  


  
  Doctors : DoctorModel[] = []
  Specialties : SpecialtyModel[] = []
  Centers : CenterModel[] = []
  
  

 
  ngOnInit(): void {
    this.getProvinces();
    this.getDoctors();
    this.specialtyComponent.getSpecialties();  
    this.centerComponent.getCenters();  
    this.collegeComponent.getColleges();
    this.hoursOfWorkComponent.getHourseOfWorks();
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

  getCities(province_id: number) {
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

  onDelete(doctor: DoctorModel) {
    this.dialogService.openConfirmDialog().afterClosed().subscribe(
      res => {
        if (res) {
          this.appComponent.loading = true;
          this.httpClient.delete<any>(EditDoctorUrl + '/' + doctor.id).subscribe(
            response => {
              this.appComponent.loading = false;
            if (response.success) {
              this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
              this.getDoctors();
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

  onEdit(doctor: DoctorModel) {
    doctor.is_editable = !doctor.is_editable; 
    this.Colleges = this.collegeComponent.Colleges; 
    this.HoursOfWorks = this.hoursOfWorkComponent.HourseOfWorks;
  }

  cancelEdit(doctor: DoctorModel) {
    doctor.is_editable = !doctor.is_editable;
  }

  update(doctor: DoctorModel) {
    doctor._method = "put";
    this.appComponent.loading=true;
    this.httpClient.post<any>(EditDoctorUrl + '/' + doctor.id, doctor).subscribe(
      response => {
        this.appComponent.loading= false;
       if (response.success) {
        this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
        doctor.is_editable =false;
       } else {
         console.log('fail');
         this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','notok');
       }
       
      }
    );
  }

 
  showCreateForm() {
    this.createForm = true;
    this.Colleges = this.collegeComponent.Colleges;
    this.HoursOfWorks = this.hoursOfWorkComponent.HourseOfWorks;
  }

  create(create: DoctorModel){
    this.appComponent.loading=true;
    this.httpClient.post<any>(EditDoctorUrl, create).pipe(
      catchError(this.appComponent.handleError<any[]>('', [])),  
    ).subscribe(
      response => {
        this.appComponent.loading= false;
       if (response.success == true) {
        this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
        this.createForm =false;
       this.getDoctors();
       } else  if (response.success == false){
        console.log(response.message);
        this.appComponent.openSnackBar(response.message,'ok');
       }
      }
    );
  }

  Download(img: string, subUrl : string) {
    window.open(DownloadImgUrl + subUrl + '/' + img);
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
              this.getDoctors();
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

  addImage(doctor_id : number, event:any) {
    let file = <File>event.target.files[0];
     const formData = new FormData(); 
     formData.append('image', file);
     formData.append('type', 'doctors');
    this.appComponent.loading=true;
    this.httpClient.post<any>(ImageUrl + '/' + doctor_id, formData).subscribe(
      response => {
        this.appComponent.loading= false;
       if (response.success) {
        this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
       this.getDoctors();
       } else {
        this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','notok');
         console.log('fail');
       }
      }
    );

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
              this.getDoctors();
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


  addPhone(phone: PhoneModel, doctor_id: number) {
    console.log(phone);
    this.appComponent.loading=true;
    this.httpClient.post<any>(PhoneUrl + '/' + doctor_id, phone).pipe(
      catchError(this.appComponent.handleError<any[]>('', [])),  
    ).subscribe(
      response => {
        this.appComponent.loading= false;
       if (response.success) {
        this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
       this.getDoctors();
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
              this.getDoctors();
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

  addAddress(address: AddressModel, doctor_id: number) {
    this.appComponent.loading=true;
    this.httpClient.post<any>(AddressUrl + '/' + doctor_id, address).pipe(
      catchError(this.appComponent.handleError<any[]>('', [])),  
    ).subscribe(
      response => {
        this.appComponent.loading= false;
       if (response.success) {
        this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
       this.getDoctors();
       } else {
       
       }
      }
    );

  }

  deleteSpecialtyDoctor(specialtyDoctorPivot: any) {
    console.log(specialtyDoctorPivot);
    this.dialogService.openConfirmDialog().afterClosed().subscribe(
      res => {
        if (res) {
          this.appComponent.loading = true;
          this.httpClient.delete<any>(SpecialtyDoctorUrl + '/' + specialtyDoctorPivot.id).subscribe(
            response => {
              this.appComponent.loading = false;
            if (response.success) {
              this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
              this.getDoctors();
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
  
  editSpecialtyDoctor(elemen:any) {
    elemen.specialty_doctor_editable = true;
    this.Specialties = this.specialtyComponent.Specialties;
  }

  addSpecialtyDoctor(specialty_doctor_id: number, doctor_id: number) {
    if (specialty_doctor_id != 0) {
      this.pivot.specialty_id = specialty_doctor_id;
    }
    
    this.appComponent.loading=true;
    this.httpClient.post<any>(SpecialtyDoctorUrl + '/' + doctor_id, this.pivot).pipe(
      catchError(this.appComponent.handleError<any[]>('', [])),  
    ).subscribe(
      response => {
        this.appComponent.loading= false;
       if (response.success) {
        this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
       this.getDoctors();
       } else {
        
       }
      }
    );

  }


  deleteCenterDoctor(centerDoctorPivot: any) { 
    this.dialogService.openConfirmDialog().afterClosed().subscribe(
      res => {
        if (res) {
          this.appComponent.loading = true;
          this.httpClient.delete<any>(CenterDoctorUrl + '/' + centerDoctorPivot.id).subscribe(
            response => {
              this.appComponent.loading = false;
            if (response.success) {
              this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
              this.getDoctors();
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
  
  editCenterDoctor(elemen:any) {
    elemen.center_doctor_editable = true;
    this.Centers = this.centerComponent.Centers;
  }

  addCenterDoctor(center_doctor_id: number, doctor_id: number) {
    if (center_doctor_id != 0) {
      this.pivot.center_id = center_doctor_id;
      this.pivot.doctor_id = doctor_id;
    }
    
    this.appComponent.loading=true;
    this.httpClient.post<any>(CenterDoctorUrl + '/' + this.pivot.center_id, this.pivot).pipe(
      catchError(this.appComponent.handleError<any[]>('', [])),  
    ).subscribe(
      response => {
        this.appComponent.loading= false;
       if (response.success) {
        this.appComponent.openSnackBar('عملیات با موفقیت انجام شد','ok');
       this.getDoctors();
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
      case "specialties": 
      this.showSpecialtiesColumns = !this.showSpecialtiesColumns;
      break;
      case "centers": 
      this.showCentersColumns = !this.showCentersColumns;
      break;
    }
 
  }

}








