import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UrlShortenerService } from './services/url-shortener.service';
import { ShortUrlItemComponent } from './components/short-url-item/short-url-item.component';
import { ClipboardModule } from 'ngx-clipboard';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    ShortUrlItemComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ClipboardModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    UrlShortenerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
