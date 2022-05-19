import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {

  userData: any;

  constructor(
    private router: Router
  ) { }

/**
 * fonction qui permet de faire la navigation
 * @param url 
 * @param data 
 */
  navigation(url: string,data?: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        selected: data
      }
    }
    this.router.navigate([url], navigationExtras);
  }
}
