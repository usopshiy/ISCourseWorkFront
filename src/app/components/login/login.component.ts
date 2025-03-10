import {Component} from '@angular/core'
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {User} from "../../interfaces/user";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './login.component.html'
})

export class LoginComponent {
  login: string = "";
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  loginForm : FormGroup

  submitDetails() {
    const postData = { ...this.loginForm.value};
    console.log(postData as User);
    this.authService.loginUser(postData as User).subscribe({
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
    return this.loginForm.controls["username"]
  }

  get password() {
    return this.loginForm.controls["password"]
  }
}
