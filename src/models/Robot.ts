import { Direction } from '../enums/Direction';
import { Position } from '../interfaces/Position';
import Board from './Board';

export default class Robot {
    private currentPosition: Position;
    private direction: Direction;
    private board: Board;
    private newPosition?: Position;

    private constructor(board: Board, position: Position, direction: Direction) {
        this.board = board;
        this.currentPosition = position;
        this.direction = direction;
    }

    public static placeRobot = (board: Board, position: Position, direction: Direction) : Robot | undefined => {
        if (board.isWithinTheBoard(position)) {
            return new Robot(board, position, direction);
        }
    }

    private setCurrentPosition(position: Position) {
        this.currentPosition = {
            xCoordinate: position.xCoordinate,
            yCoordinate: position.yCoordinate
        }
    }

    private setNewPostion(position: Position) {
        this.newPosition = {
            xCoordinate: position.xCoordinate,
            yCoordinate: position.yCoordinate
        }
    }

    public move = (): boolean => {
        this.setNewPostion(this.currentPosition);
        if (this.newPosition == undefined) return false;

        switch (this.direction) {
            case Direction.EAST:
                this.newPosition.xCoordinate++;
                break;
            case Direction.NORTH:
                this.newPosition.yCoordinate++;
                break;
            case Direction.SOUTH:
                this.newPosition.yCoordinate--;
                break;
            case Direction.WEST:
                this.newPosition.xCoordinate--;
                break;
        }

        if (this.board.isWithinTheBoard(this.newPosition)) {
            this.setCurrentPosition(this.newPosition);
            return true;
        }

        return false;
    }

    public turnLeft = (): void => {
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

    public turnRight = (): void => {
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

    public reportCurrentPosition = (): string => {
        return `Output: ${this.currentPosition.xCoordinate},${this.currentPosition.yCoordinate},${Direction[this.direction]}`;
    }
}