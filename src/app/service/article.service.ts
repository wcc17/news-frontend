import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from '../article/article.model';

@Injectable()
export class ArticleService {
  apiUrl: string = "http://localhost:8080/article";
  // apiUrl: string = "http://104.236.209.190:8080/article";

  constructor(public http: Http, private router: Router) { }

  public getPageOfArticles(pageNumber: number, pageSize: number): Observable<Article[]> {
    let queryUrl: string = `${this.apiUrl}?page=${pageNumber}&size=${pageSize}`;
    return this.http
      .get(queryUrl)
      .map(this.extractArticlesData);
  }

  public getArticleCount(): Observable<number> {
    let queryUrl: string = `${this.apiUrl}/count`;
    return this.http
      .get(queryUrl)
      .map((response:Response) => <number>response.json());
  }

  public getTopArticles(numberToLoad: number): Observable<Article[]> {
    let queryUrl: string = `${this.apiUrl}/top?number=${numberToLoad}`;
    return this.http
      .get(queryUrl)
      .map(this.extractArticlesData);
  }

  public getArticleById(articleId: number): Observable<Article> {
    let queryUrl: string = `${this.apiUrl}?id=${articleId}`;
    return this.http
      .get(queryUrl)
      .map(this.extractArticleData);
  }

  public getArticleByName(articleName: string): Observable<Article> {
    let queryUrl: string = `${this.apiUrl}?name=${articleName}`;
    return this.http
      .get(queryUrl)
      .map(this.extractArticleData);
  }

  //TODO: THIS NEEDS TO BE RESTRICTED IN PRODUCTION
  public createArticle(article: Article): Observable<number> {
    // let queryUrl: string = `${this.apiUrl}/create?name=${article.name}&title=${article.title}&sub=${article.subTitle}&date=${article.publishDate}&content=${article.content}`;
    let queryUrl: string = `${this.apiUrl}/create`;
    return this.executePostRequest(queryUrl, article);
  }

  //TODO: THIS NEEDS TO BE RESTRICTED IN PRODUCTION
  public updateArticle(article: Article): Observable<number> {
    let queryUrl: string = `${this.apiUrl}/update?id=${article.id}&name=${article.name}&title=${article.title}&sub=${article.subTitle}&date=${article.publishDate}&content=${article.content}`;
    return this.executePostRequest(queryUrl, article);
  }

  //TODO: THIS NEEDS TO BE RESTRICTED IN PRODUCTION
  public deleteArticle(article: Article): Observable<number> {
    let queryUrl: string = `${this.apiUrl}/delete?id=${article.id}`;
    return this.executePostRequest(queryUrl, article);
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

  private executePostRequest(queryUrl: string, article: Article): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(queryUrl, article, options)
      .map(this.extractArticleData);
  }

  //TODO: eventually want to use this and add .catch(...) to execute*Request
  // private onError(error: any) {
  //   console.log(error);
  //   this.router.navigate(["error"]);
  // }
}