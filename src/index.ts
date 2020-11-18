import * as readline from 'readline';

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let command : Array<string> = [];

let finish : Boolean = false;
while (!finish) {
  rl.question('Please enter commands (enter \'exit\' to finish): ', (answer : string) => {
    switch(answer.toLowerCase()) {
      case 'exit':
          finish = true;
        break;
      default:
        command.push(answer);
        break;
    }
    rl.close();
  });
}


