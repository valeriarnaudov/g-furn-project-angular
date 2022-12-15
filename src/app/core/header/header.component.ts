import { Component, DoCheck } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements DoCheck {
  loggedUser!: any;
  userData!: any;

  constructor(private authService: AuthService) {
    // if (localStorage.getItem('user') as any) {
    //   this.loggedUser = JSON.parse(localStorage.getItem('user') as any);
    //   this.authService.getUserData(this.loggedUser.uid).then((res) => {
    //     this.userData = { ...res, uid: this.loggedUser.uid };
    //   });
    // }
  }
  ngDoCheck(): void {
    if (localStorage.getItem('user')) {
      this.loggedUser = JSON.parse(localStorage.getItem('user') as any);
      this.authService.getUserData(this.loggedUser.uid).then((res) => {
        this.userData = { ...res, uid: this.loggedUser.uid };
      });
    } else {
      this.userData = '';
    }
  }
}
