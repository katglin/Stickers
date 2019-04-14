import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgxEditorModule } from 'ngx-editor';
import { ModalModule } from 'ngx-bootstrap/modal';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './services/in-memory-data.service';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { StickerDetailComponent as StickerDetailComponent }  from './components/sticker-detail/sticker-detail.component';
import { StickersComponent }      from './components/stickers/stickers.component';
import { StickerSearchComponent }  from './components/sticker-search/sticker-search.component';
import { CurrentDateComponent } from './components/current-date/current-date.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    TooltipModule.forRoot(),
    AngularFontAwesomeModule,
    NgxEditorModule,
    ModalModule.forRoot(),

    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  declarations: [
    AppComponent,
    StickersComponent,
    StickerDetailComponent,
    StickerSearchComponent,
    CurrentDateComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }