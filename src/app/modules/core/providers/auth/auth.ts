import { Injectable } from '@angular/core';
import { Auth as AuthFirebase } from '@angular/fire/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private readonly authFirebase: AuthFirebase) {}

  async register(email: string, password: string) {
    await createUserWithEmailAndPassword(this.authFirebase, email, password);
  }

  async login(email: string, password: string) {}
}
