import "./Sudoku.css";
import { useState } from "react";
import SudokuCell from "../SudokuCell/SudokuCell";
import {
  SudokuCellPosition,
  SudokuMatrix,
  SudokuMatrixCellValue,
} from "../../types";

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

  const [iterator, setIterator] = useState<NodeJS.Timeout>();

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
    for (let y = 0; y < sudokuMatrix.length; y++) {
      const colVals: SudokuMatrixCellValue[] = [];

      for (let x = 0; x < sudokuMatrix[y].length; x++) {
        const cell = sudokuMatrix[y][x];
        if (!cell.value || (cell.value && !colVals.includes(cell.value))) {
          colVals.push(cell.value);
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

  const rowValues = (row: number): number[] => {
    const values: number[] = [];

    sudokuMatrix[row].forEach((cell) => {
      if (cell.value) {
        values.push(cell.value);
      }
    });

    return values;
  };

  const colValues = (col: number): number[] => {
    const values: number[] = [];

    for (let i = 0; i < 9; i++) {
      const cell = sudokuMatrix[i][col];

      if (cell.value) {
        values.push(cell.value);
      }
    }

    return values;
  };

  const blockValues = (blockOffset: SudokuCellPosition): number[] => {
    const values: number[] = [];

    for (let e = 3 * blockOffset.y; e < 3 * blockOffset.y + 3; e++) {
      for (let u = 3 * blockOffset.x; u < 3 * blockOffset.x + 3; u++) {
        const cell = sudokuMatrix[e][u];

        if (cell.value) {
          values.push(cell.value);
        }
      }
    }

    return values;
  };

  const getPossibilities = (position: SudokuCellPosition): number[] => {
    const possibilities: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    rowValues(position.y).forEach((rowValue) => {
      possibilities.splice(
        possibilities.findIndex((possibility) => possibility === rowValue),
        1
      );
    });

    colValues(position.x).forEach((colValue) => {
      possibilities.splice(
        possibilities.findIndex((possibility) => possibility === colValue),
        1
      );
    });

    const foundBlockValues = blockValues({
      x: Math.floor(position.x / 3),
      y: Math.floor(position.y / 3),
    });

    foundBlockValues.forEach((blockValue) => {
      const valueIndex = possibilities.findIndex(
        (possibility) => possibility === blockValue
      );

      if (valueIndex !== -1) {
        possibilities.splice(valueIndex, 1);
      }
    });

    return possibilities;
  };

  const iterateSudoku = () => {
    const provisionalMatrix: SudokuMatrix = [];

    sudokuMatrix.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (!cell.value) {
          const possibilities: number[] = getPossibilities({ x, y });

          if (possibilities.length > 1) {
            if (!provisionalMatrix[y]) {
              provisionalMatrix[y] = [];
            }

            provisionalMatrix[y][x] = cell.default
              ? cell
              : {
                  value: null,
                  provValues: possibilities,
                  default: false,
                };
          } else {
            if (!provisionalMatrix[y]) {
              provisionalMatrix[y] = [];
            }

            provisionalMatrix[y][x] = cell.default
              ? cell
              : {
                  value: possibilities[0],
                  provValues: possibilities,
                  default: false,
                };
          }
        } else {
          if (!provisionalMatrix[y]) {
            provisionalMatrix[y] = [];
          }

          provisionalMatrix[y][x] = cell;
        }
      });
    });

    setSudokuMatrix(provisionalMatrix);
  };

  const solveSudoku = (): void => {
    setIterator(
      setInterval(() => {
        if (!isSolved()) {
          iterateSudoku();
        } else {
          if (iterator) {
            clearInterval(iterator);
          }
        }
      }, 500)
    );
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
                    newSudoku[i][a] = {
                      value: val,
                      provValues: [],
                      default: false,
                    };
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
      <button
        onClick={() => {
          if (iterator) {
            clearInterval(iterator);
          }
        }}
      >
        Stop iterator
      </button>
      <button
        onClick={() => {
          console.log("blockValues", blockValues({ x: 1, y: 1 }));
        }}
      >
        Check
      </button>
    </>
  );
};

export default Sudoku;
