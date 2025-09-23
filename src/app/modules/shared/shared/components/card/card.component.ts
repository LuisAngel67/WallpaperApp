import { Component, OnInit, Input } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: false,
})
export class CardComponent implements OnInit {
  @Input() imageUrl: string = '';

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private translate: TranslateService
  ) {}

  async onImageClick() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: this.translate.instant('ACTIONSHEET.HEADER'),
      buttons: [
        {
          text: this.translate.instant('ACTIONSHEET.WALLPAPER'),
          icon: 'image',
          handler: () => {
            console.log('Poner como fondo de pantalla:', this.imageUrl);
            // Aquí usare al plugin cuando lo haga
          },
        },
        {
          text: this.translate.instant('ACTIONSHEET.LOCKSCREEN'),
          icon: 'lock-closed',
          handler: () => {
            console.log('Poner en pantalla de bloqueo:', this.imageUrl);
            // Aquí tambien usare al plugin
          },
        },
        {
          text: this.translate.instant('ACTIONSHEET.CANCEL'),
          icon: 'close',
          role: 'cancel',
          handler: () => {},
        },
      ],
    });

    await actionSheet.present();
  }

  ngOnInit() {}
}
