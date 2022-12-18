import { Component, OnInit } from '@angular/core';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  form: FormGroup;
  uploadedImg!: string;
  id!: string;
  userData!: any;
  currentUser!: any;

  isOwner: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private storage: Storage,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = new FormGroup({
      img: new FormControl(''),
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      years: new FormControl('', [
        Validators.required,
        Validators.min(16),
        Validators.max(80),
      ]),
    });
  }
  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user') as any);
    this.id = this.activatedRoute.snapshot.params?.['id'];
    if (this.currentUser?.uid !== this.id) {
      this.router.navigate(['/profile']);
      return;
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

  editProfileHandler() {
    if (window.confirm('Do you want to save the changes?')) {
      const value = this.form.value;
      if (
        value.name !== '' &&
        value.name !== null &&
        value.name !== undefined
      ) {
        this.userData.name = value.name;
      }
      if (
        value.years !== '' &&
        value.years !== null &&
        value.years !== undefined
      ) {
        this.userData.years = value.years;
      }
      if (value.img !== '' && value.img !== null && value.img !== undefined) {
        this.userData.img = this.uploadedImg;
      }
      this.authService
        .editUserData(this.id, this.userData)
        .then((res) => {
          this.router.navigate(['/auth/profile/' + this.id]);
        })
        .catch((err) => console.log(err));
    }
  }

  uploadProfileImg($event: any) {
    const file = $event.target.files[0];
    const imgRef = ref(this.storage, `images/${file.name}`);

    uploadBytes(imgRef, file)
      .then(async (res) => {
        const link = await getDownloadURL(res.ref);
        this.uploadedImg = link;
      })
      .catch((err) => console.log(err));
  }
}
