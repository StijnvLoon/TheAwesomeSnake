import { Component, HostListener, OnInit } from '@angular/core';
import { Grid, GridAnim } from 'src/model/Grid';
import { Level } from 'src/model/Level';
import { Direction, Game } from '../model/Game';
import { GridAnimEvent } from '../model/Event'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  level: Level

  start() {
    this.level = new Level(
      40,
      8,
      700,
      15,
      new Map([
        // [5, new GridAnimEvent(GridAnim.ROTATE180, 3000)],
        // [10, new GridAnimEvent(GridAnim.DEFAULT, 3000)],
        // [15, new GridAnimEvent(GridAnim.INVERT_COLORS, 1000)],
        // [20, new GridAnimEvent(GridAnim.GOLEFT, 3000)],
        // [25, new GridAnimEvent(GridAnim.DEFAULT, 1500)],
      ])
    )
    this.level.start()
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    //cant go in opposite direction
    switch (event.keyCode) {
      case 37: {
        if (this.level.game.direction !== Direction.RIGHT) {
          this.level.game.direction = Direction.LEFT
        }

        break
      }
      case 38: {
        if (this.level.game.direction !== Direction.DOWN) {
          this.level.game.direction = Direction.UP
        }

        break
      }
      case 39: {
        if (this.level.game.direction !== Direction.LEFT) {
          this.level.game.direction = Direction.RIGHT
        }
        break
      }
      case 40: {
        if (this.level.game.direction !== Direction.UP) {
          this.level.game.direction = Direction.DOWN
        }
        break
      }
    }
  }
}
