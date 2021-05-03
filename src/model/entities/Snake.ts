import { Entity, EntityType } from '../Entity';

export class Snake extends Entity {

    public snakeBody: Snake
    public animTrigger: SnakeAnim
    public isHead: boolean

    constructor(
        public turnsLeft: number
    ) {
        super(EntityType.SNAKE)
        this.isHead = true
    }

    progress() {
        this.turnsLeft = this.turnsLeft - 1
        if(this.turnsLeft == 0) {
            this.kill()
        }
    }

    triggerAnim(anim: SnakeAnim, delay: number) {
        this.animTrigger = undefined
        setTimeout(() => {
            this.animTrigger = anim

            if(this.snakeBody) {
                setTimeout(() => {
                    this.snakeBody.triggerAnim(anim, delay)
                }, delay);
            }    
        }, 5);
    }
}

export enum SnakeAnim {
    APPLE_EATEN
}