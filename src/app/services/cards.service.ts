import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { Card, UpdateCardDto } from '@models/card.model';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  private readonly apiUrl = environment.API_URL;
  private readonly _http = inject(HttpClient);

  updateCard(cardId: string, updateCardDto: UpdateCardDto) {
    return this._http.put<Card>(
      `${this.apiUrl}/api/v1/cards/${cardId}`,
      updateCardDto,
      {
        context: checkToken(),
      },
    );
  }
}
