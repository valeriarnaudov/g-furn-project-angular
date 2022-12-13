import { AuthService } from '../../services/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';
import { appEmailValidator } from 'src/app/shared/validators/app-email-validator';
import { rePassValidator } from 'src/app/shared/validators/re-pass-validator';

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
      email: new FormControl('', [Validators.required, appEmailValidator()]),
      img: new FormControl(''),
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      years: new FormControl('', [
        Validators.required,
        Validators.min(16),
        Validators.max(80),
      ]),
      pass: new FormGroup(
        {
          password: new FormControl('', [
            Validators.required,
            Validators.minLength(5),
          ]),
          rePassword: new FormControl('', [Validators.required]),
        },
        {
          validators: [rePassValidator('password', 'rePassword')],
        }
      ),
    });
  }

  registerHandler() {
    const req = { ...this.form.value, img: this.uploadedImg || '' };
    this.authService
      .register(req)
      .then((res) => {
        console.log(res);
        this.router.navigate(['/collection']);
      })
      .catch((err) => console.log(err));
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
