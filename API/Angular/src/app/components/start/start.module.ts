import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from '../start/start.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '../../../../node_modules/@angular/forms';
import { StorageServiceModule } from 'angular-webstorage-service';

const routes: Routes =
  [
    {
      path: 'start',
      component: StartComponent
    }
  ];

@NgModule({
  declarations: [
    StartComponent
  ],
  imports: [
    CommonModule,
    StorageServiceModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class StartModule { }
