import { Component, Input } from '@angular/core';
import { COLORS, Colors } from '@models/colors.model';

@Component({
  selector: 'app-card-color',
  templateUrl: './card-color.component.html',
})
export class CardColorComponent {
  @Input() color: Colors = 'sky';

  mapColor = COLORS;

  get colors() {
    const clases = this.mapColor[this.color];
    return clases ?? {};
  }
}
