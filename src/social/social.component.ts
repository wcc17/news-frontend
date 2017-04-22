import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {
  // facebookUrl: string = "https://www.facebook.com/plugins/share_button.php?href=http%3A%2F%2Fwww.google.com&layout=button&size=large&mobile_iframe=true&width=73&height=28";
  // twitterUrl: string = "https://platform.twitter.com/widgets/tweet_button.html?size=l&url=https%3A%2F%2Fdev.twitter.com%2Fweb%2Ftweet-button&via=twitterdev&related=twitterapi%2Ctwitter&text=custom%20share%20text&hashtags=example%2Cdemo";
  @Input() url: string;
  @Input() title: string;

  facebookUrl: string;
  twitterUrl: string;
  
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    //need to wait on parent components to get article loaded
    this.buildFacebookUrl();
    this.buildTwitterUrl();
  }

  buildFacebookUrl() {
    this.facebookUrl = "https://www.facebook.com/plugins/share_button.php?href=http%3A%2F%2Fwww.news.com"; //TODO: CHANGE NEWS.COM TO WHATEVER THE REAL DOMAIN IS. should probably inject this
    this.facebookUrl += this.url; //TODO: MAY NEED TO REPLACE '/' CHARACTERS WITH %2F
    this.facebookUrl += "&layout=button&size=large&mobile_iframe=true&width=73&height=28";
  }

  buildTwitterUrl() {
    this.twitterUrl = "https://platform.twitter.com/widgets/tweet_button.html?size=l&url=https%3A%2F%2Fwww.news.com"; //TODO: CHANGE NEWS.COM TO WHATEVER THE REAL DOMAIN IS. should probably inject this
    this.twitterUrl += this.url; //TODO: MAY NEED TO REPLACE '/' CHARACTERS WITH %2F
    // this.twitterUrl += "&via=news"; //TODO: will insert @news into tweet. add back later
    this.twitterUrl += "&text=";
    this.twitterUrl += this.title; //TODO: MAY NEED TO REPLACE SPACE CHARACTERS WITH %20
  }

}
