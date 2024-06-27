import { Component, Input } from '@angular/core';
import { COLORS, Color } from '@models/color.model';

@Component({
  selector: 'app-card-color',
  templateUrl: './card-color.component.html',
})
export class CardColorComponent {
  @Input() color: Color = 'sky';

  mapColors = COLORS;

  get colors() {
    return this.mapColors[this.color] ?? {};
  }
}
