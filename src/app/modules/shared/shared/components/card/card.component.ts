import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: false,
})
export class CardComponent implements OnInit {
  @Input() imageUrl: string = '';

  constructor() {}

  ngOnInit() {}
}
