import { Command } from '../interfaces/Command';
import { CommandType } from '../enums/CommandType';
import { Direction } from '../enums/Direction';
import Board from './Board';

export default class Engine {
    private commands: Array<string>;

    constructor(commands: Array<string>) {
        this.commands = commands;
    }

    public processCommands(): void {
        const commands = this.commands.filter((command) => command.length > 0);
        const board = new Board(5, 5);

        commands.forEach((command) => {
            let { commandType, xCoordinate, yCoordinate, direction } = this.validateCommand(command);
            if (!commandType) return;
            const robot = board.getRobot();

            // If an instance of Robot does not exist, that means a PLACE command hasn't been called.
            if (robot === undefined && commandType != CommandType.PLACE) {
                console.log(this.getSkippedString(command, "a PLACE command hasn't been called."))
                return;
            }

            // Process the command
            console.log(command);
            switch (commandType) {
                case CommandType.PLACE:
                    if (xCoordinate === undefined || yCoordinate === undefined || direction === undefined) {
                        console.log(this.getSkippedString(command, "invalid arguments"));
                        return;
                    }
                    board.place(xCoordinate, yCoordinate, direction);
                    break;
                case CommandType.MOVE:
                    robot?.move();
                    break;
                case CommandType.LEFT:
                    robot?.left();
                    break;
                case CommandType.RIGHT:
                    robot?.right();
                    break;
                case CommandType.REPORT:
                    var output = robot?.report();
                    console.log(output);
                    break;
                default:
                    console.log(this.getSkippedString(command, "invalid command type"));
                    break;
            }
        });
    }

    private validateCommand(command: string): Command {
        const commandTokens = command.split(" ");
        const commandArgs: Command = {};

        if (commandTokens.length < 0) {
            console.log(this.getSkippedString(command, "invalid command format"));
            return commandArgs;
        }

        const commandTypeEnum: CommandType | undefined = (<any>CommandType)[commandTokens[0]];
        if (!commandTypeEnum) {
            console.log(this.getSkippedString(command, "invalid command type"));
            return commandArgs;
        }

        if (commandTokens.length == 1) {
            commandArgs.commandType = commandTypeEnum;
            return commandArgs;
        }

        const args: Array<string> = commandTokens[1].split(",");
        if (args.length < 3) {
            console.log(this.getSkippedString(command, "invalid arguments"));
            return commandArgs;
        }

        const xCoordinate = Number(args[0]);
        const yCoordinate = Number(args[1]);
        const direction = args[2];

        if (xCoordinate === undefined || xCoordinate % 1 !== 0) {
            console.log(this.getSkippedString(command, "invalid x coordinate"));
            return commandArgs;
        }

        if (yCoordinate === undefined || yCoordinate % 1 !== 0) {
            console.log(this.getSkippedString(command, "invalid y coordinate"));
            return commandArgs;
        }

        const directionEnum: Direction | undefined = (<any>Direction)[direction];

        commandArgs.commandType = commandTypeEnum;
        commandArgs.xCoordinate = xCoordinate;
        commandArgs.yCoordinate = yCoordinate;
        commandArgs.direction = directionEnum;

        return commandArgs;
    }

    private getSkippedString(commandName: string, reason: string) {
        return `Skipped: ${commandName} - ${reason}.`;
    }

}