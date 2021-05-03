import { Apple } from "./entities/Apple";
import { Blockade } from "./entities/Blockade";
import { Snake } from "./entities/Snake";
import { Entity, EntityType } from "./Entity";

export class Cell {

    public entity: Entity

    constructor(
        public readonly y: number,
        public readonly x: number,
    ) { }

    interact(upCommingEntity: Entity) {
        switch (upCommingEntity.type) {
            case EntityType.SNAKE: {
                this.handleSnake(upCommingEntity as Snake)
                break
            }
            case EntityType.APPLE: {
                this.handleApple(upCommingEntity as Apple)
                break
            }
            case EntityType.BLOCKADE: {
                this.handleBlockade(upCommingEntity as Blockade)
                break
            }
        }
    }

    private handleSnake(snake: Snake) {
        if (this.entity) {
            switch (this.entity.type) {
                case EntityType.APPLE: {
                    this.entity.kill()
                    this.acceptEntity(snake)
                    break
                }
                case EntityType.BLOCKADE: {
                    snake.kill()
                    break
                }
                case EntityType.SNAKE: {
                    snake.kill()
                    break
                }
            }
        } else {
            this.acceptEntity(snake)
        }
    }

    private handleApple(apple: Apple) {
        if (!this.entity) {
            this.acceptEntity(apple)
        }
    }

    private handleBlockade(blockade: Blockade) {
        if (this.entity) {
            switch (this.entity.type) {
                case EntityType.APPLE: {
                    this.entity.kill()
                    this.acceptEntity(blockade)
                    break
                }
                case EntityType.BLOCKADE: {
                    break
                }
                case EntityType.SNAKE: {
                    break
                }
            }
        } else {
            this.acceptEntity(blockade)
        }
    }

    private acceptEntity(entity: Entity) {
        this.entity = entity
        entity.currentCell = this
    }
}