import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/model/login.user.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  apiErrorMassage: string | undefined;

  constructor(private accountService: AccountService, private fb: FormBuilder, http: HttpClient, private router: Router) {
  }

  loginFg = this.fb.group({
    emailCtrl: ['', [Validators.required, Validators.pattern(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,5})+)$/)]],
    passwordCtrl: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
  })


 get EmailCtrl(): FormControl {
    return this.loginFg.get('emailCtrl') as FormControl;
  }

  get PasswordCtrl(): FormControl {
    return this.loginFg.get('passwordCtrl') as FormControl;
  }

  login(): void {
    this.apiErrorMassage = undefined;

    let user: LoginUser = {
      email: this.EmailCtrl.value,
      password: this.PasswordCtrl.value,
    }

    this.accountService.loginUser(user).subscribe({
      next: user =>{
       console.log(user),
       this.router.navigateByUrl('/');
      },
      error: err => this.apiErrorMassage = err.error
    })
  }

  gerState(): void {
    console.log(this.loginFg);
  }
}

