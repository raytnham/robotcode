import Robot from './Robot';
import { Direction } from '../enums/Direction';

const boardOrigin: { xCoordinator: number, yCoordinate: number } = {
    xCoordinator: 0,
    yCoordinate: 0
}

export default class Board {
    private width: Number;
    private height: Number;
    private robot?: Robot;

    constructor(width: Number, height: Number) {
        this.width = width;
        this.height = height;
    }

    public setRobot = (robot: Robot) => {
        this.robot = robot;
    }

    public getRobot = (): Robot | undefined => {
        return this.robot;
    }

    public placeRobot = (xCoordinate: number, yCoordinate: number, direction: Direction): boolean => {
        if (!this.isWithinTheGrid(xCoordinate, yCoordinate)) {
            return false;
        }

        if (this.robot === undefined) {
            this.setRobot(new Robot(xCoordinate, yCoordinate, direction));
        } else {
            this.robot?.place(xCoordinate, yCoordinate, direction);
        }

        return true;
    }

    private isWithinTheGrid = (xCoordinate: number, yCoordinate: number): boolean => {
        return xCoordinate <= this.width && xCoordinate >= boardOrigin.xCoordinator &&
            yCoordinate <= this.height && yCoordinate >= boardOrigin.yCoordinate;
    }

    public toString = () => `width = ${this.width}; height = ${this.height}`;
}
