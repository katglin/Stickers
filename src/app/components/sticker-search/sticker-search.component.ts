import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Sticker } from '../../models/Sticker';
import { StickerService } from '../../services/sticker.service';

@Component({
  selector: 'app-sticker-search',
  templateUrl: './sticker-search.component.html',
  styleUrls: [ './sticker-search.component.css' ]
})
export class StickerSearchComponent implements OnInit {
  stickers$: Observable<Sticker[]>;
  private searchTerms = new Subject<string>();

  constructor(private stickerService: StickerService) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.stickers$ = this.searchTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.stickerService.searchStickers(term)),
    );
  }
}