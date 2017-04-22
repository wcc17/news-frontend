import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisqusComponent } from './disqus.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DisqusComponent
  ],
  exports: [
    DisqusComponent
  ]
})
export class DisqusModule { }
