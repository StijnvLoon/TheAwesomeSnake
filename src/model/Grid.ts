import { Cell, CellListener } from './Cell';

export class Grid {

    public cellsMap: Map<string, Cell>

    constructor(
        public readonly width: number,
        public readonly height: number,
        private cellEventListener: CellListener
    ) {
        this.cellsMap = new Map()
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                this.cellsMap.set(y + '-' + x, new Cell(y, x, cellEventListener))
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
}