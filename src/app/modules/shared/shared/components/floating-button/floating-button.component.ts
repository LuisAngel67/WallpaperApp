import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signOut } from '@angular/fire/auth';

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.scss'],
  standalone: false,
})
export class FloatingButtonComponent implements OnInit {
  constructor(private router: Router, private auth: Auth) {}

  ngOnInit() {}

  goToUpdate() {
    this.router.navigate(['/update']);
  }

  async logOut() {
    await signOut(this.auth);
    this.router.navigate(['/login']);
  }
}
