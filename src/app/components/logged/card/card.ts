import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() duration: string = '130h';
  @Input() approval: number = 67;
  @Input() provider: string = '';
  @Input() top10: boolean = false;
}
