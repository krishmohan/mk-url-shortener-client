import { FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { UrlShortenerService } from './services/url-shortener.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mk-url-shortener-client';
  showErrorMsg = false;
  gotShortUrl = false;
  public longUrlInput = new FormControl(null, [
    Validators.required,
    Validators.pattern(`http(s)?:\/\/(.*)`)
  ]);

  constructor(private urlShortenerService: UrlShortenerService) { }

  shortenUrl() {
    if (this.longUrlInput.valid) {
      this.urlShortenerService.shortenGivenUrl(this.longUrlInput.value).subscribe(
        (response) => {
          this.longUrlInput.setValue(`mktin.tk/${response.shortUrl}`);
          this.gotShortUrl = true;
        },
        (error) => {
          console.log(error);
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

}
