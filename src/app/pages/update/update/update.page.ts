import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
  standalone: false,
})
export class UpdatePage implements OnInit {
  UpdateForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.UpdateForm = this.fb.group({
      name: ['', [Validators.required]],
      lastName: ['', Validators.required],
    });
  }

  update() {}

  cancelUpdate() {
    this.router.navigate(['/home']);
  }
}
