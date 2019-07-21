import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShortUrl } from './../models/url-shortener-reponse.model';

@Injectable()
export class UrlShortenerService {

  private urlShortenerUrl = environment.urlShortenerServiceUrl;

  constructor(private httpClient: HttpClient) { }

  public shortenGivenUrl(longUrl): Observable<ShortUrl> {
    return this.httpClient.post(this.urlShortenerUrl, { longUrl }).pipe(
      map(v => v as ShortUrl)
    );
  }
}
