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

  private executeRequest(queryUrl: string): Observable<any> {
    // console.log(queryUrl);
    return this.http
      .get(queryUrl)
      .map((response:Response) => <Article>response.json());
  }
}