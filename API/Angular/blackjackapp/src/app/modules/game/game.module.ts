import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from '../../components/game-component/game-component.component';
import { GameService } from '../../services/GameService/game-service.service'
import { FormsModule } from '../../../../node_modules/@angular/forms';

@NgModule({
  declarations: [GameComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [GameService]
})
export class GameModule { }
