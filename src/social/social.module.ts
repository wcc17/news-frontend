import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialComponent } from './social.component';
import { SafeUrlPipe } from './pipe/safe-url.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SocialComponent,
    SafeUrlPipe
  ],
  exports: [
    SocialComponent
  ]
})
export class SocialModule { }
 