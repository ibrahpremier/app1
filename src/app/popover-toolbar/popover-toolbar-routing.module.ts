import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopoverToolbarPage } from './popover-toolbar.page';

const routes: Routes = [
  {
    path: '',
    component: PopoverToolbarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopoverToolbarPageRoutingModule {}
