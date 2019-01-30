import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from '../components/start/start.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '../../../node_modules/@angular/forms';

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

    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class StartModule { }
