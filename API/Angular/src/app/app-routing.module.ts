import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes =
  [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'game/start'
    },
    {
      path: 'game',
      loadChildren: './modules/start.module#StartModule'
    },
    {
      path: 'game',
      loadChildren: './modules/game.module#GameModule'
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
