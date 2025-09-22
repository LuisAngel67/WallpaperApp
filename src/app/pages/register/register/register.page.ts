import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/modules/shared/shared/services/user/user';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/modules/core/providers/toast/toast';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  RegisterForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private readonly userSrv: User,
    private router: Router,
    private toast: ToastService
  ) {}

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
    await this.toast.show('Usuario created succesfully ✅', 'long');
    this.router.navigate(['/login']);
  }
}
