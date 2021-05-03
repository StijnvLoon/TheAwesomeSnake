import { IEvent } from './Event'
import { Game } from './Game'

export class Level implements ProgressHandler {

    public isPlaying: boolean = false
    public turns: number = 0
    public game: Game

    constructor(
        targetPoints: number,
        apples: number,
        private startSpeed: number,
        private speedDecreasePerPoint: number,
        //on what turn the event takes place
        private eventsMap: Map<number, IEvent>
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

        if(won) {
            alert('Gewonnen!')
        } else {
            alert('Verloren, punten: ' + points)
        }
    }

    private loop() {
        setTimeout(() => {
            this.turns = this.turns + 1
            this.game.turn(this.eventsMap.get(this.turns))

            if (this.isPlaying) {
                this.loop()
            }
        }, this.game.calculateLoopSpeed(this.startSpeed, this.speedDecreasePerPoint))
    }
}

export interface ProgressHandler {
    start()
    pause()
    finish(won: boolean, points: number)
}