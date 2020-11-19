import { expect } from 'chai';
import { Direction } from '../src/enums/Direction';
import { Position } from '../src/interfaces/Position';
import { Output } from '../src/interfaces/Output';
import Robot from '../src/models/Robot';
import Board from '../src/models/Board';
import Engine from '../src/models/Engine';

const testCommands = [
    "PLACE 1,2,EAST",
    "MOVE",
    "MOVE",
    "LEFT",
    "MOVE",
    "REPORT"
];

describe('Engine Tests', function() {
  it('process commands', function() {
    const testCommands = [
        "PLACE 1,2,EAST",
        "RIGHT",
        "MOVE",
        "LEFT",
        "MOVE",
        "REPORT"
    ];
    const engine = new Engine(testCommands, 5, 5);
    const output = engine.processCommands();

    expect(output.successfulCommands).equals(6);
    expect(output.failedCommands).equals(0);
  });

  it('skip all commands until the first PLACE commnand', function() {
    const testCommands = [
        "MOVE",
        "MOVE",
        "MOVE",
        "LEFT",
        "PLACE 1,2,EAST"
    ];
    const engine = new Engine(testCommands, 5, 5);
    const output = engine.processCommands();

    expect(output.failedCommands).equals(4);
  });

  it('skip all invalid commands', function() {
    const testCommands = [
        "MOVE1",
        "MOVE2"
    ];
    const engine = new Engine(testCommands, 5, 5);
    const output = engine.processCommands();

    expect(output.failedCommands).equals(2);
  });

  it('ignore arguments for all command types other than PLACE', function() {
    const testCommands = [
        "PLACE 1,1,EAST",
        "MOVE 1,2",
        "REPORT"
    ];
    const engine = new Engine(testCommands, 5, 5);
    const output = engine.processCommands();

    expect(output.failedCommands).equals(0);
  });

  it('ignore PLACE command with no arguments', function() {
    const testCommands = [
        "PLACE"
    ];
    const engine = new Engine(testCommands, 5, 5);
    const output = engine.processCommands();

    expect(output.failedCommands).equals(1);
  });

  it('ignore PLACE command with invalid arguments', function() {
    const testCommands = [
        "PLACE 1"
    ];
    const engine = new Engine(testCommands, 5, 5);
    const output = engine.processCommands();

    expect(output.failedCommands).equals(1);
  });

  it('ignore PLACE command with invalid x position', function() {
    const testCommands = [
        "PLACE abc,2,EAST"
    ];
    const engine = new Engine(testCommands, 5, 5);
    const output = engine.processCommands();

    expect(output.failedCommands).equals(1);
  });

  it('ignore PLACE command with invalid y position', function() {
    const testCommands = [
        "PLACE 1,-100,EAST"
    ];
    const engine = new Engine(testCommands, 5, 5);
    const output = engine.processCommands();

    expect(output.failedCommands).equals(1);
  });

});