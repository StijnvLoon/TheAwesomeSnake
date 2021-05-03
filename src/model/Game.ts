import { Grid, GridAnim } from "./Grid";
import { Snake, SnakeAnim } from './entities/Snake';
import { Apple } from './entities/Apple';
import { Cell, CellListener } from "./Cell";

export class Game implements CellListener {

    public isPlaying: boolean = false
    public delay = 700
    public turns: number = 0

    public grid: Grid
    public direction: Direction = Direction.RIGHT
    public snakes: Snake[]
    public snakeHead: Snake
    public points: number = 1

    constructor() {
        this.grid = new Grid(20, 20, this)
        this.snakes = []
        this.createSnake(this.grid.getCellAt(5, 4))
        this.createApple()
        this.createApple()
        this.createApple()
        this.createApple()
        this.createApple()
        this.createApple()
        this.createApple()
    }

    createSnake(cell: Cell) {
        const snake: Snake = new Snake(
            cell,
            this.points
        )
        snake.listener = {
            onKilled: () => {
                const index: number = this.snakes.indexOf(snake)

                delete snake.snakeBody
                delete snake.currentCell.entity
                delete this.snakes[index]
                this.snakes.splice(index, 1)
            }
        }

        this.snakes.push(snake)

        if (this.snakeHead) {
            snake.snakeBody = this.grid.getCellAt(
                this.snakeHead.currentCell.y,
                this.snakeHead.currentCell.x
            ).entity as Snake
        }
        this.snakeHead = snake
    }

    createApple() {
        const apple: Apple = new Apple(this.grid.getRandomEmptyCell())
        apple.listener = {
            onKilled: () => {
                delete apple.currentCell.entity
            }
        }
    }

    togglePlaying() {
        this.isPlaying = !this.isPlaying
        if (this.isPlaying) {
            this.loop()
        }
    }

    loop() {
        setTimeout(() => {
            this.turn()
            this.turns = this.turns + 1

            if (this.isPlaying) {
                this.loop()
            }
        }, this.delay - (this.points * 15))
    }

    turn() {
        let nextCell: Cell

        switch (this.direction) {
            case Direction.UP: {
                nextCell = this.grid.getCellAt(this.snakeHead.currentCell.y - 1, this.snakeHead.currentCell.x)
                break
            }
            case Direction.RIGHT: {
                nextCell = this.grid.getCellAt(this.snakeHead.currentCell.y, this.snakeHead.currentCell.x + 1)
                break
            }
            case Direction.DOWN: {
                nextCell = this.grid.getCellAt(this.snakeHead.currentCell.y + 1, this.snakeHead.currentCell.x)
                break
            }
            case Direction.LEFT: {
                nextCell = this.grid.getCellAt(this.snakeHead.currentCell.y, this.snakeHead.currentCell.x - 1)
                break
            }
        }
        nextCell.interact()

        if(this.isPlaying) {
            this.createSnake(nextCell)

            this.snakes.forEach((snake) => {
                snake.progress()
            })
        }
    }

    onAppleEaten() {
        this.points = this.points + 1
        this.createApple()

        this.snakes.forEach((snake) => {
            snake.turnsLeft = snake.turnsLeft + 1
        })

        this.snakeHead.triggerAnim(SnakeAnim.APPLE_EATEN, 200)

        if(this.points == 5) {
            this.anim(GridAnim.SHRINK)
        }

        if(this.points == 8) {
            this.anim(GridAnim.GOLEFT)
        }

        if(this.points == 10) {
            this.anim(GridAnim.GORIGHT)
        }
    }

    anim(anim: GridAnim) {
        this.togglePlaying()
        this.grid.triggerAnim(anim)
        setTimeout(() => {
            this.togglePlaying()
        }, 3000);
    }

    onGameLost() {
        this.togglePlaying()
        alert('Lost, points: ' + this.points)
    }
}

export enum Direction {
    UP,
    RIGHT,
    DOWN,
    LEFT
}