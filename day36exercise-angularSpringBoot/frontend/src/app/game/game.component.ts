import { Component } from '@angular/core';
import { GameService } from './game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

    constructor(private gameService: GameService) {
      this.gameService.getGames()
          .subscribe((data) => {
            console.log(data);
          })
    }

}
