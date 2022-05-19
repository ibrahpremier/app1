import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { PrincipalService } from '../principal.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  voitures_list: {
    marque: string;
    model: string;
    image: string;
    annee: number;
    description: string;
    description2: string;
    prix_location: number;
  }[];

  constructor(
    private router: Router,
    private http: HttpClient,
    private loadingController: LoadingController,
    public principalService: PrincipalService
  ) {

    this.chargementApi();
    // this.voitures_list = [
    //   {
    //     marque: "HYUNDAY",
    //     model: "tucson",
    //     description: "Lorem ipsum dolor sit amet",
    //     description2: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis, ex quod deserunt laborum ipsum harum suscipit magni nihil qui non ducimus! Laudantium explicabo libero rem inventore sunt blanditiis modi voluptate.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis, ex quod deserunt laborum ipsum harum suscipit magni nihil qui non ducimus! Laudantium explicabo libero rem inventore sunt blanditiis modi voluptate.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis, ex quod deserunt laborum ipsum harum suscipit magni nihil qui non ducimus! Laudantium explicabo libero rem inventore sunt blanditiis modi voluptate.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis, ex quod deserunt laborum ipsum harum suscipit magni nihil qui non ducimus! Laudantium explicabo libero rem inventore sunt blanditiis modi voluptate.",
    //     image: "assets/imgs/img1.jpeg",
    //     annee: 2018,
    //     prix_location: 30000
    //   },
    //   {
    //     marque: "Mercedes",
    //     model: "C300",
    //     description: "Lorem ipsum dolor sit amet",
    //     description2: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis, ex quod deserunt laborum ipsum harum suscipit magni nihil qui non ducimus! Laudantium explicabo libero rem inventore sunt blanditiis modi voluptate.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis, ex quod deserunt laborum ipsum harum suscipit magni nihil qui non ducimus! Laudantium explicabo libero rem inventore sunt blanditiis modi voluptate.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis, ex quod deserunt laborum ipsum harum suscipit magni nihil qui non ducimus! Laudantium explicabo libero rem inventore sunt blanditiis modi voluptate.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis, ex quod deserunt laborum ipsum harum suscipit magni nihil qui non ducimus! Laudantium explicabo libero rem inventore sunt blanditiis modi voluptate.",
    //     image: "assets/imgs/img2.jpeg",
    //     annee: 2019,
    //     prix_location: 40000
    //   },
    //   {
    //     marque: "HYUNDAY",
    //     model: "Santafee",
    //     description: "Lorem ipsum dolor sit amet",
    //     description2: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis, ex quod deserunt laborum ipsum harum suscipit magni nihil qui non ducimus! Laudantium explicabo libero rem inventore sunt blanditiis modi voluptate.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis, ex quod deserunt laborum ipsum harum suscipit magni nihil qui non ducimus! Laudantium explicabo libero rem inventore sunt blanditiis modi voluptate.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis, ex quod deserunt laborum ipsum harum suscipit magni nihil qui non ducimus! Laudantium explicabo libero rem inventore sunt blanditiis modi voluptate.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis, ex quod deserunt laborum ipsum harum suscipit magni nihil qui non ducimus! Laudantium explicabo libero rem inventore sunt blanditiis modi voluptate.",
    //     image: "assets/imgs/img3.jpeg",
    //     annee: 2020,
    //     prix_location: 50000
    //   },
    //   {
    //     marque: "TOYOTA",
    //     model: "Corolla",
    //     description: "Lorem ipsum dolor sit amet",
    //     description2: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis, ex quod deserunt laborum ipsum harum suscipit magni nihil qui non ducimus! Laudantium explicabo libero rem inventore sunt blanditiis modi voluptate.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis, ex quod deserunt laborum ipsum harum suscipit magni nihil qui non ducimus! Laudantium explicabo libero rem inventore sunt blanditiis modi voluptate.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis, ex quod deserunt laborum ipsum harum suscipit magni nihil qui non ducimus! Laudantium explicabo libero rem inventore sunt blanditiis modi voluptate.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis, ex quod deserunt laborum ipsum harum suscipit magni nihil qui non ducimus! Laudantium explicabo libero rem inventore sunt blanditiis modi voluptate.",
    //     image: "assets/imgs/img4.jpeg",
    //     annee: 2021,
    //     prix_location: 45000
    //   }
    // ];
  }

  ionViewWillEnter() {
  }

  navigation(data: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        selected: data
      }
    }
    this.router.navigate(['/details'], navigationExtras);
  }


  chargementApi() {
    this.presentLoading();
    let options: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    let url: string = "http://seen-test.gcauris.com/voiture/list";

    this.http.get(url, options).subscribe(
      (response: any) => {
        this.dismissLoading();
        console.log("API DATA", response);
        this.voitures_list=response;
      },
      (error: any) => {
        this.dismissLoading();
        console.error("API EEROR",error)
      });
  }


  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Chargement...',
    });
    await loading.present();
  }

  async dismissLoading(){
    await this.loadingController.dismiss();
  }

}
