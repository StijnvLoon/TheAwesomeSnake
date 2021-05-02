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

            switch(this.entity.type) {
                case EntityType.APPLE: {
                    this.entity.kill()
                    this.listener.onAppleEaten()
                    break
                }
                case EntityType.BLOCKADE: {
                    this.listener.onGameLost()
                    break
                }
                case EntityType.SNAKE: {
                    this.listener.onGameLost()
                    break
                }
            }
        }
    }
}

export interface CellListener {
    onAppleEaten()
    onGameLost()
}