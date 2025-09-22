import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Auth as AuthFirebase,
  onAuthStateChanged,
  User,
} from '@angular/fire/auth';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
  standalone: false,
})
export class UpdatePage implements OnInit {
  UpdateForm!: FormGroup;
  uid: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthFirebase,
    private firestore: Firestore
  ) {}

  ngOnInit() {
    this.UpdateForm = this.fb.group({
      name: ['', [Validators.required]],
      lastName: ['', Validators.required],
    });

    onAuthStateChanged(this.auth, async (user: User | null) => {
      if (user) {
        this.uid = user.uid;
        const userDoc = doc(this.firestore, 'users', this.uid);
        const userSnap = await getDoc(userDoc);
        if (userSnap.exists()) {
          const data = userSnap.data();
          this.UpdateForm.patchValue({
            name: data['name'] || '',
            lastName: data['lastName'] || '',
          });
        }
      }
    });
  }

  async update() {
    if (this.uid) {
      const userDoc = doc(this.firestore, 'users', this.uid);
      await updateDoc(userDoc, {
        name: this.UpdateForm.value.name,
        lastName: this.UpdateForm.value.lastName,
      });
    }
    this.router.navigate(['/home']);
  }

  cancelUpdate() {
    this.router.navigate(['/home']);
  }
}
