import { Cell } from '../Cell';
import { Entity, EntityType } from '../Entity';

export class Snake extends Entity {

    constructor(
        public currentCell: Cell,
        private turnsLeft: number
    ) {
        super(currentCell, EntityType.SNAKE)
    }

    progress() {
        this.turnsLeft = this.turnsLeft - 1

        if(this.turnsLeft == 0) {
            this.kill()
        }
    }
}