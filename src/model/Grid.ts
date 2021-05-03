import { Cell } from './Cell';
import { Blockade } from './entities/Blockade';
import { GridAnimEvent } from './Event';

export class Grid {

    public cellsMap: Map<string, Cell>
    public gridAnimEvent: GridAnimEvent

    constructor(
        public readonly width: number,
        public readonly height: number,
    ) {
        this.cellsMap = new Map()
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                this.cellsMap.set(y + '-' + x, new Cell(y, x))
            }
        }

        //render borders
        //top
        for (var x = 0; x < width; x++) {
            this.getCellAt(0, x).interact(new Blockade())
        }
        //bottom
        for (var x = 0; x < width; x++) {
            this.getCellAt(height-1, x).interact(new Blockade())
        }
        //left
        for (var y = 1; y < height-1; y++) {
            this.getCellAt(y, 0).interact(new Blockade())
        }
        //right
        for (var y = 1; y < height-1; y++) {
            this.getCellAt(y, width-1).interact(new Blockade())
        }
    }

    public getCellAt(y: number, x: number): Cell {
        return this.cellsMap.get(y + '-' + x)
    }

    public getRandomCell(): Cell {
        const randomX = this.randomRange(0, this.width - 1)
        const randomY = this.randomRange(0, this.height - 1)

        return this.getCellAt(randomY, randomX)
    }

    public getRandomEmptyCell(): Cell {
        var cell: Cell

        while (true) {
            cell = this.getRandomCell()
            if(cell.entity == undefined) {
                break
            }
        }

        return cell
    }

    public randomRange(min, max) : number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    public playGridAnimEvent(gridAnimEvent: GridAnimEvent) {
        this.gridAnimEvent = gridAnimEvent
        // this.gridAnimEvent = undefined

        // setTimeout(() => {
        //     this.gridAnimEvent = gridAnimEvent
        // }, 5);
    }
}

export enum GridAnim {
    DEFAULT,
    ROTATE180,
    INVERT_COLORS,
    SHRINK,
    GOLEFT,
    GORIGHT
}