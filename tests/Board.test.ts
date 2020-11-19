import { expect } from 'chai';
import Board from '../src/models/Board';
import { Position } from '../src/interfaces/Position';

describe('Board Tests', function() {
  it('initialisation with negative dimensions', function() {
    const board = new Board(-1, -1);
    expect(board.getWidth()).equal(0);
    expect(board.getHeight()).equal(0);
  });

  it('initialisation with positive dimensions', function() {
    const board = new Board(10, 10);
    expect(board.getWidth()).equal(10);
    expect(board.getHeight()).equal(10);
  });
  
  it('check if position is within the board', function() {
    const testBoard = new Board(5,5);
    const position : Position = {
      xCoordinate: 1,
      yCoordinate: 1
    }
    expect(testBoard.isWithinTheBoard(position)).equal(true);
  });

  it('check if position is outside of the board', function() {
    const testBoard = new Board(5,5);
    const position : Position = {
      xCoordinate: 6,
      yCoordinate: 6
    }
    expect(testBoard.isWithinTheBoard(position)).equal(false);
  });

});