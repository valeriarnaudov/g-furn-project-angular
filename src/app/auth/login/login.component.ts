
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  onSubmit() {
    this.authService
      .login(this.form.value)
      .then((res) => {
        this.router.navigate(['/main']);
      })
      .catch((err) => console.log(err));
  }
}
