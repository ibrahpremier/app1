import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-toolbar',
  templateUrl: './popover-toolbar.page.html',
  styleUrls: ['./popover-toolbar.page.scss'],
})
export class PopoverToolbarPage implements OnInit {

  constructor(
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
  }

  select1(){
    this.popoverController.dismiss({},'supprimer');
  }

  select2(){
    this.popoverController.dismiss({},'clear');
  }
}
