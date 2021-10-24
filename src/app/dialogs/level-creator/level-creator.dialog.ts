import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GridAnimEvent } from 'src/model/Event';
import { GridAnim } from 'src/model/Grid';
import { Level, LevelListener } from '../../../model/Level';

export interface DialogData {
    levelListener: LevelListener
}

@Component({
    selector: 'level-creator-dialog',
    templateUrl: './level-creator.dialog.html',
    styleUrls: ['../dialog.scss', './level-creator.dialog.scss']
})
export class LevelCreatorDialog {

    public targetPoints: number = 20
    public apples: number = 1
    public startDelay: number = 700
    public delayDecreasePerPoint: number = 15
    public events: EventCreator[] = []

    constructor(
        public dialogRef: MatDialogRef<LevelCreatorDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }

    close(): void {
        this.dialogRef.close(false)
    }

    submit() {
        this.dialogRef.close(new Level(
            -1,
            this.targetPoints,
            this.apples,
            this.startDelay,
            this.delayDecreasePerPoint,
            this.getEventsMap(),
            this.data.levelListener
        ))
    }

    private getEventsMap() {
        const map: Map<any, any> = new Map()

        this.events.forEach(eventHolder => {
            map.set(eventHolder.triggerOnPoints, new GridAnimEvent(GridAnim[eventHolder.animString], eventHolder.duration))
        })

        return map
    }

    addEvent() {
        this.events.push(new EventCreator())
    }

    getAnimations(): string[] {
        return this.getObjValues(GridAnim).filter(v => typeof v === 'string') as string[]
    }

    getObjValues(e: any): (number | string)[] {
        return Object.keys(e).map(k => e[k])
    }
}

class EventCreator {
    public triggerOnPoints: number = 5
    public animString: string = GridAnim.DEFAULT.toString()
    public duration: number = 1000
}