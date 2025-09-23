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
  showDropdown = false;

  constructor(private appTranslate: AppTranslateService) {}

  ngOnInit() {
    this.current = this.appTranslate.getCurrentLang();
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  async selectLang(lang: string) {
    await this.appTranslate.useLanguage(lang);
    this.current = lang;
    this.showDropdown = false;
  }
}
