import { Cell, CellListener } from './Cell';
import { Blockade } from './entities/Blockade';

export class Grid {

    public cellsMap: Map<string, Cell>
    public gridAnim: GridAnim

    constructor(
        public readonly width: number,
        public readonly height: number,
        cellEventListener: CellListener
    ) {
        this.cellsMap = new Map()
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                this.cellsMap.set(y + '-' + x, new Cell(y, x, cellEventListener))
            }
        }

        //render borders
        //top
        for (var x = 0; x < width; x++) {
            const cell = this.getCellAt(0, x)
            if(!cell.entity) {
                new Blockade(cell)
            }
        }
        //bottom
        for (var x = 0; x < width; x++) {
            const cell = this.getCellAt(height-1, x)
            if(!cell.entity) {
                new Blockade(cell)
            }
        }
        //left
        for (var y = 1; y < height-1; y++) {
            const cell = this.getCellAt(y, 0)
            if(!cell.entity) {
                new Blockade(cell)
            }
        }
        //right
        for (var y = 1; y < height-1; y++) {
            const cell = this.getCellAt(y, width-1)
            if(!cell.entity) {
                new Blockade(cell)
            }
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

    public triggerAnim(gridAnim: GridAnim) {
        this.gridAnim = undefined

        setTimeout(() => {
            this.gridAnim = gridAnim
        }, 5);
    }
}

export enum GridAnim {
    ROTATE180,
    INVERT_COLORS,
    SHRINK,
    GOLEFT,
    GORIGHT
}