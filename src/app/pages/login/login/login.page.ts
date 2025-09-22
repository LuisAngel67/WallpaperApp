import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from 'src/app/modules/core/providers/auth/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  LoginForm!: FormGroup;

  constructor(private fb: FormBuilder, private readonly authSrv: Auth) {}

  ngOnInit() {
    this.LoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async login() {
    try {
      const { email, password } = this.LoginForm.value;
      const userCredential = await this.authSrv.login(email, password);
    } catch (error) {}
  }
}
