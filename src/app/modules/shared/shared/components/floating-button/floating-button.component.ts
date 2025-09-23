import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signOut } from '@angular/fire/auth';
import { FileService } from 'src/app/modules/core/providers/file/file';
import { Uploader } from 'src/app/modules/core/providers/uploader/uploader';
import { saveImageService } from 'src/app/modules/core/providers/saveImage/save-image';
import { AddedImage } from 'src/app/modules/core/providers/addedImage/added-image';
import { Loading } from 'src/app/modules/core/providers/loading/loading';

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
    private fileService: FileService,
    private uploader: Uploader,
    private saveImageService: saveImageService,
    private addedImage: AddedImage,
    private loading: Loading
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
    if (!file) {
      console.log('No image selected');
      return;
    }

    await this.loading.present('LOADING.UPLOAD_IMAGE');

    try {
      let blob: Blob;

      if (file.webPath) {
        const response = await fetch(file.webPath);
        blob = await response.blob();
      } else if (file.blob && file.blob instanceof Blob) {
        blob = file.blob;
      } else if (file.path) {
        const { Filesystem } = await import('@capacitor/filesystem');
        const contents = await Filesystem.readFile({ path: file.path });
        const base64 = contents.data as string;
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        blob = new Blob([byteArray], { type: file.type || 'image/jpeg' });
      } else if (file instanceof File) {
        blob = file;
      } else {
        throw new Error(
          'Formato de archivo no soportado por FileService.pickImage()'
        );
      }

      const newFile = new File([blob], file.name || `image-${Date.now()}.jpg`, {
        type: blob.type || 'image/jpeg',
      });

      const url = await this.uploader.uploadImage(newFile);

      if (url) {
        await this.saveImageService.saveImage(url);
        this.addedImage.notifyImageAdded();
      }
    } catch (err) {
      console.error('Error picking/uploading image:', err);
    } finally {
      await this.loading.dismiss();
    }
  }
}
