import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from '../components/game/game.component';
import { Routes, RouterModule, Router } from '@angular/router';

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
    RouterModule.forChild(routes)
  ]
})
export class GameModule { }
