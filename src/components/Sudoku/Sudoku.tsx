import "./Sudoku.css";
import { useState } from "react";
import SudokuCell from "../SudokuCell/SudokuCell";
import { SudokuMatrix, SudokuMatrixCellValue } from "../../types";

const Sudoku = () => {
  const [sudokuMatrix, setSudokuMatrix] = useState<SudokuMatrix>([
    [
      { value: null, default: false, provValues: [] },
      { value: null, default: false, provValues: [] },
      { value: 7, default: true, provValues: [] },
      { value: null, default: false, provValues: [] },
      { value: null, default: false, provValues: [] },
      { value: 3, default: true, provValues: [] },
      { value: null, default: false, provValues: [] },
      { value: 6, default: true, provValues: [] },
      { value: 1, default: true, provValues: [] },
    ],
    [
      { value: null, default: false, provValues: [] },
      { value: 1, default: true, provValues: [] },
      { value: null, default: false, provValues: [] },
      { value: null, default: false, provValues: [] },
      { value: 8, default: true, provValues: [] },
      { value: 6, default: true, provValues: [] },
      { value: null, default: false, provValues: [] },
      { value: null, default: false, provValues: [] },
      { value: null, default: false, provValues: [] },
    ],
    [
      { value: 3, default: true, provValues: [] },
      { value: null, default: false, provValues: [] },
      { value: null, default: false, provValues: [] },
      { value: null, default: false, provValues: [] },
      { value: null, default: false, provValues: [] },
      { value: 7, default: true, provValues: [] },
      { value: 9, default: true, provValues: [] },
      { value: null, default: false, provValues: [] },
      { value: null, default: false, provValues: [] },
    ],
    [
      { value: 1, default: true, provValues: [] },
      { value: null, default: false, provValues: [] },
      { value: 3, default: true, provValues: [] },
      { value: null, default: false, provValues: [] },
      { value: null, default: false, provValues: [] },
      { value: null, default: false, provValues: [] },
      { value: 5, default: true, provValues: [] },
      { value: null, default: false, provValues: [] },
      { value: null, default: false, provValues: [] },
    ],
    [
      { value: null, default: false, provValues: [] },
      { value: null, default: false, provValues: [] },
      { value: null, default: false, provValues: [] },
      { value: 8, default: true, provValues: [] },
      { value: 9, default: true, provValues: [] },
      { value: 2, default: true, provValues: [] },
      { value: null, default: false, provValues: [] },
      { value: null, default: false, provValues: [] },
      { value: null, default: false, provValues: [] },
    ],
    [
      { value: null, default: false, provValues: [] },
      { value: null, default: false, provValues: [] },
      { value: 4, default: true, provValues: [] },
      { value: null, default: false, provValues: [] },
      { value: null, default: false, provValues: [] },
      { value: null, default: false, provValues: [] },
      { value: 8, default: true, provValues: [] },
      { value: null, default: false, provValues: [] },
      { value: 6, default: true, provValues: [] },
    ],
    [
      { value: null, default: false, provValues: [] },
      { value: null, default: false, provValues: [] },
      { value: 5, default: true, provValues: [] },
      { value: 4, default: true, provValues: [] },
      { value: null, default: false, provValues: [] },
      { value: null, default: false, provValues: [] },
      { value: null, default: false, provValues: [] },
      { value: null, default: false, provValues: [] },
      { value: 3, default: true, provValues: [] },
    ],
    [
      { value: null, default: false, provValues: [] },
      { value: null, default: false, provValues: [] },
      { value: null, default: false, provValues: [] },
      { value: 7, default: true, provValues: [] },
      { value: 3, default: true, provValues: [] },
      { value: null, default: false, provValues: [] },
      { value: null, default: false, provValues: [] },
      { value: 8, default: true, provValues: [] },
      { value: null, default: false, provValues: [] },
    ],
    [
      { value: 9, default: true, provValues: [] },
      { value: 3, default: true, provValues: [] },
      { value: null, default: false, provValues: [] },
      { value: 5, default: true, provValues: [] },
      { value: null, default: false, provValues: [] },
      { value: null, default: false, provValues: [] },
      { value: 7, default: true, provValues: [] },
      { value: null, default: false, provValues: [] },
      { value: null, default: false, provValues: [] },
    ],
  ]);

  const rowsValid = (): boolean =>
    !sudokuMatrix.some((row) => {
      const rowVals: SudokuMatrixCellValue[] = [];

      return row.some((cell) => {
        if (!cell.value || (cell.value && !rowVals.includes(cell.value))) {
          rowVals.push(cell.value);
          return false;
        } else {
          return true;
        }
      });
    });

  const colsValid = (): boolean => {
    for (let i = 0; i < sudokuMatrix.length; i++) {
      const colVals: SudokuMatrixCellValue[] = [];

      for (let a = 0; a < sudokuMatrix.length; a++) {
        if (
          !sudokuMatrix[a][i].value ||
          (sudokuMatrix[a][i].value &&
            !colVals.includes(sudokuMatrix[a][i].value))
        ) {
          colVals.push(sudokuMatrix[a][i].value);
        } else {
          return false;
        }
      }
    }

    return true;
  };

  const blocksValid = (): boolean => {
    for (let i = 1; i < 4; i++) {
      for (let a = 1; a < 4; a++) {
        const blockVals: SudokuMatrixCellValue[] = [];

        for (let e = 0; e < 3; e++) {
          for (let u = 0; u < 3; u++) {
            if (
              !sudokuMatrix[e][u].value ||
              (sudokuMatrix[e][u].value &&
                !blockVals.includes(sudokuMatrix[e][u].value))
            ) {
              blockVals.push(sudokuMatrix[e][u].value);
            } else {
              return false;
            }
          }
        }
      }
    }
    return true;
  };

  const isValid = (): boolean => rowsValid() && colsValid() && blocksValid();

  const isComplete = (): boolean =>
    sudokuMatrix.every((row) => {
      return row.every((cell) => cell.value);
    });

  const isSolved = (): boolean => isComplete() && isValid();

  const getPossibilities = (): number[] => {
    const possibilities: number[] = [];

    return possibilities;
  };

  const iterateSudoku = () => {
    const provisionalMatrix: SudokuMatrix = [];

    sudokuMatrix.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (!cell.value) {
          const possibilities: number[] = getPossibilities();

          if (possibilities.length > 1) {
            if (!provisionalMatrix[y]) {
              provisionalMatrix[y] = [];
            }

            provisionalMatrix[y][x] = {
              value: sudokuMatrix[y][x].default
                ? sudokuMatrix[y][x].value
                : possibilities.length > 1
                ? null
                : possibilities[0],
              provValues: sudokuMatrix[y][x].default ? [] : possibilities,
            };
          }
        }
      });
    });

    setSudokuMatrix(provisionalMatrix);
  };

  const solveSudoku = (): void => {
    const iterator = setInterval(() => {
      if (!isSolved()) {
        iterateSudoku();
      } else {
        clearInterval(iterator);
      }
    }, 50);
  };

  return (
    <>
      <div className="sudoku-container">
        {sudokuMatrix.map((sudokuRow, i) => (
          <div key={i} className="sudoku-row">
            {sudokuRow.map((sudokuCell, a) => (
              <SudokuCell
                key={a}
                position={{ x: a, y: i }}
                cellData={sudokuCell}
                valueChange={(val) => {
                  if (!val || (val > 0 && val < 10)) {
                    const newSudoku: SudokuMatrix = [...sudokuMatrix];
                    newSudoku[i][a] = { value: val, provValues: [] };
                    setSudokuMatrix(newSudoku);
                  }
                }}
              />
            ))}
          </div>
        ))}
      </div>

      <br />

      <span>Valid: [{isValid() ? "Sí" : "No"}]</span>

      <br />

      <span>Solved: [{isSolved() ? "Sí" : "No"}]</span>

      <br />

      <button onClick={solveSudoku}>Solve</button>
    </>
  );
};

export default Sudoku;
