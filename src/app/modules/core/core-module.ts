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
import { saveImageService } from './providers/saveImage/save-image';
import { AddedImage } from './providers/addedImage/added-image';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppTranslateService } from './providers/translate/translate';
import { Loading } from './providers/loading/loading';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const providers = [
  Auth,
  Query,
  ToastService,
  Uploader,
  saveImageService,
  AddedImage,
  AppTranslateService,
  Loading,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'en',
    }),
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.FIREBASE_CONFIG)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    providers,
  ],
  exports: [TranslateModule],
})
export class CoreModule {}
