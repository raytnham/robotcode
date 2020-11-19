import * as readline from 'readline';
import fs from 'fs';
import Engine from './models/Engine';

const reader = readline.createInterface(fs.createReadStream(".\\src\\testCmd.txt"))

// Read all commands from file
let commands: Array<string> = [];
reader.on("line", (line: string) => {
    commands.push(line);
})

// Process each command
reader.on("close", () => {
    const engine = new Engine(commands);
    engine.processCommands();
})