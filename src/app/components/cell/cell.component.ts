import { trigger, transition, style, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Cell } from 'src/model/Cell';
import { Snake, SnakeAnim } from 'src/model/entities/Snake';
import { EntityType } from 'src/model/Entity';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
  animations: [
    trigger(
      'snakeAnim', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate('250ms cubic-bezier(0.16, 1, 0.3, 1)', style({ transform: 'scale(1.0)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1 }),
        animate('250ms ease-out', style({ transform: 'scale(0.5)', opacity: 0 }))
      ])
    ]
    ),
    trigger(
      'appleAnim', [
      transition(':enter', [
        style({ transform: 'scale(0.5) rotate(360deg)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'scale(1.0) rotate(0deg)', opacity: 1 }))
      ])
    ]
    )
  ],
})
export class CellComponent implements OnInit {

  @Input() cell: Cell

  constructor() { }

  ngOnInit(): void {
  }

  getEntityStyle() {
    if (this.cell.entity) {
      switch (this.cell.entity.type) {
        case EntityType.SNAKE:
          return { 'background-color': '#00BE00' }
        case EntityType.APPLE:
          return { 'background-color': 'red' }
        case EntityType.BLOCKADE:
          return { 'background-color': 'black' }
        default:
          return {}
      }
    } else {
      return {}
    }
  }

  getAnimTrigger(): number {
    if (this.cell.entity) {
      if (this.cell.entity.type == EntityType.SNAKE) {
        const snake: Snake = this.cell.entity as Snake

        switch (snake.animTrigger) {
          case SnakeAnim.APPLE_EATEN: {
            return 0
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
    console.log(this.cell)
  }
}
