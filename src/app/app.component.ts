import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AppTranslateService } from './modules/core/providers/translate/translate';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private appTranslate: AppTranslateService
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready();
    await this.appTranslate.init();
  }
}
