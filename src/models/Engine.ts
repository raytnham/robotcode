import Board from './Board';
import Robot from './Robot';
import { CommandType } from '../enums/CommandType';
import { Direction } from '../enums/Direction';
import { Command } from '../interfaces/Command';
import { Output } from '../interfaces/Output';

export default class Engine {
    private commands: Array<string>;
    private boardDimensionX: number;
    private boardDimensionY: number;

    constructor(commands: Array<string>, boadDimensionX: number, boardDimensionY: number) {
        this.commands = commands;
        this.boardDimensionX = boadDimensionX >= 0 ? boadDimensionX : 0;
        this.boardDimensionY = boardDimensionY >= 0 ? boardDimensionY : 0;
    }

    public processCommands(): Output {
        const commands : Array<string> = this.commands.filter((command) => command.length > 0);
        const board : Board = new Board(this.boardDimensionX, this.boardDimensionY);
        let robot : Robot | undefined = undefined;
        const output : Output = {
            outputLog: [],
            totalCommands: commands.length,
            successfulCommands: 0,
            failedCommands: 0
        }

        commands.forEach((command) => {
            let { commandType, position, direction, errorMessage } = this.validateCommand(command);
            if (errorMessage !== undefined) {
                output.outputLog.push(errorMessage);
                output.failedCommands++;
                return;
            }

            // If an instance of Robot does not exist, that means a PLACE command hasn't been called.
            if (robot === undefined && commandType != CommandType.PLACE) {
                output.outputLog.push(this.getSkippedString(command, "a PLACE command hasn't been executed successfully"));
                output.failedCommands++;
                return;
            }

            // Process the command
            let commandOutput : string = command;
            switch (commandType) {
                case CommandType.PLACE:
                    if (position === undefined || direction === undefined) {
                        commandOutput = this.getSkippedString(command, "invalid arguments");
                        output.failedCommands++;
                        break;
                    }
                    robot = Robot.placeRobot(board, position, direction);
                    if (robot === undefined) {
                        commandOutput = this.getSkippedString(command, "off-grid");
                        output.failedCommands++;
                    } else {
                        output.successfulCommands++;
                    }
                    break;
                case CommandType.MOVE:
                    const success = robot !== undefined && robot.move();
                    if (success) {
                        output.successfulCommands++;
                    } else {
                        commandOutput = this.getSkippedString(command, "off-grid");
                        output.failedCommands++;
                    }
                    break;
                case CommandType.LEFT:
                    robot?.turnLeft();
                    output.successfulCommands++;
                    break;
                case CommandType.RIGHT:
                    robot?.turnRight();
                    output.successfulCommands++;
                    break;
                case CommandType.REPORT:
                    commandOutput += `\n${robot?.reportCurrentPosition()}`;
                    output.successfulCommands++;
                    break;
                default:
                    commandOutput += this.getSkippedString(command, "invalid command type");
                    output.successfulCommands++;
                    break;
            }

            output.outputLog.push(commandOutput);
        });

        return output;
    }

    private validateCommand(command: string): Command {
        const commandTokens = command.split(" ");
        const commandArgs: Command = {};

        if (commandTokens.length < 0) {
            commandArgs.errorMessage = this.getSkippedString(command, "invalid command format");
            return commandArgs;
        }

        const commandTypeEnum: CommandType | undefined = (<any>CommandType)[commandTokens[0]];
        if (!commandTypeEnum) {
            commandArgs.errorMessage = this.getSkippedString(command, "invalid command type");
            return commandArgs;
        }

        // Do not need to process arguments for types other than PLACE
        if (commandTokens.length == 1 || commandTypeEnum != CommandType.PLACE) {
            commandArgs.commandType = commandTypeEnum;
            return commandArgs;
        }

        const args: Array<string> = commandTokens[1].split(",");
        if (args.length < 3) {
            commandArgs.errorMessage = this.getSkippedString(command, "invalid arguments");
            return commandArgs;
        }

        const xCoordinate = Number(args[0]);
        const yCoordinate = Number(args[1]);
        const direction = args[2];

        if (xCoordinate === undefined || xCoordinate < 0 || xCoordinate % 1 !== 0) {
            commandArgs.errorMessage = this.getSkippedString(command, "invalid x coordinate");
            return commandArgs;
        }

        if (yCoordinate === undefined || yCoordinate < 0 || yCoordinate % 1 !== 0) {
            commandArgs.errorMessage = this.getSkippedString(command, "invalid y coordinate");
            return commandArgs;
        }

        const directionEnum: Direction | undefined = (<any>Direction)[direction];

        commandArgs.commandType = commandTypeEnum;
        commandArgs.position = {
            xCoordinate: xCoordinate,
            yCoordinate: yCoordinate
        }
        commandArgs.direction = directionEnum;

        return commandArgs;
    }

    private getSkippedString(commandName: string, reason: string) {
        return `Skipped: ${commandName} - ${reason}.`;
    }

}