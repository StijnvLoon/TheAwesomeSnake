import { LevelListener } from './../model/Level';
import { Component, HostListener, OnInit } from '@angular/core';
import { Grid, GridAnim } from 'src/model/Grid';
import { Level } from 'src/model/Level';
import { Direction, Game } from '../model/Game';
import { GridAnimEvent } from '../model/Event';
import { ProgressService } from './services/progress.service';
import { MatDialog } from '@angular/material/dialog';
import { LevelCreatorDialog } from './dialogs/level-creator/level-creator.dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements LevelListener {

  level: Level

  constructor(public progressService: ProgressService, private dialog: MatDialog) { }

  start(level: Level) {
    this.level = level
    this.level.game.countdown(() => {
      this.level.start()
    })
  }

  onLevelEnded(won: boolean, points: number) {
    if (won) {
      this.progressService.increaseProgress(this.level.indicator)
    }

    this.level = undefined
  }

  showLevelCreatorDialog() {
    const dialogRef = this.dialog.open(LevelCreatorDialog, {
      width: '60%',
      data: { levelListener: this }
    })

    dialogRef.afterClosed().subscribe(async level => {
      if(level) {
        this.start(level)
      }
    })
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
      case 32: {
        if (this.level.isPlaying) {
          this.level.pause()
        } else {
          this.level.start()
        }
        break
      }
    }
  }

  getLevel(number: number): Level {
    switch (number) {
      case 1: return new Level(
        1,
        20,
        1,
        700,
        15,
        new Map(),
        this
      )
      case 2: return new Level(
        2,
        100,
        10,
        300,
        0,
        new Map(),
        this
      )
      case 3: return new Level(
        3,
        20,
        1,
        700,
        25,
        new Map([
          [5, new GridAnimEvent(GridAnim.INVERT_COLORS, 1000)],
          [15, new GridAnimEvent(GridAnim.DEFAULT, 1000)],
        ]),
        this,
      )
      case 4: return new Level(
        4,
        60,
        3,
        600,
        10,
        new Map([
          [5, new GridAnimEvent(GridAnim.GOLEFT, 1500)],
          [10, new GridAnimEvent(GridAnim.GORIGHT, 2000)],
          [13, new GridAnimEvent(GridAnim.DEFAULT, 3000)],
          [18, new GridAnimEvent(GridAnim.SHRINK, 3000)],
          [25, new GridAnimEvent(GridAnim.ROTATE180, 3000)],
          [30, new GridAnimEvent(GridAnim.DEFAULT, 3000)],
          [38, new GridAnimEvent(GridAnim.FADE, 1500)],
          [42, new GridAnimEvent(GridAnim.DEFAULT, 3000)],
          [48, new GridAnimEvent(GridAnim.BLUR, 1500)],
          [55, new GridAnimEvent(GridAnim.DEFAULT, 1500)],
        ]),
        this
      )
    }
  }
}
