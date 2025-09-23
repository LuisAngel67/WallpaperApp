import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { Auth } from './providers/auth/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { Query } from './providers/query/query';
import { ToastService } from './providers/toast/toast';
import { Uploader } from './providers/uploader/uploader';

const providers = [Auth, Query, ToastService, Uploader];

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.FIREBASE_CONFIG)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    providers,
  ],
})
export class CoreModule {}
