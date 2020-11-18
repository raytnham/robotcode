import { Robot } from './Robot';
import { Direction } from '../enums/Direction';

const boardOrigin: { width : number, height : number } = {
    width: 0,
    height: 0
}

export class Board {
    private width: Number;
    private height: Number;
    private robot?: Robot;

    constructor(width: Number, height: Number){
        this.width = width;
        this.height = height;
    }

    public setRobot = (robot: Robot) => {
        this.robot = robot;
    }

    public getRobot = (): Robot | undefined => {
        return this.robot;
    }

    public place = (xCoordinate: number, yCoordinate: number, direction: Direction): boolean => {
        if (xCoordinate > this.width || xCoordinate < boardOrigin.width ||
            yCoordinate > this.height || yCoordinate < boardOrigin.height
        )
            return false;

        if (!this.robot) {
            this.setRobot(new Robot(xCoordinate, yCoordinate, direction));
        } else {
            this.robot?.place(xCoordinate, yCoordinate, direction);
        }
        
        return true;
    }

    public toString = () => `width = ${this.width}; height = ${this.height}`;
}
