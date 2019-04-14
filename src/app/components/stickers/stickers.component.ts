import { Component, OnInit } from '@angular/core';

import { Sticker } from '../../models/Sticker';
import { StickerService } from '../../services/sticker.service';

@Component({
  selector: 'app-stickers',
  templateUrl: './stickers.component.html',
  styleUrls: ['./stickers.component.css']
})
export class StickersComponent implements OnInit {
  stickers: Sticker[];

  constructor(private stickerService: StickerService) { }

  ngOnInit() {
    this.getStickers();
  }

  getStickers(): void {
    this.stickerService.getStickers()
    .subscribe(stickers => this.stickers = stickers);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.stickerService.addSticker({ name: name } as Sticker)
      .subscribe(sticker => {
        this.stickers.push(sticker);
      });
  }

  delete(sticker: Sticker): void {
    this.stickers = this.stickers.filter(h => h !== sticker);
    this.stickerService.deleteSticker(sticker).subscribe();
  }

}