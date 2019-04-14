import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Sticker } from '../models/Sticker';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const stickers = [
      { id: 11, name: 'Mr. Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    return {stickers};
  }

  genId(stickers: Sticker[]): number {
    return stickers.length > 0 ? Math.max(...stickers.map(sticker => sticker.id)) + 1 : 11;
  }
}