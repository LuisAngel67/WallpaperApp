import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signOut } from '@angular/fire/auth';
import { FileService } from 'src/app/modules/core/providers/file/file';

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.scss'],
  standalone: false,
})
export class FloatingButtonComponent implements OnInit {
  constructor(
    private router: Router,
    private auth: Auth,
    private fileService: FileService
  ) {}

  ngOnInit() {}

  goToUpdate() {
    this.router.navigate(['/update']);
  }

  async logOut() {
    await signOut(this.auth);
    this.router.navigate(['/login']);
  }

  async pickImage() {
    const file = await this.fileService.pickImage();
    if (file) {
      console.log('Image charged succesfully ', file);
    } else {
      console.log('No image selected');
    }
  }
}
