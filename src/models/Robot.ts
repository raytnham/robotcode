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

    public getX = () => { return this.xCoordinate }

    public move = () => {
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
    }

    public left = () => {
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
    }

    public right = () => {
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
    }

    public report = (): string => {
        return `Output: ${this.xCoordinate},${this.yCoordinate},${Direction[this.direction]}`;
    }
}