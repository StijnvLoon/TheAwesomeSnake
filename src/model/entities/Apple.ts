import { Cell } from '../Cell';
import { Entity, EntityType } from '../Entity';

export class Apple extends Entity {

    constructor(
        public currentCell: Cell,
    ) {
        super(currentCell, EntityType.APPLE)
    }

}