import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form: FormGroup;

  constructor (private authService: AuthService, private router: Router) {
    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  onSubmit() {
    this.authService.register(this.form.value)
      .then(res => {
        console.log(res);
        this.router.navigate(['/auth/login']);
      })
      .catch(err => console.log(err)
      ) 
  }
}
