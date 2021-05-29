import { IEvent } from './Event'
import { Game } from './Game'

export class Level implements ProgressHandler {

    public isPlaying: boolean = false
    public turns: number = 0
    public game: Game

    constructor(
        targetPoints: number,
        apples: number,
        private startDelay: number,
        private delayDecreasePerPoint: number,
        //on what turn the events takes place
        private eventsMap: Map<number, IEvent>,
        private listener: LevelListener
    ) {
        this.game = new Game(this, targetPoints, apples)
    }

    start() {
        this.isPlaying = true
        this.loop()
    }

    pause() {
        this.isPlaying = false
    }

    finish(won: boolean, points: number) {
        this.isPlaying = false

        this.listener.onLevelEnded(won, points)
    }

    private loop() {
        setTimeout(() => {
            this.turns = this.turns + 1
            this.game.turn(this.getNextEvent(this.game.points))

            // this.isPlaying = false

            if (this.isPlaying) {
                this.loop()
            }
        }, this.game.calculateLoopDelay(this.startDelay, this.delayDecreasePerPoint))
    }

    private getNextEvent(points: number): IEvent {
        //get event that is registered with the points
        //remove the event from the list
        //return event
        const event: IEvent = this.eventsMap.get(points)
        this.eventsMap.delete(points)

        return event
    }
}

export interface ProgressHandler {
    start()
    pause()
    finish(won: boolean, points: number)
}

export interface LevelListener {
    onLevelEnded(won: boolean, points: number)
}