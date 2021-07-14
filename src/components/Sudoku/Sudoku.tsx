import "./Sudoku.css";
import { useState } from "react";
import SudokuCell from "../SudokuCell/SudokuCell";

export interface SudokuMatrixCell {
  value: number | null;
  default?: boolean;
}

type SudokuMatrix = SudokuMatrixCell[][];

const Sudoku = () => {
  const [sudokuMatrix, setSudokuMatrix] = useState<SudokuMatrix>([
    [
      { value: 5, default: true },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
    ],
    [
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
    ],
    [
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
    ],
    [
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
    ],
    [
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
    ],
    [
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
    ],
    [
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
    ],
    [
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
    ],
    [
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
      { value: null, default: false },
    ],
  ]);

  const rowsValid = (): boolean =>
    !sudokuMatrix.some((row) => {
      const rowVals: (number | null)[] = [];

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
      const colVals: (number | null)[] = [];

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
        const blockVals: (number | null)[] = [];

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

  return (
    <>
      <div className="sudoku-container">
        {sudokuMatrix.map((sudokuRow, i) => (
          <div key={i} className="sudoku-row">
            {sudokuRow.map((sudokuCell, a) => (
              <SudokuCell
                key={a}
                position={{ x: i, y: a }}
                cellStatus={sudokuCell}
                valueChange={(val) => {
                  if (!val || (val > 0 && val < 10)) {
                    const newSudoku: SudokuMatrix = [...sudokuMatrix];
                    newSudoku[i][a] = { value: val };
                    setSudokuMatrix(newSudoku);
                  }
                }}
              />
            ))}
          </div>
        ))}
      </div>

      <span>Valid: [{isValid() ? "Sí" : "No"}]</span>
    </>
  );
};

export default Sudoku;
