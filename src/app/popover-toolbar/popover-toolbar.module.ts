import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopoverToolbarPageRoutingModule } from './popover-toolbar-routing.module';

import { PopoverToolbarPage } from './popover-toolbar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopoverToolbarPageRoutingModule
  ],
  declarations: [PopoverToolbarPage]
})
export class PopoverToolbarPageModule {}
