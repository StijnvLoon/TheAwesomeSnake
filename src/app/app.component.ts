import { LevelListener } from './../model/Level';
import { Component, HostListener, OnInit } from '@angular/core';
import { Grid, GridAnim } from 'src/model/Grid';
import { Level } from 'src/model/Level';
import { Direction, Game } from '../model/Game';
import { GridAnimEvent } from '../model/Event';
import { ProgressService } from './services/progress.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements LevelListener {

  classic: Level = new Level(
    100,
    1,
    700,
    15,
    new Map(),
    this
  )
  fast: Level = new Level(
    100,
    10,
    700,
    20,
    new Map(),
    this
  )
  chaos: Level = new Level(
    100,
    3,
    700,
    15,
    new Map([
      [20, new GridAnimEvent(GridAnim.ROTATE180, 3000)],
      [35, new GridAnimEvent(GridAnim.DEFAULT, 3000)],
      [50, new GridAnimEvent(GridAnim.INVERT_COLORS, 1000)],
      [65, new GridAnimEvent(GridAnim.GOLEFT, 3000)],
      [75, new GridAnimEvent(GridAnim.DEFAULT, 1500)],
    ]),
    this
  )

  level: Level

  constructor(public progressService: ProgressService) { }

  start(level: Level) {
    this.level = level
    this.level.game.countdown(() => {
      this.level.start()
    })
  }

  onLevelEnded(won: boolean, points: number) {
    this.level = undefined

    if(won) {
      this.progressService.increaseProgress()
    }
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
