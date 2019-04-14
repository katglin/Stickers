import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

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
  deletedSticker: Sticker;
  modalRef: BsModalRef;

  constructor(private stickerService: StickerService, private modalService: BsModalService) { }

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

  openModal(template: TemplateRef<any>, sticker) {
    this.deletedSticker = sticker;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm modal-dialog-centered', ignoreBackdropClick: true, keyboard: false});
  }

  confirm(): void {
    this.delete(this.deletedSticker);
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

}