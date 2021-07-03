import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './IRANYekan/Farsi_numerals/WebFonts/css/fontiran.css']
})
export class AppComponent {
  loading = true;
  @ViewChild(MatSidenav) 
  sidenav! : MatSidenav;
  title = 'پنل دیجی درمان';

  constructor(
    private observer: BreakpointObserver,
    private _snackBar: MatSnackBar
    ){

  }

  ngOnInit () {
    // this.observer.observe(['(max-width : 800px)']).subscribe((res) => {
    //   if(res.matches) {
    //     this.sidenav.mode = 'over';
    //     this.sidenav.close();
    //   } else {
    //     this.sidenav.mode = 'side';
    //     this.sidenav.open();
    //   }
    // })
    }

    httpSuccess(response: any) {
      this.loading = false;
      if(response) {
        if (response.success) {
      
        } else {
          console.log('fail.')
      
        }
      }
     
    }

    removeElementFromArray(member:any, array: any)  {
     return this.remove(member, array);
    }

    remove(member:any, array: any) {
      array.forEach((value:any,index:any)=>{
        if(value.id == member.id) {
          array.splice(index,1);
        }
    });

    return array;
    }

    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
        panelClass: ['snack-bar-container-custom']
      });
    }

    public handleError<T>(operation = 'operation', result?: T) {
    console.log(22);
      let message = 'default';
      let message_en = 'default';
      let key =  'name';
      let action = 'ok';
      return (error: any): Observable<T> => {
        
        if (error.error.message == 'The given data was invalid.') {
       
          message = 'داده ای ورودی صحیح نمیباشند.' ;
          key = Object.keys(error.error.errors)[0] ;
         message_en = error.error.errors[key][0];
          action= 'خطا';
        }
        this.openSnackBar(message + '\r' + message_en , action);
        this.loading =false;
        return of(result as T);
      };
    }

}
