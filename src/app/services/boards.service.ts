import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { Board } from '@models/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private readonly _http = inject(HttpClient);

  readonly apiUrl = environment.API_URL;

  getBoard(id: Board['id']) {
    return this._http.get<Board>(`${this.apiUrl}/api/v1/boards/${id}`, {
      context: checkToken(),
    });
  }
}
