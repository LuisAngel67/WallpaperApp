import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from './services/user/user';
import { LinkComponent } from './components/link/link.component';
import { FloatingButtonComponent } from './components/floating-button/floating-button.component';

const modules = [CommonModule, IonicModule, FormsModule, ReactiveFormsModule];
const components = [
  InputComponent,
  ButtonComponent,
  LinkComponent,
  FloatingButtonComponent,
];
const providers = [User];

@NgModule({
  declarations: [components],
  imports: [modules],
  providers: [providers],
  exports: [components, modules],
})
export class SharedModule {}
