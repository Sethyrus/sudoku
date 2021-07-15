import "./Sudoku.css";
import { useCallback, useEffect, useState } from "react";
import SudokuCell from "../SudokuCell/SudokuCell";
import {
  SudokuCellPosition,
  SudokuMatrix,
  SudokuMatrixCellValue,
} from "../../types";
import { log } from "../../helpers";

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
  const [useIterator, setUseIterator] = useState<boolean>(false);
  const [iteratorRound, setIteratorRound] = useState<number>(0);
  const [currPosition, setCurrPosition] = useState<SudokuCellPosition>({
    x: 0,
    y: 0,
  });
  const [lastAction, setLastAction] = useState<"forward" | "backward">(
    "forward"
  );

  const rowsValid = useCallback(
    (matrix: SudokuMatrix = sudokuMatrix): boolean =>
      !matrix.some((row) => {
        const rowVals: SudokuMatrixCellValue[] = [];

        return row.some((cell) => {
          if (!cell.value || (cell.value && !rowVals.includes(cell.value))) {
            rowVals.push(cell.value);
            return false;
          } else {
            return true;
          }
        });
      }),
    [sudokuMatrix]
  );

  const colsValid = useCallback(
    (matrix: SudokuMatrix = sudokuMatrix): boolean => {
      for (let x = 0; x < matrix.length; x++) {
        const colVals: SudokuMatrixCellValue[] = [];

        for (let y = 0; y < matrix[x].length; y++) {
          const cell = matrix[y][x];
          if (!cell.value || (cell.value && !colVals.includes(cell.value))) {
            colVals.push(cell.value);
          } else {
            return false;
          }
        }
      }

      return true;
    },
    [sudokuMatrix]
  );

  const blocksValid = useCallback(
    (matrix: SudokuMatrix = sudokuMatrix): boolean => {
      for (let i = 1; i < 4; i++) {
        for (let a = 1; a < 4; a++) {
          const blockVals: SudokuMatrixCellValue[] = [];

          for (let e = 0; e < 3; e++) {
            for (let u = 0; u < 3; u++) {
              if (
                !matrix[e][u].value ||
                (matrix[e][u].value && !blockVals.includes(matrix[e][u].value))
              ) {
                blockVals.push(matrix[e][u].value);
              } else {
                return false;
              }
            }
          }
        }
      }

      return true;
    },
    [sudokuMatrix]
  );

  const isValid = useCallback(
    (matrix: SudokuMatrix = sudokuMatrix): boolean =>
      rowsValid(matrix) && colsValid(matrix) && blocksValid(matrix),
    [blocksValid, colsValid, rowsValid, sudokuMatrix]
  );

  const isComplete = useCallback(
    (matrix: SudokuMatrix = sudokuMatrix): boolean =>
      matrix.every((row) => {
        return row.every((cell) => cell.value);
      }),
    [sudokuMatrix]
  );

  const isSolved = useCallback(
    (matrix: SudokuMatrix = sudokuMatrix): boolean =>
      isComplete(matrix) && isValid(matrix),
    [isComplete, isValid, sudokuMatrix]
  );

  const rowValues = useCallback(
    (row: number): number[] => {
      const values: number[] = [];

      sudokuMatrix[row].forEach((cell) => {
        if (cell.value) {
          values.push(cell.value);
        }
      });

      return values;
    },
    [sudokuMatrix]
  );

  const colValues = useCallback(
    (col: number): number[] => {
      const values: number[] = [];

      for (let i = 0; i < 9; i++) {
        const cell = sudokuMatrix[i][col];

        if (cell.value) {
          values.push(cell.value);
        }
      }

      return values;
    },
    [sudokuMatrix]
  );

  const blockValues = useCallback(
    (blockOffset: SudokuCellPosition): number[] => {
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
    },
    [sudokuMatrix]
  );

  const getPossibilities = useCallback(
    (position: SudokuCellPosition): number[] => {
      const possibilities: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      rowValues(position.y).forEach((rowValue) => {
        const valueIndex = possibilities.findIndex(
          (possibility) => possibility === rowValue
        );

        if (valueIndex !== -1) {
          possibilities.splice(valueIndex, 1);
        }
      });

      colValues(position.x).forEach((colValue) => {
        const valueIndex = possibilities.findIndex(
          (possibility) => possibility === colValue
        );

        if (valueIndex !== -1) {
          possibilities.splice(valueIndex, 1);
        }
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
    },
    [blockValues, colValues, rowValues]
  );

  const setInitialValues = useCallback(
    (matrix: SudokuMatrix = sudokuMatrix): SudokuMatrix => {
      const provisionalMatrix: SudokuMatrix = [];

      matrix.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell.default) {
            if (!provisionalMatrix[y]) {
              provisionalMatrix[y] = [];
            }

            provisionalMatrix[y][x] = cell;
          } else {
            const possibilities: number[] = getPossibilities({ x, y });

            if (!provisionalMatrix[y]) {
              provisionalMatrix[y] = [];
            }

            provisionalMatrix[y][x] = {
              value: null,
              provValues: possibilities,
              default: false,
            };
          }
        });
      });

      return provisionalMatrix;
    },
    [getPossibilities, sudokuMatrix]
  );

  const nextRound = useCallback(
    (
      matrix: SudokuMatrix = sudokuMatrix,
      currPos: SudokuCellPosition = currPosition,
      lastAct: "forward" | "backward" = lastAction
    ): {
      matrix: SudokuMatrix;
      currPos: SudokuCellPosition;
      lastAct: "forward" | "backward";
    } => {
      const provisionalMatrix: SudokuMatrix = [...matrix];
      let nextCurrPosition: SudokuCellPosition;
      let nextLastAction: "forward" | "backward";

      if (!matrix[currPos.y][currPos.x].default) {
        if (matrix[currPos.y][currPos.x].value) {
          if (isValid() && lastAct === "forward") {
            log("1 (isValid -> forward)");

            // Siguiente casilla
            nextCurrPosition = {
              x: currPos.x === 8 ? 0 : currPos.x + 1,
              y: currPos.x === 8 ? currPos.y + 1 : currPos.y,
            };

            nextLastAction = "forward";
          } else {
            const newValue: number | undefined =
              matrix[currPos.y][currPos.x].provValues[
                matrix[currPos.y][currPos.x].provValues.findIndex(
                  (provValue) =>
                    provValue === matrix[currPos.y][currPos.x].value
                ) + 1
              ];

            if (newValue) {
              log("2 (invalid -> assign new value");

              provisionalMatrix[currPos.y][currPos.x].value = newValue;

              // Misma casilla (debe comprobarse)
              nextCurrPosition = currPos;
              nextLastAction = "forward";
            } else {
              log("3 (invalid -> no more values, backward");

              // Casilla anterior
              nextCurrPosition = {
                x: currPos.x === 0 ? 8 : currPos.x - 1,
                y: currPos.x === 0 ? currPos.y - 1 : currPos.y,
              };

              provisionalMatrix[currPos.y][currPos.x].value = null;

              nextLastAction = "backward";
            }
          }
        } else {
          log("4 (no value, default assigned)");

          // Misma casilla (debe comprobarse)
          provisionalMatrix[currPos.y][currPos.x].value =
            matrix[currPos.y][currPos.x].provValues[0];

          nextCurrPosition = currPos;

          nextLastAction = "forward";
        }
      } else {
        if (lastAct === "forward") {
          log("5 (default -> forward)");

          // Siguiente casilla
          nextCurrPosition = {
            x: currPos.x === 8 ? 0 : currPos.x + 1,
            y: currPos.x === 8 ? currPos.y + 1 : currPos.y,
          };

          nextLastAction = lastAct;
        } else {
          log("6 (default <- backward)");

          // Casilla anterior
          nextCurrPosition = {
            x: currPos.x === 0 ? 8 : currPos.x - 1,
            y: currPos.x === 0 ? currPos.y - 1 : currPos.y,
          };

          nextLastAction = lastAct;
        }
      }

      setCurrPosition(nextCurrPosition);
      setLastAction(nextLastAction);

      return {
        matrix: provisionalMatrix,
        currPos: nextCurrPosition,
        lastAct: nextLastAction,
      };
    },
    [currPosition, isValid, sudokuMatrix, lastAction]
  );

  const iterateSudoku = useCallback(() => {
    let iteration = iteratorRound;
    let matrix: SudokuMatrix = [...sudokuMatrix];
    let currPos: SudokuCellPosition = currPosition;
    let lastAct: "forward" | "backward" = lastAction;

    const doIterate = () => {
      if (iteration === 0) {
        matrix = setInitialValues(matrix);
        iteration++;
      } else {
        const newVal = nextRound(matrix, currPos, lastAct);
        matrix = newVal.matrix;
        currPos = newVal.currPos;
        lastAct = newVal.lastAct;
        iteration++;
      }
    };

    if (!isSolved(matrix)) {
      doIterate();
      setCurrPosition(currPos);
      setLastAction(lastAct);
      setIteratorRound(iteration);
      setSudokuMatrix(matrix);
    }
  }, [
    iteratorRound,
    setInitialValues,
    nextRound,
    sudokuMatrix,
    isSolved,
    currPosition,
    lastAction,
  ]);

  const solveSudoku = (): void => setUseIterator(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (useIterator) {
      timeout = setTimeout(() => {
        iterateSudoku();
      }, 0);
    }

    return () => {
      clearInterval(timeout);
    };
  }, [useIterator, isSolved, iterateSudoku]);

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

      <span>
        <span>[ronda: {iteratorRound}] - </span>
        <span>[valid: {isValid() ? "sí" : "no"}] - </span>
        <span>[solved: {isSolved() ? "sí" : "no"}]</span>
      </span>

      <br />

      <span>
        <button onClick={solveSudoku}>Start iterator</button>
        &nbsp;
        <button onClick={() => setUseIterator(false)}>Stop iterator</button>
        &nbsp;
        <button onClick={() => log(rowsValid())}>Check</button>
      </span>
    </>
  );
};

export default Sudoku;
