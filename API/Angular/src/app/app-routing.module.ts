import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartModule } from './components/start/start.module';
import { GameModule } from './components/game/game.module';
import { HistoryModule } from './components/history/history.module';

const routes: Routes =
  [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'start'
    },
    {
      path: '',
      loadChildren: () => StartModule
    },
    {
      path: '',
      loadChildren: () => HistoryModule
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
