import { Component, Input, OnInit } from '@angular/core';
import { Cell } from 'src/model/Cell';
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
          return { 'background-color': 'green' }
        case EntityType.APPLE:
          return { 'background-color': 'red' }
        default:
          return {}
      }
    } else {
      return {}
    }
  }

  log() {
    console.log(this.cell)
  }
}
