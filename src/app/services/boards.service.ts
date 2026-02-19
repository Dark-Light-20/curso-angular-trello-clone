import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { Board } from '@models/board.model';
import { Card } from '@models/card.model';
import { Colors } from '@models/colors.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private readonly _http = inject(HttpClient);
  private readonly _bufferSpace = 65536;

  readonly apiUrl = environment.API_URL;

  getBoard(id: Board['id']) {
    return this._http.get<Board>(`${this.apiUrl}/api/v1/boards/${id}`, {
      context: checkToken(),
    });
  }

  createBoard(title: string, backgroundColor: Colors) {
    return this._http.post<Board>(
      `${this.apiUrl}/api/v1/boards`,
      { title, backgroundColor },
      { context: checkToken() },
    );
  }

  getPosition(cards: Card[], currentIndex: number) {
    if (cards.length === 1) {
      return this._bufferSpace;
    } else if (currentIndex === 0) {
      return cards[1].position / 2;
    } else if (currentIndex === cards.length - 1) {
      return cards[currentIndex - 1].position + this._bufferSpace;
    } else {
      return (
        (cards[currentIndex - 1].position + cards[currentIndex + 1].position) /
        2
      );
    }
  }
}
