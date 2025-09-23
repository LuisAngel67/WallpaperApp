import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class saveImageService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  async saveImage(url: string): Promise<void> {
    const user = this.auth.currentUser;

    if (!user) throw new Error('No hay usuario autenticado');

    const imagesCollection = collection(this.firestore, 'images');
    await addDoc(imagesCollection, {
      uid: user.uid,
      url,
      createdAt: new Date(),
    });
  }

  async getUserImages(): Promise<string[]> {
    const user = this.auth.currentUser;
    if (!user) throw new Error('No hay usuario autenticado');

    const imagesCollection = collection(this.firestore, 'images');
    const q = query(imagesCollection, where('uid', '==', user.uid));

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data()['url'] as string);
  }
}
