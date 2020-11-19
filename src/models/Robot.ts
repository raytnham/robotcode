import { Direction } from '../enums/Direction';

export default class Robot {
    private xCoordinate: number;
    private yCoordinate: number;
    private direction: Direction;

    constructor(xCoordinate: number, yCoordinate: number, direction: Direction) {
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
        this.direction = direction;
    }

    public place = (xCoordinate: number, yCoordinate: number, direction: Direction) => {
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
        this.direction = direction;
    }

    public move = (): boolean => {
        switch (this.direction) {
            case Direction.EAST:
                this.xCoordinate++;
                break;
            case Direction.NORTH:
                this.yCoordinate++;
                break;
            case Direction.SOUTH:
                this.yCoordinate--;
                break;
            case Direction.WEST:
                this.xCoordinate--;
                break;
        }
        return true;
    }

    public left = (): boolean => {
        switch (this.direction) {
            case Direction.EAST:
                this.direction = Direction.NORTH;
                break;
            case Direction.NORTH:
                this.direction = Direction.WEST;
                break;
            case Direction.SOUTH:
                this.direction = Direction.EAST;
                break;
            case Direction.WEST:
                this.direction = Direction.SOUTH;
                break;
        }
        return true;
    }

    public right = (): boolean => {
        switch (this.direction) {
            case Direction.EAST:
                this.direction = Direction.SOUTH;
                break;
            case Direction.NORTH:
                this.direction = Direction.EAST;
                break;
            case Direction.SOUTH:
                this.direction = Direction.WEST;
                break;
            case Direction.WEST:
                this.direction = Direction.NORTH;
                break;
        }
        return true;
    }

    public report = (): string => {
        return `Output: ${this.xCoordinate},${this.yCoordinate},${Direction[this.direction]}`;
    }
}