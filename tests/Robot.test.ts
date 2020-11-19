import { expect } from 'chai';
import { Direction } from '../src/enums/Direction';
import { Position } from '../src/interfaces/Position';
import Robot from '../src/models/Robot';
import Board from '../src/models/Board';

const setUpRobot = (initialPosition: Position): Robot | undefined => {
    const testBoard = new Board(5,5);
    const direction = Direction.EAST;
    var robot = Robot.placeRobot(testBoard, initialPosition, direction);
    return robot;
} 

describe('Robot Tests', function() {
  it('place robot successfully', function() {
    const initialPosition : Position = {
        xCoordinate: 1,
        yCoordinate: 1
    }
    const robot = setUpRobot(initialPosition);

    expect(robot).not.to.be.undefined;
  });

  it('place robot failed', function() {
    const initialPosition : Position = {
        xCoordinate: 6,
        yCoordinate: 6
    }
    const robot = setUpRobot(initialPosition);

    expect(robot).to.be.undefined;
  });

  it('move', function() {
    const initialPosition : Position = {
        xCoordinate: 1,
        yCoordinate: 1
    }
    const robot = setUpRobot(initialPosition);

    const success = robot?.move();
    expect(success).equals(true);

    const currentPosition = robot?.getCurrentPosition();
    expect(currentPosition?.xCoordinate).equals(2);
    expect(currentPosition?.yCoordinate).equals(1);
  });

  it('move robot off grid', function() {
    const initialPosition : Position = {
        xCoordinate: 5,
        yCoordinate: 5
    }
    const robot = setUpRobot(initialPosition);

    const success = robot?.move();
    expect(success).equals(false);

    const currentPosition = robot?.getCurrentPosition();
    expect(currentPosition?.xCoordinate).equals(5);
    expect(currentPosition?.yCoordinate).equals(5);
  });

  it('turn right', function() {
    const initialPosition : Position = {
        xCoordinate: 1,
        yCoordinate: 1
    }
    var robot = setUpRobot(initialPosition);

    robot?.turnRight();
    expect(robot?.getCurrentDirection()).equals(Direction.SOUTH);

    robot?.turnRight();
    expect(robot?.getCurrentDirection()).equals(Direction.WEST);
 
    robot?.turnRight();
    expect(robot?.getCurrentDirection()).equals(Direction.NORTH);
 
    robot?.turnRight();
    expect(robot?.getCurrentDirection()).equals(Direction.EAST);
  });

  it('turn left', function() {
    const initialPosition : Position = {
        xCoordinate: 1,
        yCoordinate: 1
    }
    var robot = setUpRobot(initialPosition);

    robot?.turnLeft();
    expect(robot?.getCurrentDirection()).equals(Direction.NORTH);

    robot?.turnLeft();
    expect(robot?.getCurrentDirection()).equals(Direction.WEST);
 
    robot?.turnLeft();
    expect(robot?.getCurrentDirection()).equals(Direction.SOUTH);
 
    robot?.turnLeft();
    expect(robot?.getCurrentDirection()).equals(Direction.EAST);
  });

});