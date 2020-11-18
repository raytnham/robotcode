import * as readline from 'readline';
import fs from 'fs';

const reader = readline.createInterface(fs.createReadStream(".\\src\\testCmd.txt"))

let commands: Array<string> = [];
reader.on("line", (line: string) => {
    commands.push(line);
})

reader.on("close", ()=> {
    console.log(`Data has been read ${commands.length}` );
    commands.forEach(command => {
        console.log(command);
    });
    commands = commands.filter((command) => command.length > 0);

    

})