import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  Auth as AuthFirebase,
  onAuthStateChanged,
  User,
} from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { saveImageService } from 'src/app/modules/core/providers/saveImage/save-image';
import { AddedImage } from 'src/app/modules/core/providers/addedImage/added-image';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit, OnDestroy {
  images: string[] = [];
  userName: string = '';
  private sub!: Subscription;

  constructor(
    private auth: AuthFirebase,
    private firestore: Firestore,
    private saveImageService: saveImageService,
    private addedImage: AddedImage
  ) {}

  async ngOnInit() {
    this.images = await this.saveImageService.getUserImages();
    this.sub = this.addedImage.imageAdded$.subscribe(async () => {
      this.images = await this.saveImageService.getUserImages();
    });

    onAuthStateChanged(this.auth, async (user: User | null) => {
      if (user) {
        const userDoc = doc(this.firestore, 'users', user.uid);
        const userSnap = await getDoc(userDoc);
        if (userSnap.exists()) {
          const data = userSnap.data();
          this.userName = data['name'] || '';
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
