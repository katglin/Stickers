import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StickersComponent }      from './components/stickers/stickers.component';
import { StickerDetailComponent }  from './components/sticker-detail/sticker-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: StickersComponent },
  { path: 'detail/:id', component: StickerDetailComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}