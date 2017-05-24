import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap';
import { CollapseModule } from 'ng2-bootstrap';
import { PaginationModule } from 'ng2-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { DisqusModule } from '../disqus/disqus.module';
import { SocialModule } from '../social/social.module';

import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SmallPostComponent } from './small-post/small-post.component';
import { ArticlePageComponent } from './article-page/article-page.component';
import { ArticleComponent } from './article/article.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { PageComponent } from './page/page.component';
import { AllArticlesPageComponent } from './all-articles-page/all-articles-page.component';
import { ListItemPostComponent } from './list-item-post/list-item-post.component';
import { CreateArticlePageComponent } from './create-article-page/create-article-page.component';
// import { ContactPageComponent } from './contact-page/contact-page.component';

import { ArticleService } from './service/article.service';
import { AdminGuardService } from './service/admin-guard.service';

const userRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: MainPageComponent },
  { path: 'article/name/:articleName', component: ArticlePageComponent },
  { path: 'article/id/:articleId', component: ArticlePageComponent },
  { path: 'allArticles', component: AllArticlesPageComponent },
  // { path: 'contact', component: ContactPageComponent }
]

const adminRoutes: Routes = [
  { path: 'create', component: CreateArticlePageComponent },
  { path: 'create/edit/:id/:title/:name/:subtitle/:date/:content', component: CreateArticlePageComponent },
  { path: 'create/prog/:title/:name/:subtitle/:date/:content', component: CreateArticlePageComponent },
  { path: 'article/preview/:title/:name/:subtitle/:date/:content', component: ArticlePageComponent },
]

const routes: Routes = [
  { path: '', component: PageComponent, children: userRoutes },
  { path: '', canActivate: [AdminGuardService], component: PageComponent, children: adminRoutes },
  { path: 'error', component: ErrorPageComponent },
  { path: '**', redirectTo: '/error' }
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
    CreateArticlePageComponent,  //TODO: THIS SHOULD BE RESTRICTED IN PRODUCTION
    // ContactPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot(),
    CollapseModule.forRoot(),
    PaginationModule.forRoot(),
    
    RouterModule.forRoot(routes),
    DisqusModule,
    SocialModule
  ],
  providers: [ArticleService, AdminGuardService],
  bootstrap: [AppComponent]
})

export class AppModule { }
