import { trigger, transition, style, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Cell } from 'src/model/Cell';
import { Snake, SnakeAnim } from 'src/model/entities/Snake';
import { EntityType } from 'src/model/Entity';
import { Direction } from 'src/model/Game';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
  animations: [
    trigger('snakeAnim', [
      // transition(':enter', [
      //   style({ transform: 'scale(0.5)', opacity: 0 }),
      //   animate('250ms cubic-bezier(0.16, 1, 0.3, 1)', style({ transform: 'scale(1.0)', opacity: 1 }))
      // ]),
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1 }),
        animate('250ms ease-out', style({ transform: 'scale(0.5)', opacity: 0 }))
      ])
    ]),
    trigger('appleAnim', [
      transition(':enter', [
        style({ transform: 'scale(0.5) rotate(360deg)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'scale(1.0) rotate(0deg)', opacity: 1 }))
      ])
    ]),
    trigger('boardAnim', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate('250ms cubic-bezier(0.16, 1, 0.3, 1)', style({ transform: 'scale(1.0)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1 }),
        animate('250ms ease-out', style({ transform: 'scale(0.5)', opacity: 0 }))
      ])
    ]),
  ],
})
export class CellComponent implements OnInit {

  @Input() cell: Cell

  constructor() { }

  ngOnInit(): void {
  }

  getHeadStyle(): object {
    const snake = this.cell.entity as Snake

    var transform: string = 'unset'
    var margin: string = 'unset'

    switch (snake.directionCreated) {
      case Direction.UP: {
        transform = 'unset'
        margin = '2px 0px 0px 0px'
        break
      }
      case Direction.RIGHT: {
        transform = 'rotate(90deg)'
        margin = '0px 2px 0px 0px'
        break
      }
      case Direction.DOWN: {
        transform = 'rotate(180deg)'
        margin = '0px 0px 2px 0px'
        break
      }
      case Direction.LEFT: {
        transform = 'rotate(270deg)'
        margin = '0px 0px 0px 2px'
        break
      }
    }

    return {
      'transform': transform,
      'margin': margin
    }
  }

  isHead(): boolean {
    if (this.cell.entity && this.cell.entity.type == EntityType.SNAKE) {
      const snake: Snake = this.cell.entity as Snake
      return snake.isHead
    }
    return false
  }

  getAnimTrigger(): number {
    if (this.cell.entity) {
      if (this.cell.entity.type == EntityType.SNAKE) {
        const snake: Snake = this.cell.entity as Snake

        switch (snake.animTrigger) {
          case SnakeAnim.APPLE_EATEN: {
            if (!snake.isHead) {
              return 0
            }
            return -1
          }
          default: {
            return -1
          }
        }
      }
    }
    return -1
  }

  log() {
    // if(this.cell.entity) {
    //   if(this.cell.entity.type == EntityType.BOARD) {
    //     this.cell.entity = undefined
    //   }
    // } else {
    //   this.cell.interact(new Board())
    // }

    console.log(this.cell)
  }
}
