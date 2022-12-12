import { AuthService } from '../../services/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form: FormGroup;
  uploadedImg!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private storage: Storage
  ) {
    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      img: new FormControl(),
      name: new FormControl(),
      years: new FormControl(),
      rePassword: new FormControl(),
    });
  }

  registerHandler() {
    console.log(this.form.value);
    // this.authService.register(this.form.value)
    //   .then(res => {
    //     console.log(res);
    //     this.router.navigate(['/auth/login']);
    //   })
    //   .catch(err => console.log(err)
    //   )
  }

  uploadProfileImg($event: any) {
    const file = $event.target.files[0];
    const imgRef = ref(this.storage, `images/${file.name}`)

    uploadBytes(imgRef, file)
      .then(async res => {
        const link = await getDownloadURL(res.ref)
        this.uploadedImg = link;
        console.log(this.uploadedImg)

      })
      .catch(err => console.log(err))
  }
}
