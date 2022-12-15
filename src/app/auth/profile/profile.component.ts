import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  id!: string;
  userData!: any;
  currentUser!: any;

  isOwner: boolean = false;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user') as any);
    this.id = this.activatedRoute.snapshot.params?.['id'];
    if (this.currentUser?.uid === this.id) {
      this.isOwner = true;
    }
    this.authService
      .getUserData(this.id)
      .then((res) => {
        if (this.currentUser.uid === this.id) {
          this.userData = { ...res, uid: this.id };
        } else {
          this.userData = res;
        }
      })
      .catch((err) => console.log(err));
  }
}
