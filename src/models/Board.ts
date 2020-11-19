import { Position } from '../interfaces/Position';

const boardOrigin: Position = {
    xCoordinate: 0,
    yCoordinate: 0
}

export default class Board {
    private width: Number;
    private height: Number;

    constructor(width: Number, height: Number) {
        this.width = width >= 0 ? width : 0;
        this.height = height >= 0 ? height : 0;
    }

    public isWithinTheBoard = (position: Position): boolean => {
        return position.xCoordinate <= this.width && position.xCoordinate >= boardOrigin.xCoordinate &&
        position.yCoordinate <= this.height && position.yCoordinate >= boardOrigin.yCoordinate;
    }

    public toString = () => `width = ${this.width}; height = ${this.height}`;
}
