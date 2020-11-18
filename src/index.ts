import * as readline from 'readline';
import fs from 'fs';
import { Board } from './models/Board';
import { CommandType } from './enums/CommandType';
import { Command } from './interfaces/Command';
import { Direction } from './enums/Direction';

const reader = readline.createInterface(fs.createReadStream(".\\src\\testCmd.txt"))

// Read all commands from file
let commands: Array<string> = [];
reader.on("line", (line: string) => {
    commands.push(line);
})

reader.on("close", ()=> {
    commands = commands.filter((command) => command.length > 0);

    const board = new Board(5,5);

    // Process each command
    commands.forEach((command) => {
        let { commandType, xCoordinate, yCoordinate, direction } = validateCommand(command);
        if (!commandType) return;
        const robot = board.getRobot();
        console.log(command);

        switch(commandType){
            case CommandType.PLACE:
                if (xCoordinate === undefined || yCoordinate === undefined || direction === undefined) return;
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
                console.log(`Skipped: ${command} - invalid command type.`);
                break;
        }
    });

})

const validateCommand = ((command : string) : Command => {
    const commandTokens = command.split(" ");
    const commandArgs : Command = {};

    if (commandTokens.length < 0){
        console.log(`Skipped: ${command} - invalid command format.`);
        return commandArgs;
    }

    const commandTypeEnum: CommandType | undefined = (<any>CommandType)[commandTokens[0]];
    if (!commandTypeEnum){
        console.log(`Skipped: ${command} - invalid command type.`)
    }
    if (commandTokens.length == 1){
        commandArgs.commandType = commandTypeEnum;
        return commandArgs;
    }

    const args: Array<string> = commandTokens[1].split(",");
    if (args.length < 3){
        console.log(`Skipped: ${command} - invalid arguments.`);
        return commandArgs;
    }
    const xCoordinate = Number(args[0]);
    const yCoordinate = Number(args[1]);
    const direction = args[2];
    
    if (xCoordinate === undefined || xCoordinate % 1 !== 0 ){
        console.log(`Skipped: ${command} - invalid x coordinate.`);
        return commandArgs;
    }
    if (yCoordinate === undefined || yCoordinate % 1 !== 0 ){
        console.log(`Skipped: ${command} - invalid x coordinate.`);
        return commandArgs;
    }
    const directionEnum: Direction | undefined = (<any>Direction)[direction];

    commandArgs.commandType = commandTypeEnum;
    commandArgs.xCoordinate = xCoordinate;
    commandArgs.yCoordinate = yCoordinate;
    commandArgs.direction = directionEnum;

    return commandArgs;
});