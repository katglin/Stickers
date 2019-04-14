import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Sticker } from '../models/Sticker';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const stickers = [
      { id: 1, content: 'Mr. Nice', createdAt: new Date() },
      { id: 2, content: 'Narco', createdAt: new Date() },
      { id: 3, content: 'Bombasto', createdAt: new Date() },
      { id: 4, content: 'Celeritas', createdAt: new Date() },
      { id: 5, content: 'Magneta', createdAt: new Date() }
    ];
    return {stickers};
  }

  genId(stickers: Sticker[]): number {
    return stickers.length > 0 ? Math.max(...stickers.map(sticker => sticker.id)) + 1 : 11;
  }
}