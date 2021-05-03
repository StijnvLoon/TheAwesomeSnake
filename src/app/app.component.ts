import { Component, HostListener, OnInit } from '@angular/core';
import { Grid } from 'src/model/Grid';
import { Direction, Game } from '../model/Game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  game: Game

  constructor() {

  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    //cant go in opposite direction
    switch(event.keyCode) {
      case 37: {
        if(this.game.direction !== Direction.RIGHT) {
          this.game.direction = Direction.LEFT
        }

        break
      }
      case 38: {
        if(this.game.direction !== Direction.DOWN) {
          this.game.direction = Direction.UP
        }

        break
      }
      case 39: {
        if(this.game.direction !== Direction.LEFT) {
          this.game.direction = Direction.RIGHT
        }
        break
      }
      case 40: {
        if(this.game.direction !== Direction.UP) {
          this.game.direction = Direction.DOWN
        }
        break
      }
    }
  }

  ngOnInit() {
    this.createNewGame()
    this.game.togglePlaying()
  }

  createNewGame() {
    this.game = new Game()
  }
}
