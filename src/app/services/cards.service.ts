import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { Card, UpdateCardDto } from '@models/card.model';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  private readonly _apiUrl = environment.API_URL;
  private readonly _http = inject(HttpClient);

  update(id: Card['id'], changes: UpdateCardDto) {
    return this._http.put<Card>(`${this._apiUrl}/api/v1/cards/${id}`, changes, {
      context: checkToken(),
    });
  }
}
