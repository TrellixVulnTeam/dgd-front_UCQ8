import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AddressModel, CenterModel, ImageModel, PhoneModel } from './center-model.component';
import { ImageUrl, EditCenterUrl, EditHourseOfWorkUrl, GetCentersUrl, PhoneUrl, AddressUrl } from '../configUrls';
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
         'phones',
         'addresses',
         'edit',
         'delete',
        //  'updated_at',
        ];
  constructor(
    private httpClient: HttpClient, 
    private dialogService : DialogService,
    private appComponent : AppComponent
  ) { }

  
  createCenter = new CenterModel(0, '', '', '', 0, '', 0, 0, 0, '', 0 , 0, '', '' , '',false, false, false,[],[],[],[],[],[],[]);
  createPhone = new PhoneModel(0,'','centers','post');
  createAddress = new AddressModel(0,'','','centers','post');


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
    this.httpClient.post<any>(PhoneUrl + '/' + center_id, phone).subscribe(
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
    this.httpClient.post<any>(AddressUrl + '/' + center_id, address).subscribe(
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
  

}








