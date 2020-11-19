import * as readline from 'readline';
import fs from 'fs';
import Engine from './models/Engine';

const reader = readline.createInterface(fs.createReadStream("./commandlist.txt"))

// Read all commands from file
let commands: Array<string> = [];
reader.on("line", (line: string) => {
    commands.push(line);
})

// Process commands once the reader finishes
reader.on("close", () => {
    const boardDimensionX: number = 5;
    const boardDimensionY: number = 5;
    const engine = new Engine(commands, boardDimensionX, boardDimensionY);
    engine.processCommands();
})