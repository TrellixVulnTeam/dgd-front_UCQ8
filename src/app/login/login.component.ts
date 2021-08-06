import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { EditCenterUrl, LoginUrl } from '../configUrls';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css',  '../app.component.css']
})
export class LoginComponent implements AfterViewChecked {
  constructor(
    private appComponent : AppComponent,
    private httpClient : HttpClient,
    private router : Router,
  ) { }

  
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  @Input() error: string | null = null;

  @Output() submitEM = new EventEmitter();


  ngAfterViewChecked(): void {
    this.appComponent.loading=false;
    
  }

  login() {

    
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
    console.log(222);
    this.httpClient.post<any>(LoginUrl, this.form.getRawValue()).subscribe(
      response => {
        localStorage.setItem('id_token', response.token);
        localStorage.setItem("expires_at", response.token_validity);
        this.router.navigate(['/']);
      },
      err => {
        this.appComponent.openSnackBar('نام کاربری یا رمز عبور اشتباه است','notok');
      }

    );
  }

}
