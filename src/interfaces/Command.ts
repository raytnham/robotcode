import { Direction } from '../enums/Direction';
import { CommandType } from '../enums/CommandType';

export interface Command{
    commandType?: CommandType;
    xCoordinate?: number;
    yCoordinate?: number;
    direction?: Direction;
}