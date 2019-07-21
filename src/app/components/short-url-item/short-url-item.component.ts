import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ShortUrl } from './../../models/url-shortener-reponse.model';
import { SHORTEN_URL_PREFIX } from './../../constants/app-util.constants';

@Component({
  selector: 'app-short-url-item',
  templateUrl: './short-url-item.component.html',
  styleUrls: ['./short-url-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShortUrlItemComponent implements OnInit {

  private static readonly URL_PREFIX = SHORTEN_URL_PREFIX;
  @Input() shortURlData: ShortUrl;

  constructor() { }

  ngOnInit() {
  }

  get shortenUrl() {
    return `${ShortUrlItemComponent.URL_PREFIX}/${this.shortURlData.shortUrl}`
  }

}
