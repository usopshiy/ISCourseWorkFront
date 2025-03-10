import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {passwordMatchValidator} from "../../shared/password-match.directive";
import {AuthService} from "../../services/auth.service";
import {User} from "../../interfaces/user";
import {Select, SelectModule} from 'primeng/select';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    Select
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      role: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: passwordMatchValidator
    })
  }

  registerForm : FormGroup
  roles = ["ADMIN",
  "SUPPLIER",
  "OPERATOR"]

  submitDetails() {
    const postData = { ...this.registerForm.value};
    console.log(postData as User);
    this.authService.registerUser(postData as User).subscribe({
      next: response => {
        localStorage.setItem('token', response.token);
        console.log(response);
        this.router.navigate(['colonies-overview'])
      },
      error: err => {
        alert(err.error.message);
      }
    })
  }
  get username() {
    return this.registerForm.controls['username']
  }

  get role(){
    return this.registerForm.controls['role']
  }

  get password() {
    return this.registerForm.controls['password']
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword']
  }
}
