import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Article } from '../article/article.model';

@Injectable()
export class ArticleService {
  apiUrl: string = "http://localhost:8080";
  // apiUrl: string = "http://104.236.209.190:8080";

  constructor(public http: Http) { }

  public loadPageOfArticles(pageNumber: number, pageSize: number): Observable<Article[]> {
    let queryUrl: string = `${this.apiUrl}/articles?page=${pageNumber}&size=${pageSize}`;
    return this.executeRequest(queryUrl);
  }

  public getArticleCount(): Observable<number> {
    let queryUrl: string = `${this.apiUrl}/articleCount`;
    return this.executeRequest(queryUrl);
  }

  public loadTopArticles(numberToLoad: number): Observable<Article[]> {
    let queryUrl: string = `${this.apiUrl}/topArticles?number=${numberToLoad}`;
    return this.executeRequest(queryUrl);
  }

  public loadArticleById(articleId: number): Observable<Article> {
    let queryUrl: string = `${this.apiUrl}/article?id=${articleId}`;
    return this.executeRequest(queryUrl);
  }

  public loadArticleByName(articleName: string): Observable<Article> {
    let queryUrl: string = `${this.apiUrl}/article?name=${articleName}`;
    return this.executeRequest(queryUrl);
  }

  //TODO: THIS NEEDS TO BE RESTRICTED IN PRODUCTION
  public createArticle(article: Article): Observable<number> {
    let queryUrl: string = `${this.apiUrl}/create?name=${article.name}&title=${article.title}&sub=${article.subTitle}&date=${article.publishDate}&content=${article.content}`;
    return this.executeRequest(queryUrl);
  }

  //TODO: THIS NEEDS TO BE RESTRICTED IN PRODUCTION
  public updateArticle(article: Article): Observable<number> {
    let queryUrl: string = `${this.apiUrl}/update?id=${article.id}&name=${article.name}&title=${article.title}&sub=${article.subTitle}&date=${article.publishDate}&content=${article.content}`;
    return this.executeRequest(queryUrl);
  }

  //TODO: THIS NEEDS TO BE RESTRICTED IN PRODUCTION
  public deleteArticle(article: Article): Observable<number> {
    let queryUrl: string = `${this.apiUrl}/delete?id=${article.id}`;
    return this.executeRequest(queryUrl);
  }

  public convertPublishDate(article: Article): Article {
    let date: any = article.publishDate;
    let year: number = date.year;
    let month: number = date.monthValue - 1; //javascript takes a 0 indexed month number
    let day: number = date.dayOfMonth;

    //new Date(year, month, day, hours, minutes, seconds, milliseconds)
    let newDate: Date = new Date(year, month, day, 0, 0, 0, 0);
    article.publishDate = newDate;

    return article;
  }

  private executeRequest(queryUrl: string): Observable<any> {
    // console.log(queryUrl);
    return this.http
      .get(queryUrl)
      .map((response:Response) => <Article>response.json());
  }

}