import { Cell } from "./Cell";

export class Entity {

    public currentCell: Cell
    
    constructor(
        public type: EntityType,
        public entityListener?: EntityListener
    ) { }

    kill() {
        if(this.entityListener) {
            this.entityListener.onKilled()
        }
    }
}

export interface EntityListener {
    onKilled()
}

export enum EntityType {
    SNAKE,
    APPLE,
    BLOCKADE
}