import { Component, OnInit } from '@angular/core';
import {
  Auth as AuthFirebase,
  onAuthStateChanged,
  User,
} from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  userName: string = '';

  constructor(private auth: AuthFirebase, private firestore: Firestore) {}

  ngOnInit() {
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
}
