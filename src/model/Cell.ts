import { Snake } from "./entities/Snake";
import { Entity, EntityType } from "./Entity";

export class Cell {

    public entity: Entity

    constructor(
        public readonly y: number,
        public readonly x: number,
        public listener: CellListener
    ) { }

    interact() {
        if(this.entity) {
            if(this.entity.type == EntityType.APPLE) {
                this.entity.kill()
                this.listener.onAppleEaten()
            }
        }
    }
}

export interface CellListener {
    onAppleEaten()
}