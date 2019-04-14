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
  newSticker: string;

  constructor(private stickerService: StickerService) { }

  ngOnInit() {
    this.getStickers();
  }

  getStickers(): void {
    this.stickerService.getStickers()
    .subscribe(stickers => this.stickers = stickers);
  }

  add(): void {
    var content = this.newSticker.trim();
    this.newSticker = null;
    if (!content) { return; }
    this.stickerService.addSticker({ content: content } as Sticker)
      .subscribe(sticker => {
        this.stickers.push(sticker);
      });
  }

  delete(sticker: Sticker): void {
    this.stickers = this.stickers.filter(h => h !== sticker);
    this.stickerService.deleteSticker(sticker).subscribe();
  }

}