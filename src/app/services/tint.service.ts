import { Injectable } from '@angular/core';
import { Jsonp, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TintService {
  apiRoot: string = 'https://api.tintup.com/v1';
  token: string = 'api_token=e46bfdb7f0523b2b079180f1ef58d5f8b00acea8'; // This would normally be in ENV settings instead of hard-coded in here
  private nextUrl: string;

  constructor(private jsonp: Jsonp) { }

  retrieveFirst() {
    let feedEndpoint = `${this.apiRoot}/feed/ironpan?${this.token}&callback=JSONP_CALLBACK`;
    return this.retrieveFromURL(feedEndpoint);
  }

  private retrieveFromURL(url: string) {
    return this.jsonp.request(url)
      .map(res => {
        let response = res.json();
        if(response.next_page) {
          this.nextUrl = response.next_page;
        }
        return response.data;
      });
  }

  retrieveMore() {
    if(this.nextUrl){
      return this.retrieveFromURL(`${this.nextUrl}&callback=JSONP_CALLBACK`);
    } else {
      return null;
    }
  }s

}
