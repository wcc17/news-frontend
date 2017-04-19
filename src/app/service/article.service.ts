import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from '../article/article.model';

@Injectable()
export class ArticleService {
  apiUrl: string = "http://localhost:8080";
  // apiUrl: string = "http://104.236.209.190:8080";

  constructor(public http: Http, private router: Router) { }

  public getPageOfArticles(pageNumber: number, pageSize: number, callback: any): void {
    let queryUrl: string = `${this.apiUrl}/articles?page=${pageNumber}&size=${pageSize}`;
    this.executeGetRequest(queryUrl)
      .subscribe(
        (articles: Article[]) => {
          articles = this.convertPublishDatesFromAPI(articles);
          callback(articles);
        },
        error => {
          this.onError(error);
        }
      );
  }

  public getArticleCount(callback: any): void {
    let queryUrl: string = `${this.apiUrl}/articleCount`;
    this.executeGetRequest(queryUrl)
      .subscribe(
        (count: number) => {
          callback(count);
        },
        error => {
          this.onError(error);
        }
      );
  }

  public getTopArticles(numberToLoad: number, callback: any): void {
    let queryUrl: string = `${this.apiUrl}/topArticles?number=${numberToLoad}`;
    this.executeGetRequest(queryUrl)
      .subscribe(
        (articles: Article[]) => {
          articles = this.convertPublishDatesFromAPI(articles);
          callback(articles);
        },
        error => {
          this.onError(error);
        }
      );
  }

  public getArticleById(articleId: number, callback: any): void {
    let queryUrl: string = `${this.apiUrl}/article?id=${articleId}`;
    this.executeGetRequest(queryUrl)
      .subscribe(
        (article:Article) => {
          article = this.convertPublishDateFromAPI(article);
          callback(article);
        },
        error => {
          this.onError(error);
        }
    );
  }

  public getArticleByName(articleName: string, callback: any): void {
    let queryUrl: string = `${this.apiUrl}/article?name=${articleName}`;
    this.executeGetRequest(queryUrl)
      .subscribe(
        (article:Article) => {
          article = this.convertPublishDateFromAPI(article);
          callback(article);
        },
        error => {
          this.onError(error);
        }
      );
  }

  //TODO: THIS NEEDS TO BE RESTRICTED IN PRODUCTION
  public createArticle(article: Article, callback: any) {
    let queryUrl: string = `${this.apiUrl}/create?name=${article.name}&title=${article.title}&sub=${article.subTitle}&date=${article.publishDate}&content=${article.content}`;
    this.executePostRequest(queryUrl)
      .subscribe(
        (articleId: number) => {
          callback(articleId);
        },
        error => {
          this.onError(error);
        }
      )
  }

  //TODO: THIS NEEDS TO BE RESTRICTED IN PRODUCTION
  public updateArticle(article: Article, callback: any) {
    let queryUrl: string = `${this.apiUrl}/update?id=${article.id}&name=${article.name}&title=${article.title}&sub=${article.subTitle}&date=${article.publishDate}&content=${article.content}`;
    this.executePostRequest(queryUrl)
      .subscribe(
        (articleId: number) => {
          callback(articleId);
        },
        error => {
          this.onError(error);
        }
      )
  }

  //TODO: THIS NEEDS TO BE RESTRICTED IN PRODUCTION
  public deleteArticle(article: Article, callback: any) {
    let queryUrl: string = `${this.apiUrl}/delete?id=${article.id}`;
    this.executePostRequest(queryUrl)
      .subscribe(
        (success: number) => {
          callback(success);
        },
        error => {
          this.onError(error);
        }
      );
  }

  private executeGetRequest(queryUrl: string): Observable<any> {
    return this.http
      .get(queryUrl)
      .map((response:Response) => <any>response.json());
  }

  private executePostRequest(queryUrl: string): Observable<any> {
    // return this.http
      // .put(queryUrl)
      // .map((response:Response) => <any>response.json());

      // return this.http.put
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(queryUrl, null, headers);
  }

  private onError(error: any) {
    console.log(error);
    this.router.navigate(["error"]);
  }


  //TODO: the next 3 methods might need to be in a different "ArticleService". The above methods make http requests, these just do semi-complex manipulation of article stuff. ArticleRequestService and ArticleService
  public convertPublishDateFromAPI(article: Article): Article {
    if(article.publishDate) {
      let publishDate: any = article.publishDate;

      let year: number = publishDate.year;
      let month: number = publishDate.monthValue - 1; //javascript takes a 0 indexed month number
      let day: number = publishDate.dayOfMonth;

      //new Date(year, month, day, hours, minutes, seconds, milliseconds)
      article.publishDate = new Date(year, month, day, 0, 0, 0, 0);
      return article;
    }
  }

  public convertPublishDatesFromAPI(articles: Article[]): Article[] {
    for(let article of articles) {
      article = this.convertPublishDateFromAPI(article);
    }

    return articles;
  }

  //DO NOT use padded numbers (01, 02 instead of 1, 2) in image path on filesystem
  public getArticleImagePath(article: Article): string {
    if(article) {
      if(article.publishDate && article.name) {
          let year: string = article.publishDate.getFullYear().toString();
          let month: string = (article.publishDate.getMonth()+1).toString(); //javascript month is 0 indexed
          let day: string = article.publishDate.getDate().toString();
          
          //TODO: NOT ALL IMAGES WILL BE JPEGS! WHAT DO. can i check for local file existence?
          let path: string = 'assets/images/article/' + year + '/' + month + '-' + day + '/' + article.name + '.jpg';
          return path;
      }
    }

    //TODO: where to handle this situation? or should I handle at all
    return '';
  }

  //TODO: this should not take a whole article as the argument
  public getStringFromJSDate(article: Article): string {
    if(article.publishDate != null) {
      let year: number = article.publishDate.getFullYear();
      let month: number = article.publishDate.getMonth()+1; //javascript month is 0 indexed (WHY)
      let day: number = article.publishDate.getDate();

      let dateString: string = year + "-" + this.padNumber(month) + "-" + this.padNumber(day);
      return dateString;
    }
  }

  //TODO: i don't like this here
  public padNumber(num: number): string {
    if(num < 10) {
      return ("0" + num);
    }
    return num.toString();
  }
}