import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Preferences } from '@capacitor/preferences';
import { Device } from '@capacitor/device';

@Injectable({
  providedIn: 'root',
})
export class AppTranslateService {
  private supported = ['en', 'es'];
  private defaultLang = 'en';
  private prefKey = 'app_lang';

  constructor(private translate: TranslateService) {
    this.translate.addLangs(this.supported);
    this.translate.setDefaultLang(this.defaultLang);
  }

  async init() {
    const { value } = await Preferences.get({ key: this.prefKey });
    if (value) {
      this.useLanguage(value);
      return;
    }

    let lang = this.defaultLang;
    try {
      const info = await Device.getLanguageCode();
      const short = info.value.split('-')[0];
      lang = this.supported.includes(short) ? short : this.defaultLang;
    } catch (e) {
      const nav = navigator.language.split('-')[0];
      lang = this.supported.includes(nav) ? nav : this.defaultLang;
    }

    this.useLanguage(lang);
    await Preferences.set({ key: this.prefKey, value: lang });
  }

  async useLanguage(lang: string) {
    const l = this.supported.includes(lang) ? lang : this.defaultLang;
    this.translate.use(l);
    await Preferences.set({ key: this.prefKey, value: l });
  }

  getCurrentLang() {
    return (
      this.translate.currentLang ||
      this.translate.getDefaultLang() ||
      this.defaultLang
    );
  }
}
