import { Component, OnInit, isDevMode } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from '../main-page/main-page.component';
import { CollapseModule } from 'ng2-bootstrap';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  public isCollapsed: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  openArticle(): void {
    console.log("open article called");
  }

  _isDevMode(): boolean {
    return isDevMode();
  }

}
