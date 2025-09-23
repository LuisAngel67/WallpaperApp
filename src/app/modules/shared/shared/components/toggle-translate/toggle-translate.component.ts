import { Component, OnInit } from '@angular/core';
import { AppTranslateService } from 'src/app/modules/core/providers/translate/translate';

@Component({
  selector: 'app-toggle-translate',
  templateUrl: './toggle-translate.component.html',
  styleUrls: ['./toggle-translate.component.scss'],
  standalone: false,
})
export class ToggleTranslateComponent implements OnInit {
  current = 'en';

  constructor(private appTranslate: AppTranslateService) {}

  ngOnInit() {
    this.current = this.appTranslate.getCurrentLang();
  }

  async change(ev: any) {
    const value = ev.detail?.value ?? ev;
    await this.appTranslate.useLanguage(value);
    this.current = value;
  }
}
