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
    switch(event.keyCode) {
      case 37: {
        this.game.direction = Direction.LEFT
        break
      }
      case 38: {
        this.game.direction = Direction.UP
        break
      }
      case 39: {
        this.game.direction = Direction.RIGHT
        break
      }
      case 40: {
        this.game.direction = Direction.DOWN
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
