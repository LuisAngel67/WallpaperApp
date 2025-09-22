import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.scss'],
  standalone: false,
})
export class FloatingButtonComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  goToUpdate() {
    this.router.navigate(['/update']);
  }
}
