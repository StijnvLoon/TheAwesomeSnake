import { Component, Input, OnInit } from '@angular/core';
import { Cell } from 'src/model/Cell';
import { Snake } from 'src/model/entities/Snake';
import { EntityType } from 'src/model/Entity';
import { GridAnimEvent } from 'src/model/Event';
import { Grid, GridAnim } from 'src/model/Grid';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  @Input() grid: Grid

  constructor() { }

  ngOnInit(): void {
  }

  getAnimTrigger(): object {

    const animEvent: GridAnimEvent = this.grid.gridAnimEvent

    if(animEvent) {
      switch (animEvent.gridAnim) {
        case GridAnim.ROTATE180: {
          return {
            'transition': 'all ' + animEvent.duration + 'ms cubic-bezier(0.68, -0.6, 0.32, 1.6)',
            'transform': 'rotate(180deg)'
          }
        }
        case GridAnim.INVERT_COLORS: {
          return {
            'transition': 'all ' + animEvent.duration + 'ms cubic-bezier(0.68, -0.6, 0.32, 1.6)',
            'filter': 'invert(1)'
          }
        }
        case GridAnim.SHRINK: {
          return {
            'transition': 'all ' + animEvent.duration + 'ms cubic-bezier(0.68, -0.6, 0.32, 1.6)',
            'transform': 'scale(0.5)'
          }
        }
        case GridAnim.GOLEFT: {
          return {
            'transition': 'all ' + animEvent.duration + 'ms cubic-bezier(0.68, -0.6, 0.32, 1.6)',
            'transform': 'translateX(-25vw)'
          }
        }
        case GridAnim.GORIGHT: {
          return {
            'transition': 'all ' + animEvent.duration + 'ms cubic-bezier(0.68, -0.6, 0.32, 1.6)',
            'transform': 'translateX(25vw)'
          }
        }
        case GridAnim.BLUR: {
          return {
            'transition': 'all ' + animEvent.duration + 'ms ease',
            'filter': 'blur(20px)'
          }
        }
        case GridAnim.FADE: {
          return {
            'transition': 'all ' + animEvent.duration + 'ms cubic-bezier(0.68, -0.6, 0.32, 1.6)',
            'filter': 'opacity(0.1)'
          }
        }
        case GridAnim.DEFAULT: {
          return {
            'transition': 'all ' + animEvent.duration + 'ms cubic-bezier(0.68, -0.6, 0.32, 1.6)',
            'transform': 'rotate(0deg) translateX(0) scale(1)',
            'filter': 'invert(0)'
          }
        }
      }
    } else {
      return {}
    }
  }

  hashead(cell: Cell): boolean {
    if(cell.entity) {
      if(cell.entity.type == EntityType.SNAKE) {
        const snake: Snake = cell.entity as Snake

        if(snake.isHead) {
          return true
        }
      }
    }
    return false
  }
}
