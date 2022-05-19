import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  public voiture: {
    marque: string,
    model: string,
    description: string,
    description2: string,
    annee: number,
    image: string
    prix_location: number
  };

  afficher: boolean;

//  voiture_sel: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) {

      this.activatedRoute.queryParams.subscribe(params => {
        if(this.router.getCurrentNavigation().extras.state){
          this.voiture = this.router.getCurrentNavigation().extras.state.selected;
        }
      });

  }

  ngOnInit() {
  }


  voir(){
    this.afficher = true;
  }

  masquer(){
    this.afficher = false;
  }


  navigation(data: any) {
    let navigationExtras: NavigationExtras = {
        state: {
          selected: data
        }
      }
    this.router.navigate(['/formulaire'], navigationExtras);
  }


}
