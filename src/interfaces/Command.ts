import { Direction } from '../enums/Direction';
import { CommandType } from '../enums/CommandType';
import { Position } from '../interfaces/Position';

export interface Command{
    commandType?: CommandType;
    position?: Position;
    direction?: Direction;
    errorMessage?: string;
}