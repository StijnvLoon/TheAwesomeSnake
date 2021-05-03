import { GridAnim } from './Grid'

export interface IEvent {
    getEventType(): EventType
    getAction()
}

export class GridAnimEvent implements IEvent {

    constructor(
        public gridAnim: GridAnim,
        public duration: number
    ) {
    }

    getEventType(): EventType {
        return EventType.GRIDANIM
    }

    getAction() {
        return this.gridAnim
    }
}

export enum EventType {
    GRIDANIM
}