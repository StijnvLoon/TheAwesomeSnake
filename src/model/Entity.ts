import { Cell } from "./Cell";

export class Entity {
    
    constructor(
        public currentCell: Cell,
        public type: EntityType,
        public listener?: EntityListener
    ) {
        currentCell.entity = this
    }

    kill() {
        if(this.listener) {
            this.listener.onKilled()
        }
    }
}

export interface EntityListener {
    onKilled()
}

export enum EntityType {
    SNAKE,
    APPLE
}