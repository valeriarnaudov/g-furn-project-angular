import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { appEmailValidator } from 'src/app/shared/validators/app-email-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup;
  loginError = false;

  constructor(private authService: AuthService, private router: Router) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, appEmailValidator()]),
      password: new FormControl('', [Validators.required]),
    });
  }

  loginHandler() {
    this.authService
      .login(this.form.value)
      .then((res) => {
        this.router.navigate(['/collection']);
      })
      .catch((err) => (this.loginError = true));
  }
}
