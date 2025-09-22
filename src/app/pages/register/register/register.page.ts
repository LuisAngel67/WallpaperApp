import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { last } from 'rxjs';
import { User } from 'src/app/modules/shared/shared/services/user/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  RegisterForm!: FormGroup;

  constructor(private fb: FormBuilder, private readonly userSrv: User) {}

  ngOnInit() {
    this.RegisterForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  public async DoRegister() {
    await this.userSrv.create(this.RegisterForm.value);
  }
}
