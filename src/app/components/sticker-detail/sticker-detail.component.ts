import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Sticker }         from '../../models/Sticker';
import { StickerService }  from '../../services/sticker.service';

@Component({
  selector: 'app-sticker-detail',
  templateUrl: './sticker-detail.component.html',
  styleUrls: [ './sticker-detail.component.css' ]
})
export class StickerDetailComponent implements OnInit {
  @Input() sticker: Sticker;

  constructor(
    private route: ActivatedRoute,
    private stickerService: StickerService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getSticker();
  }

  getSticker(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.stickerService.getSticker(id)
      .subscribe(sticker => this.sticker = sticker);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.stickerService.updateSticker(this.sticker)
      .subscribe(() => this.goBack());
  }
}