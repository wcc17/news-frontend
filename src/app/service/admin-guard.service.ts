import { Injectable, isDevMode } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AdminGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if(isDevMode()) {
      return true;
    } else {
      this.router.navigate(['/error']); //TODO: REDIRECT TO PAGE NOT FOUND INSTEAD
    }
  }

}