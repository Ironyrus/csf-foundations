import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GameService } from './game.service';
import { gameModel } from './gameModel';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent  implements OnChanges {
  

  @Input()
  data = 4;

  changeTester = 0;

  model: gameModel[] = [new gameModel("","")];
  tempArr: gameModel[] = [new gameModel("","")];
  pointer: number = 0;
  limit: number = 3;

  constructor(private fb: FormBuilder,
              private gameService: GameService) {
        this.gameService.getGames()
        .then((data: gameModel[]) => {

            // ALSO WORKS
            // this.model = data;
            
            for (let index = 0; index < data.length; index++) {
                const element = data[index]; 
                var tempModel: gameModel = new gameModel(element.name, element.game_id);
                this.model.push(tempModel);
            }

            for (let index = 0; index < this.limit; index++) {
                const element = data[index];
                var tempModel: gameModel = new gameModel(element.name, element.game_id);
                this.tempArr.push(tempModel);
            }
            this.model.shift(); //DELETES THE FIRST INDEX DATA THAT WE INITIALIZED
            this.tempArr.shift();

          })
          .catch((error) => {
            console.log(error)
          })
    
        // OBSERVABLE ALSO WORKS AS WELL AS PROMISE
        // this.gameService.getGamesObs()
        //   .subscribe((data) => {
        //      this.model = data;
        //   })
        
        
  }
  gamesForm!: FormGroup;
  
  ngOnInit(){
    this.gamesForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
        
    })
  }

  clearForm() {
    this.gamesForm = this.createForm();
  }

  onPrev() {
    if(this.pointer >= 5){
      this.pointer -= this.limit;
      for (let index = this.pointer; index < this.pointer + this.limit; index++) {
        const element = this.model[index];
        var tempModel: gameModel = new gameModel(element.name, element.game_id);
        var tempArr: gameModel[] = [new gameModel("","")];
        this.tempArr.push(tempModel);
        this.tempArr.shift();
      }
    }
  }

  onNext(){
    this.pointer += this.limit;
    for (let index = this.pointer; index < this.pointer + this.limit; index++) {
      const element = this.model[index];
      var tempModel: gameModel = new gameModel(element.name, element.game_id);
      var tempArr: gameModel[] = [new gameModel("","")];
      this.tempArr.push(tempModel);
      this.tempArr.shift();
    }
  }

  processForm() {
    
  }

  // If there are changes in @Input() variables due to parents, then will trigger
  ngOnChanges(changes: SimpleChanges) {
    this.changeTester++;
  }
}
