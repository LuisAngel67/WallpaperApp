import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class Loading {
  private loading: HTMLIonLoadingElement | null = null;

  constructor(
    private loadingCtrl: LoadingController,
    private translate: TranslateService
  ) {}

  async present(translationKey?: string) {
    let message: string | undefined;

    if (translationKey) {
      message = await this.translate.get(translationKey).toPromise();
    }

    this.loading = await this.loadingCtrl.create({
      message,
      spinner: 'crescent',
      translucent: true,
      backdropDismiss: false,
    });

    await this.loading.present();
  }

  async dismiss() {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
    }
  }
}
