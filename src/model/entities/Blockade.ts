import { Cell } from '../Cell';
import { Entity, EntityType } from '../Entity';

export class Blockade extends Entity {

    constructor(
        public currentCell: Cell,
    ) {
        super(currentCell, EntityType.BLOCKADE)
    }

}