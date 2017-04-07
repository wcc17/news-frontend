import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap';
import { CollapseModule } from 'ng2-bootstrap';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SmallPostComponent } from './small-post/small-post.component';
import { ArticlePageComponent } from './article-page/article-page.component';
import { ArticleComponent } from './article/article.component';
import { ArticleService } from './service/article.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { PageComponent } from './page/page.component';
import { AllArticlesPageComponent } from './all-articles-page/all-articles-page.component';
import { ListItemPostComponent } from './list-item-post/list-item-post.component';
import { CreateArticlePageComponent } from './create-article-page/create-article-page.component';

//any way to declare this in PageComponent instead?
const childRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: MainPageComponent },
  { path: 'article/name/:articleName', component: ArticlePageComponent },
  { path: 'article/id/:articleId', component: ArticlePageComponent },
  { path: 'article/preview/:title/:subtitle/:date/:content', component: ArticlePageComponent }, //TODO: THIS SHOULD BE RESTRICTED IN PRODUCTION
  { path: 'allArticles', component: AllArticlesPageComponent },
  { path: 'create', component: CreateArticlePageComponent }, //TODO: THIS SHOULD BE RESTRICTED IN PRODUCTION
  { path: 'create/prog/:title/:subtitle/:date/:content', component: CreateArticlePageComponent },
]

const routes: Routes = [
  { path: '', component: PageComponent, children: childRoutes },
  { path: 'error', component: ErrorPageComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    MainPageComponent,
    SmallPostComponent,
    ArticlePageComponent,
    ArticleComponent,
    ErrorPageComponent,
    PageComponent,
    AllArticlesPageComponent,
    ListItemPostComponent,
    CreateArticlePageComponent, //TODO: THIS SHOULD BE RESTRICTED IN PRODUCTION
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot(),
    CollapseModule.forRoot(),
    
    RouterModule.forRoot(routes)
  ],
  providers: [ArticleService],
  bootstrap: [AppComponent]
})

export class AppModule { }
