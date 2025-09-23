import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddedImage {
  private imageAddedSource = new Subject<void>();
  imageAdded$ = this.imageAddedSource.asObservable();

  notifyImageAdded() {
    this.imageAddedSource.next();
  }
}
