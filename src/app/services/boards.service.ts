import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { Board } from '@models/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  private readonly _apiUrl = environment.API_URL;
  private readonly _http = inject(HttpClient);

  getBoard(id: Board['id']) {
    return this._http.get<Board>(`${this._apiUrl}/api/v1/boards/${id}`, {
      context: checkToken(),
    });
  }
}
