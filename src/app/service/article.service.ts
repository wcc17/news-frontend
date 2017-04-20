import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
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
    let queryUrl: string = `${this.apiUrl}/create?name=${article.name}&title=${article.title}&sub=${article.subTitle}&date=${article.publishDate}&content=${article.content}`;
    return this.executePostRequest(queryUrl);
  }

  //TODO: THIS NEEDS TO BE RESTRICTED IN PRODUCTION
  public updateArticle(article: Article): Observable<number> {
    let queryUrl: string = `${this.apiUrl}/update?id=${article.id}&name=${article.name}&title=${article.title}&sub=${article.subTitle}&date=${article.publishDate}&content=${article.content}`;
    return this.executePostRequest(queryUrl);
  }

  //TODO: THIS NEEDS TO BE RESTRICTED IN PRODUCTION
  public deleteArticle(article: Article): Observable<number> {
    let queryUrl: string = `${this.apiUrl}/delete?id=${article.id}`;
    return this.executePostRequest(queryUrl);
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

  private executePostRequest(queryUrl: string): Observable<any> {
    // return this.http
      // .put(queryUrl)
      // .map((response:Response) => <any>response.json());

      // return this.http.put
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // return this.http.post(queryUrl, null, headers);

    return this.http
      .get(queryUrl)
      .map(this.extractArticleData);
  }


  //TODO: eventually want to use this and add .catch(...) to execute*Request
  // private onError(error: any) {
  //   console.log(error);
  //   this.router.navigate(["error"]);
  // }

  //TODO: the next methods might need to be in a different "ArticleService". The above methods make http requests, these just do semi-complex manipulation of article stuff. ArticleRequestService and ArticleService
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