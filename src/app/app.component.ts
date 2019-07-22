import { LOCAL_STORAGE_KEY } from './constants/local-storage-keys.constants';
import { ShortUrl } from './models/url-shortener-reponse.model';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UrlShortenerService } from './services/url-shortener.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private static readonly LOCAL_STORAGE_KEY = LOCAL_STORAGE_KEY;
  title = 'mk-url-shortener-client';
  loading = false;
  showErrorMsg = false;
  shortUrlItems: ShortUrl[] = [];
  public longUrlInput = new FormControl(null, [
    Validators.required,
    Validators.pattern(`http(s)?:\/\/(.*)`)
  ]);

  constructor(private urlShortenerService: UrlShortenerService) { }

  ngOnInit() {
    const data = localStorage.getItem(AppComponent.LOCAL_STORAGE_KEY);
    if (data) {
      this.shortUrlItems = JSON.parse(data);
      console.log(this.shortUrlItems);
    }
  }

  shortenUrl() {
    if (this.longUrlInput.valid) {
      this.loading = true;
      this.urlShortenerService.shortenGivenUrl(this.longUrlInput.value).pipe(
        finalize(() => this.loading = false)
      ).subscribe(
        (response) => {
          this.longUrlInput.setValue('');
          this.insertShortUrlItem(response);
        },
        (error) => {
          this.displayErrorMsg();
        }
      );
    } else {
      this.displayErrorMsg();
    }
  }

  private displayErrorMsg() {
    this.showErrorMsg = true;
    setTimeout(() => {
      this.showErrorMsg = false;
    }, 3000);
  }

  private insertShortUrlItem(item: ShortUrl) {
    if (this.shortUrlItems.length >= 3) {
      this.shortUrlItems.shift();
    }
    this.shortUrlItems.push(item);
    localStorage.setItem(AppComponent.LOCAL_STORAGE_KEY, JSON.stringify(this.shortUrlItems));
  }

}
