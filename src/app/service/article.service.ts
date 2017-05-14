import { Injectable, isDevMode } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from '../article/article.model';

@Injectable()
export class ArticleService {
  // apiUrl: string = "http://localhost:8080/article";
  apiUrl: string = "http://104.236.209.190:8080/article";

  constructor(public http: Http, private router: Router) { }

  public getPageOfArticles(pageNumber: number, pageSize: number): Observable<Article[]> {
    let queryUrl: string = `${this.apiUrl}?page=${pageNumber}&size=${pageSize}`;
    return this.http
      .get(queryUrl)
      .map(this.extractArticlesData)
      .catch(this.handleError);
  }

  public getArticleCount(): Observable<number> {
    let queryUrl: string = `${this.apiUrl}/count`;
    return this.http
      .get(queryUrl)
      .map((response:Response) => <number>response.json())
      .catch(this.handleError);
  }

  public getTopArticles(numberToLoad: number): Observable<Article[]> {
    let queryUrl: string = `${this.apiUrl}/top?number=${numberToLoad}`;
    return this.http
      .get(queryUrl)
      .map(this.extractArticlesData)
      .catch(this.handleError);
  }

  public getArticleById(articleId: number): Observable<Article> {
    let queryUrl: string = `${this.apiUrl}?id=${articleId}`;
    return this.http
      .get(queryUrl)
      .map(this.extractArticleData)
      .catch(this.handleError);
  }

  public getArticleByName(articleName: string): Observable<Article> {
    let queryUrl: string = `${this.apiUrl}?name=${articleName}`;
    return this.http
      .get(queryUrl)
      .map(this.extractArticleData)
      .catch(this.handleError);
  }

  public createArticle(article: Article): Observable<string> {
    if(isDevMode()) {
      let queryUrl: string = `${this.apiUrl}/create`;
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http
        .post(queryUrl, article, options)
        .map((response:Response) => <any>response.headers.get('location'))
        .catch(this.handleError);
    }
  }

  public updateArticle(article: Article): Observable<void> {
    if(isDevMode()) {
      let queryUrl: string = `${this.apiUrl}/update`;
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http
        .put(queryUrl, article, options)
        .catch(this.handleError);
    }
  }

  public deleteArticle(article: Article): Observable<void> {
    if(isDevMode()) {
      let queryUrl: string = `${this.apiUrl}/delete?id=${article.id}`;
      return this.http
        .delete(queryUrl)
        .catch(this.handleError);
    }
  }

  private extractArticleData(response: Response): Article {
    let article: Article = new Article(response.json());
    return article;
  }

  private extractArticlesData(response: Response): Article[] {
    let articles: Article[] = new Array<Article>();  
    let body: any = response.json();
    for(let i in body) {
      articles.push(new Article(body[i]));
    }

    return articles;
  }

 //TODO: come back to this
  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}