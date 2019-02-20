import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from '../components/game/game.component';
import { Routes, RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StorageServiceModule } from 'angular-webstorage-service';

const routes: Routes =
  [
    {
      path: ':id',
      component: GameComponent
    }
  ];

@NgModule({
  declarations: [GameComponent],
  imports: [
    CommonModule,
    FormsModule,
    StorageServiceModule,
    RouterModule.forChild(routes)
  ]
})
export class GameModule { }
