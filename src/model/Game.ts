import { Grid } from "./Grid";
import { EventType, GridAnimEvent, IEvent } from './Event'
import { Snake, SnakeAnim } from './entities/Snake';
import { Apple } from './entities/Apple';
import { Cell } from "./Cell";
import { ProgressHandler } from './Level';

export class Game {

    public grid: Grid
    public direction: Direction = Direction.RIGHT
    private snakes: Snake[]
    public snakeHead: Snake
    public points: number = 1

    constructor(
        private progressHandler: ProgressHandler,
        public targetPoints: number,
        appleAmount: number
    ) {
        this.grid = new Grid(20, 20)
        this.snakes = []
        this.createSnake(this.grid.getCellAt(5, 4))

        for(let i = 0; i < appleAmount; i++) {
            this.createApple()
        }
    }

    createSnake(targetCell: Cell) {
        //make snake object with listener
        const snake: Snake = new Snake(this.points, this.direction)
        snake.entityListener = {
            onKilled: () => {
                const index: number = this.snakes.indexOf(snake)

                if (snake == this.snakeHead) {
                    this.onGameLost()
                }

                delete snake.snakeBody
                delete snake.currentCell.entity
                delete this.snakes[index]
                this.snakes.splice(index, 1)
            }
        }

        //add snake to snakes
        this.snakes.push(snake)

        //set current snakehead as bodypart
        if (this.snakeHead) {
            snake.snakeBody = this.grid.getCellAt(
                this.snakeHead.currentCell.y,
                this.snakeHead.currentCell.x
            ).entity as Snake

            this.snakeHead.isHead = false
        }

        //take over snake head
        this.snakeHead = snake

        targetCell.interact(snake)
    }

    createApple() {
        const apple: Apple = new Apple()
        apple.entityListener = {
            onKilled: () => {
                delete apple.currentCell.entity
                this.onAppleEaten()
            }
        }
        this.grid.getRandomEmptyCell().interact(apple)
    }

    turn(event?: IEvent) {
        if(this.points == this.targetPoints) {
            this.progressHandler.finish(true, this.points)
        } else {
            const nextCell = this.getNextCell()
            this.createSnake(nextCell)
            this.notifySnakes()
        
            if(event) {
                this.playEvent(event)
            }
        }
    }

    private getNextCell(): Cell {
        switch (this.direction) {
            case Direction.UP: {
                return this.grid.getCellAt(this.snakeHead.currentCell.y - 1, this.snakeHead.currentCell.x)
            }
            case Direction.RIGHT: {
                return this.grid.getCellAt(this.snakeHead.currentCell.y, this.snakeHead.currentCell.x + 1)
            }
            case Direction.DOWN: {
                return this.grid.getCellAt(this.snakeHead.currentCell.y + 1, this.snakeHead.currentCell.x)
            }
            case Direction.LEFT: {
                return this.grid.getCellAt(this.snakeHead.currentCell.y, this.snakeHead.currentCell.x - 1)
            }
        }
    }

    private notifySnakes() {
        this.snakes.forEach((snake) => {
            snake.progress()
        })
    }

    private playEvent(event: IEvent) {
        this.progressHandler.pause()

        this.countdown(() => {
            switch (event.getEventType()) {
                case EventType.GRIDANIM: {
                    const gridAnimEvent = event as GridAnimEvent
    
                    this.grid.playGridAnimEvent(gridAnimEvent)
                    setTimeout(() => {
                        this.progressHandler.start()
                    }, gridAnimEvent.duration);
                }
            }
        })
    }

    countdown(action: () => void) {
        this.grid.display3()
        setTimeout(() => {
            this.grid.display2()
        }, 1000);
        setTimeout(() => {
            this.grid.display1()
        }, 2000);
        setTimeout(() => {
            this.grid.cleanBoard()
            action()
        }, 3000);
    }

    onAppleEaten() {
        this.points = this.points + 1
        this.createApple()

        this.snakes.forEach((snake) => {
            snake.turnsLeft = snake.turnsLeft + 1
        })

        this.snakeHead.triggerAnim(SnakeAnim.APPLE_EATEN, 200)
    }

    onGameLost() {
        this.progressHandler.finish(false, this.points)
    }

    calculateLoopDelay(startSpeed: number, speedDecreasePerPoint: number): number {

        const calculatedSpeed: number = startSpeed - (this.points * speedDecreasePerPoint)
        //200 = min delay
        if(calculatedSpeed > 200) {
            return calculatedSpeed
        } else {
            return 200
        }
    }
}

export enum Direction {
    UP,
    RIGHT,
    DOWN,
    LEFT
}