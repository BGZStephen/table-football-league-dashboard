import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router'

@Injectable()
export class AuthGuard {
  constructor (
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (tokenNotExpired()) {
      return true;
    } else {
      this.router.navigate([`${environment.websiteUrl}/login`])
    }
  }
}
