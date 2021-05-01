import { Cell } from './Cell';

export class Grid {

    public cellsMap: Map<string, Cell>

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
    }

    public getCellAt(y: number, x: number): Cell {
        return this.cellsMap.get(y + '-' + x)
    }
}