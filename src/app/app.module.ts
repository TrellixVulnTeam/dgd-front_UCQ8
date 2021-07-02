import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { AppRoutingModule } from './app-routing.module';
import { SpecialTestComponent } from './special-test/special-test.component';
import { InsurranceCompanyComponent } from './insurrance-company/insurrance-company.component';
import { CenterTypeComponent } from './center-type/center-type.component';
import { CenterComponent } from './center/center.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DoctorComponent } from './doctor/doctor.component';
import { SpecialtyComponent } from './specialty/specialty.component';
import { CollegeComponent } from './college/college.component';
import { HoursOfWorkComponent } from './hours-of-work/hours-of-work.component';




const routes: Routes = [
  { path: '', component: CenterComponent},
  { path: 'center-type', component: CenterTypeComponent},
  { path: 'insuurance-company', component: InsurranceCompanyComponent},
  { path: 'special-test', component: SpecialTestComponent},
  { path: 'doctor', component: DoctorComponent},
  { path: 'specialty', component: SpecialtyComponent},
  { path: 'college', component: CollegeComponent},
  { path: 'hours_of_work', component: HoursOfWorkComponent},
]


@NgModule({
  declarations: [
    AppComponent,
    SpecialTestComponent,
    InsurranceCompanyComponent,
    CenterTypeComponent,
    CenterComponent,
    MatConfirmDialogComponent,
    DoctorComponent,
    SpecialtyComponent,
    CollegeComponent,
    HoursOfWorkComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule, 
    AppRoutingModule, 
    RouterModule.forRoot(routes),
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,
    MatSnackBarModule,
    
  ],
  providers: [SpecialTestComponent, InsurranceCompanyComponent, HoursOfWorkComponent, CenterTypeComponent, SpecialtyComponent, CollegeComponent],
  bootstrap: [AppComponent],
  entryComponents:[MatConfirmDialogComponent]
})
export class AppModule { }
