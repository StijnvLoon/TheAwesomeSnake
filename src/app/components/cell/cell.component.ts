import { Component, Input, OnInit } from '@angular/core';
import { Cell } from 'src/model/Cell';
import { Snake, SnakeAnim } from 'src/model/entities/Snake';
import { EntityType } from 'src/model/Entity';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
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
        default:
          return {}
      }
    } else {
      return {}
    }
  }

  getAnimTrigger(): number {
    if(this.cell.entity) {
      if(this.cell.entity.type == EntityType.SNAKE) {
        const snake: Snake = this.cell.entity as Snake
  
        switch(snake.animTrigger) {
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
