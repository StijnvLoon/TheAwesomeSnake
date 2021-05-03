import { Component, Input, OnInit } from '@angular/core';
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
    switch (this.grid.gridAnim) {
      case GridAnim.ROTATE180: {
        return {
          'transition': 'all 3s linear',
          'transform': 'rotate(180deg)'
        }
      }
      case GridAnim.INVERT_COLORS: {
        return {
          'transition': 'all 3s linear',
          'filter': 'invert(1)'
        }
      }
      case GridAnim.SHRINK: {
        return {
          'transition': 'all 3s cubic-bezier(0.68, -0.6, 0.32, 1.6)',
          'transform': 'scale(0.6)'
        }
      }
      case GridAnim.GOLEFT: {
        return {
          'transition': 'all 3s cubic-bezier(0.68, -0.6, 0.32, 1.6)',
          'transform': 'translateX(-25vw)'
        }
      }
      case GridAnim.GORIGHT: {
        return {
          'transition': 'all 3s cubic-bezier(0.68, -0.6, 0.32, 1.6)',
          'transform': 'translateX(25vw)'
        }
      }
      default: {
        return {
          'transition': 'all 3s linear',
          'transform': 'rotate(0deg)'
        }
      }
    }
  }

}
