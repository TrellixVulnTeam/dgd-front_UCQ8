import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './IRANYekan/Farsi_numerals/WebFonts/css/fontiran.css']
})
export class AppComponent {
  @ViewChild(MatSidenav) 
  sidenav! : MatSidenav;
  title = 'پنل دیجی درمان';

  constructor(private observer: BreakpointObserver){

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

}
