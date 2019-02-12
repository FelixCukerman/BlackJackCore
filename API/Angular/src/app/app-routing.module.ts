import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartModule } from './modules/start.module';
import { GameModule } from './modules/game.module';

const routes: Routes =
  [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'game/start'
    },
    {
      path: 'game',
      loadChildren: () => StartModule
    },
    {
      path: 'game',
      loadChildren: () => GameModule
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
