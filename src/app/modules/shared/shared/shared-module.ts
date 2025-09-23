import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from './services/user/user';
import { LinkComponent } from './components/link/link.component';
import { FloatingButtonComponent } from './components/floating-button/floating-button.component';
import { CardComponent } from './components/card/card.component';
import { ToggleTranslateComponent } from './components/toggle-translate/toggle-translate.component';
import { TranslateModule } from '@ngx-translate/core';

const modules = [
  CommonModule,
  IonicModule,
  FormsModule,
  ReactiveFormsModule,
  TranslateModule,
];
const components = [
  InputComponent,
  ButtonComponent,
  LinkComponent,
  FloatingButtonComponent,
  CardComponent,
  ToggleTranslateComponent,
];
const providers = [User];

@NgModule({
  declarations: [components],
  imports: [modules],
  providers: [providers],
  exports: [components, modules],
})
export class SharedModule {}
