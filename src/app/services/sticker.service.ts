import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Sticker } from '../models/Sticker';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class StickerService {

  private stickersUrl = 'api/stickers';

  constructor(
    private http: HttpClient) { }

  getStickers (): Observable<Sticker[]> {
    return this.http.get<Sticker[]>(this.stickersUrl)
      .pipe(
        catchError(this.handleError<Sticker[]>('getStickers', []))
      );
  }

  getStickerNo404<Data>(id: number): Observable<Sticker> {
    const url = `${this.stickersUrl}/?id=${id}`;
    return this.http.get<Sticker[]>(url)
      .pipe(
        map(stickers => stickers[0]), // returns a {0|1} element array
        catchError(this.handleError<Sticker>(`getSticker id=${id}`))
      );
  }

  getSticker(id: number): Observable<Sticker> {
    const url = `${this.stickersUrl}/${id}`;
    return this.http.get<Sticker>(url).pipe(
      catchError(this.handleError<Sticker>(`getSticker id=${id}`))
    );
  }

  searchStickers(term: string): Observable<Sticker[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Sticker[]>(`${this.stickersUrl}/?name=${term}`).pipe(
      catchError(this.handleError<Sticker[]>('searchStickers', []))
    );
  }

 addSticker (sticker: Sticker): Observable<Sticker> {
   sticker.createdAt = new Date();
    return this.http.post<Sticker>(this.stickersUrl, sticker, httpOptions).pipe(
      catchError(this.handleError<Sticker>('addSticker'))
    );
  }

  deleteSticker (sticker: Sticker | number): Observable<Sticker> {
    const id = typeof sticker === 'number' ? sticker : sticker.id;
    const url = `${this.stickersUrl}/${id}`;

    return this.http.delete<Sticker>(url, httpOptions).pipe(
      catchError(this.handleError<Sticker>('deleteSticker'))
    );
  }

  updateSticker (sticker: Sticker): Observable<any> {
    sticker.modifiedAt = new Date();
    return this.http.put(this.stickersUrl, sticker, httpOptions).pipe(
      catchError(this.handleError<any>('updateSticker'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}