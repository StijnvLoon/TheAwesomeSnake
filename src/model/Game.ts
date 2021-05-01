import { Grid } from "./Grid";
import { Snake } from './entities/Snake';

export class Game {

    public direction: Direction = Direction.RIGHT
    public snakes: Snake[]
    public snakeHead: Snake
    public points: number = 1

    constructor(
        public grid: Grid
    ) {
        this.snakes = []
        this.createSnake(5, 4)
    }

    createSnake(y: number, x: number) {
        const snake: Snake = new Snake(
            this.grid.getCellAt(y, x,), 
            this.points
        )
        snake.listener = {
            onKilled: () => {
                const index: number = this.snakes.indexOf(snake)

                delete snake.currentCell.entity
                delete this.snakes[index]
                this.snakes.splice(index, 1)
            }
        }

        this.snakes.push(snake)
        this.snakeHead = snake
    }

    turn() {
        switch(this.direction) {
            case Direction.UP: {
                this.createSnake(this.snakeHead.currentCell.y - 1, this.snakeHead.currentCell.x)
                break
            }
            case Direction.RIGHT: {
                this.createSnake(this.snakeHead.currentCell.y, this.snakeHead.currentCell.x + 1)
                break
            }
            case Direction.DOWN: {
                this.createSnake(this.snakeHead.currentCell.y + 1, this.snakeHead.currentCell.x)
                break
            }
            case Direction.LEFT: {
                this.createSnake(this.snakeHead.currentCell.y, this.snakeHead.currentCell.x - 1)
                break
            }
        }

        this.snakes.forEach((snake) => {
            snake.progress()
        })
    }
}

export enum Direction {
    UP,
    RIGHT,
    DOWN,
    LEFT
}