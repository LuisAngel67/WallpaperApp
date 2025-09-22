import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  setDoc,
  doc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class Query {
  constructor(private readonly fst: Firestore) {}

  async set(collectionName: string, uid: string, data: any) {
    try {
      const newDoc = doc(this.fst, collectionName, uid);
      await setDoc(newDoc, data);
    } catch (error) {}
  }
}
