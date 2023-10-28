import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    const chance = [true, false];
    const random = () => {
      const idx = Math.floor(Math.random() * 2);
      return chance[idx];
    };

    initialBoard = Array.from({ length: ncols }, (row) => {
      return Array.from({ length: nrows }, (el) => random());
    });

    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return board.every((row) => row.every((el) => !el));
  }

  function flipCellsAround(coord) {
    console.log(coord);
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
          console.log("hello", boardCopy);
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.slice();

      // TODO: in the copy, flip this cell and the cells around it

      flipCell(y, x, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y + 1, x, boardCopy);
      flipCell(y - 1, x, boardCopy);
      // TODO: return the copy
      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO
  if (hasWon()) {
    return <div>You Win!</div>;
  }

  // make table board

  // TODO
  return (
    <div className="Board">
      {board.map((row, idxY) => {
        let preRows = row.map((el, idxX) => (
          <Cell
            key={`${idxY}-${idxX}`}
            flipCellsAroundMe={() => flipCellsAround(`${idxY}-${idxX}`)}
            isLit={el}
          />
        ));
        let rows = [<tr key={`${idxY}`}>{preRows}</tr>];
        return (
          <table>
            <tbody>{rows}</tbody>
          </table>
        );
      })}
    </div>
  );
}

export default Board;
