import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { Storage } from '@ionic/storage-angular';

import { AlertController, PopoverController } from '@ionic/angular';
import { PopoverToolbarPage } from '../popover-toolbar/popover-toolbar.page';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.page.html',
  styleUrls: ['./formulaire.page.scss'],
})
export class FormulairePage implements OnInit {
  
  public voiture: {
    marque: string,
    model: string,
    description: string,
    description2: string,
    annee: number,
    image: string
    prix_location: number
  };

  nom: string;
  telephone: string;
  nbr_jour: number;
  cout_total: number;
  list_reservations: any;
  
  nomError: boolean;
  isEdit: boolean;
  str: string;
  list_reservations_backup: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    public alertController: AlertController,
    private popoverController: PopoverController
    ) {
      this.activatedRoute.queryParams.subscribe(params => {
        if(this.router.getCurrentNavigation().extras.state){
          this.voiture = this.router.getCurrentNavigation().extras.state.selected;
        }
      });
  }

ionViewDidEnter() {
  this.getData();
}

  async ngOnInit() {
    await this.storage.create();
  }

  async getData(){
    this.list_reservations = await this.storage.get("list_reservations");
    this.list_reservations_backup = this.list_reservations;
    console.log(this.list_reservations);
  }


  async alert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: msg,
      buttons: ['Compris']
    });

    await alert.present();
  }



  calculateur(){
    this.cout_total = this.nbr_jour * this.voiture.prix_location;
  }

  async valider(){

    if(!this.nom){
      this.nomError = true;
      return;
    }

    let reservation_data = {
        nom: this.nom,
        telephone: this.telephone,
        nbr_jour: this.nbr_jour,
        cout_total: this.cout_total,
        vehicule: this.voiture
      }
      if(!this.list_reservations){
        this.list_reservations = [];
      }
      this.list_reservations.push(reservation_data);   

     await this.storage.set("list_reservations",this.list_reservations)
      .then((resp)=>{
          console.log(resp);

          this.nom = null;
          this.telephone = null;
          this.nbr_jour = null;
          this.cout_total = null;

          this.alert('Réservation enregistrée');
      });

  }

  annuler_edit(){
    this.nom = null;
    this.telephone = null;
    this.nbr_jour = null;
    this.cout_total = null;
    this.isEdit = false;
  }


  async alertConfirmation(element: any) {
    const alert = await this.alertController.create({
      header: 'Attention !!',
      message: "Voulez vous vraiment supprimer l'enregistrement "+element.nom,
      buttons: [
        {
          text: 'NON',
          cssClass: 'secondary',
          handler: () => {
            console.log('annulé');
          }
        }, {
          text: 'OUI',
          handler: () => {
            console.log('Confirmé');
            this.supprimer2(element);
          }
        }
      ]
    });

    await alert.present();
  }

  supprimer(element: any){
    let temp_list_reservations = [];
    for(let i=0; i < this.list_reservations.length; i++){
      if(this.list_reservations[i].nom != element.nom){
        temp_list_reservations.push(this.list_reservations[i]);
      }
    }
    this.list_reservations = temp_list_reservations;
    this.storage.set("list_reservations",this.list_reservations);
  }

  supprimer2(element: any){
    this.list_reservations = this.list_reservations.filter(item=>{
      return item.nom.indexOf(element.nom) == -1;
      // return item.nom != element.nom
    });
    this.storage.set("list_reservations",this.list_reservations);
  }

  rechercher(){
    this.list_reservations = this.list_reservations_backup;
    this.list_reservations = this.list_reservations.filter(item=>{
      return item.nom.indexOf(this.str) > -1;
    });
  }

  save_edit2(){
    this.list_reservations.forEach(item => {
      if(item.nom == this.nom){
        item.telephone = this.telephone;
        item.nbr_jour = this.nbr_jour;
        item.cout_total = this.cout_total;
      }
    });
    this.nom = null;
    this.telephone = null;
    this.nbr_jour = null;
    this.cout_total = null;

    this.isEdit = false;
    this.alert('Modifictaion enregistrée');
    this.storage.set("list_reservations",this.list_reservations);
  }


  save_edit(){
    for(let i=0; i < this.list_reservations.length; i++){
      if(this.list_reservations[i].nom == this.nom){
        this.list_reservations[i].telephone = this.telephone;
        this.list_reservations[i].nbr_jour = this.nbr_jour;
        this.list_reservations[i].cout_total = this.cout_total;
      }
    }

    this.nom = null;
    this.telephone = null;
    this.nbr_jour = null;
    this.cout_total = null;

    this.isEdit = false;
    this.alert('Modifictaion enregistrée');
    this.storage.set("list_reservations",this.list_reservations);
  }

  edit(data: any){
    this.isEdit = true;
    this.nom = data.nom;
    this.telephone = data.telephone;
    this.nbr_jour = data.nbr_jour;
    this.cout_total = data.cout_total;
    this.voiture = data.vehicule;
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverToolbarPage,
      event: ev,
      translucent: true,
      // backdropDismiss: false

    });

    popover.onDidDismiss().then((resp)=>{
      if(resp.role == 'supprimer'){
        this.removeData();
      } 
      if(resp.role == 'clear'){
        this.clearData();
      }

    });
    await popover.present();
  }


  async clearData(){
    console.log("CLEAR ");
    
    await this.storage.clear();
  }

  async removeData(){
    console.log("REMOVE ");
    await this.storage.remove("list_reservations");
  }


}
