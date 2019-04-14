import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Sticker } from '../models/Sticker';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(
    private http: HttpClient) { }

  /** GET heroes from the server */
  getHeroes (): Observable<Sticker[]> {
    return this.http.get<Sticker[]>(this.heroesUrl)
      .pipe(
        catchError(this.handleError<Sticker[]>('getHeroes', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Sticker> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Sticker[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        catchError(this.handleError<Sticker>(`getHero id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Sticker> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Sticker>(url).pipe(
      catchError(this.handleError<Sticker>(`getHero id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Sticker[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Sticker[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      catchError(this.handleError<Sticker[]>('searchHeroes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addHero (hero: Sticker): Observable<Sticker> {
    return this.http.post<Sticker>(this.heroesUrl, hero, httpOptions).pipe(
      catchError(this.handleError<Sticker>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero (hero: Sticker | number): Observable<Sticker> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Sticker>(url, httpOptions).pipe(
      catchError(this.handleError<Sticker>('deleteHero'))
    );
  }

  /** PUT: update the hero on the server */
  updateHero (hero: Sticker): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}