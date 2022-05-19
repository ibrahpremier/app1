import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PrincipalService } from '../principal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
username: string;
password: string;

usernameError: boolean;
passwordError: boolean;

chargement_en_cours: boolean;
afficher_mdp: boolean = false;

  constructor(
    private http: HttpClient,
    // private router: Router,
    private alertController: AlertController,
    public principalService: PrincipalService
  ) { 
  }

  ngOnInit() {
  }

  login(){
    this.usernameError = this.passwordError = false;
    if(!this.username){
      this.usernameError = true;
      return;
    }
    if(!this.password){
      this.passwordError = true;
      return;
    }
    let userData = {
      "username": this.username,
      "password": this.password,
    }
    console.log(userData);
    
    this.apiPost(userData);
  }


  apiPost(data: any){
    this.chargement_en_cours = true;
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    let url: string = "http://seen-test.gcauris.com/voiture/login";
    this.http.post(url,data,headers).subscribe(
      (response: any) => {
        this.chargement_en_cours = false;
        if(response.status == 201){
          this.principalService.userData = response.data;
          this.principalService.navigation('/home');
        } else {
          this.alert(response.message);
        }
      // response.status == 201 ? this.navigation() : this.alert(response.message);
      },
      (error: any) => {
        this.chargement_en_cours = false;
      });
  }

  /**
   * Permet d'afficher une alerte
   * @param msg 
   */
  async alert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: msg,
      buttons: ['Compris']
    });

    await alert.present();
  }

  // navigation() {

  // }
  
}
