import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HistoryComponent } from '../history/history.component';

const routes: Routes =
  [
    {
      path: 'history',
      component: HistoryComponent
    }
  ];

@NgModule({
  declarations: [HistoryComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class HistoryModule { }
