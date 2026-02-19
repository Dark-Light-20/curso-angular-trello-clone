import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-color',
  templateUrl: './card-color.component.html',
})
export class CardColorComponent {
  @Input() color: 'sky' | 'yellow' | 'green' | 'red' | 'violet' | 'gray' =
    'sky';

  mapColor = {
    sky: { 'bg-sky-700': true, 'hover:bg-sky-800': true, 'text-white': true },
    yellow: {
      'bg-yellow-100': true,
      'hover:bg-yellow-200': true,
      'text-yellow-800': true,
    },
    green: {
      'bg-green-100': true,
      'hover:bg-green-200': true,
      'text-green-800': true,
    },
    red: { 'bg-red-100': true, 'hover:bg-red-200': true, 'text-red-800': true },
    violet: {
      'bg-violet-100': true,
      'hover:bg-violet-200': true,
      'text-violet-800': true,
    },
    gray: {
      'bg-gray-100': true,
      'hover:bg-gray-200': true,
      'text-gray-800': true,
    },
  };

  get colors() {
    const clases = this.mapColor[this.color];
    return clases ?? {};
  }
}
