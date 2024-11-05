import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyPlantsPage } from './my-plants.page';

const routes: Routes = [
  {
    path: '',
    component: MyPlantsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyPlantsPageRoutingModule {}
