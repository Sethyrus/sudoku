import "./Sudoku.css";
import { useCallback, useEffect, useState } from "react";
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
    (): boolean =>
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
      }),
    [sudokuMatrix]
  );

  const colsValid = useCallback((): boolean => {
    for (let x = 0; x < sudokuMatrix.length; x++) {
      const colVals: SudokuMatrixCellValue[] = [];

      for (let y = 0; y < sudokuMatrix[x].length; y++) {
        const cell = sudokuMatrix[y][x];
        if (!cell.value || (cell.value && !colVals.includes(cell.value))) {
          colVals.push(cell.value);
        } else {
          return false;
        }
      }
    }

    return true;
  }, [sudokuMatrix]);

  const blocksValid = useCallback((): boolean => {
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
  }, [sudokuMatrix]);

  const isValid = useCallback(
    (): boolean => rowsValid() && colsValid() && blocksValid(),
    [blocksValid, colsValid, rowsValid]
  );

  const isComplete = useCallback(
    (): boolean =>
      sudokuMatrix.every((row) => {
        return row.every((cell) => cell.value);
      }),
    [sudokuMatrix]
  );

  const isSolved = useCallback(
    (): boolean => isComplete() && isValid(),
    [isComplete, isValid]
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

  const setInitialValues = useCallback((): void => {
    const provisionalMatrix: SudokuMatrix = [];

    sudokuMatrix.forEach((row, y) => {
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

    setSudokuMatrix(provisionalMatrix);
  }, [getPossibilities, sudokuMatrix]);

  // Esto debe en cada iteración establecer el primer valor disponible de la casilla que
  // toque y comprobar si es válido. Si lo es, se avanza a la siguiente casilla; si no,
  // se escoge el siguiente número posible de esa casilla. Si no hay más, retrocede a la
  // anterior y escoge el siguiente número posible. Así hasta resolverlo.
  const nextRound = useCallback((): void => {
    const provisionalMatrix: SudokuMatrix = [...sudokuMatrix];
    let nextCurrPosition: SudokuCellPosition;
    let nextLastAction: "forward" | "backward";

    // console.log('sudokuMatrix', sudokuMatrix);

    if (!sudokuMatrix[currPosition.y][currPosition.x].default) {
      if (sudokuMatrix[currPosition.y][currPosition.x].value) {
        if (isValid() && lastAction === 'forward') {
          // console.log('1 (isValid -> forward)');
          // Siguiente casilla
          nextCurrPosition = {
            x: currPosition.x === 8 ? 0 : currPosition.x + 1,
            y: currPosition.x === 8 ? currPosition.y + 1 : currPosition.y,
          };

          nextLastAction = "forward";
        } else {
          const newValue: number | undefined =
            sudokuMatrix[currPosition.y][currPosition.x].provValues[
              sudokuMatrix[currPosition.y][currPosition.x].provValues.findIndex(
                (provValue) =>
                  provValue ===
                  sudokuMatrix[currPosition.y][currPosition.x].value
              ) + 1
            ];

          if (newValue) {
            // console.log('2 (invalid -> assign new value');
            provisionalMatrix[currPosition.y][currPosition.x].value = newValue;

            // Misma casilla (debe comprobarse)
            nextCurrPosition = currPosition;
            nextLastAction = 'forward';
          } else {
            // console.log('3 (invalid -> no more values, backward');
            // Casilla anterior
            nextCurrPosition = {
              x: currPosition.x === 0 ? 8 : currPosition.x - 1,
              y: currPosition.x === 0 ? currPosition.y - 1 : currPosition.y,
            };

            provisionalMatrix[currPosition.y][currPosition.x].value = null;

            nextLastAction = "backward";
          }
        }
      } else {
        // console.log('4 (no value, default assigned)');
        // Siguiente casilla
        // nextCurrPosition = {
        //   x: currPosition.x === 8 ? 0 : currPosition.x + 1,
        //   y: currPosition.x === 8 ? currPosition.y + 1 : currPosition.y,
        // };

        // Misma casilla (debe comprobarse)
        nextCurrPosition = currPosition;

        provisionalMatrix[currPosition.y][currPosition.x].value =
          sudokuMatrix[currPosition.y][currPosition.x].provValues[0];

        nextLastAction = "forward";
      }
    } else {
      // let nextCurrPosition: SudokuCellPosition;

      if (lastAction === "forward") {
        // console.log('5 (default -> forward)');
        // Siguiente casilla
        nextCurrPosition = {
          x: currPosition.x === 8 ? 0 : currPosition.x + 1,
          y: currPosition.x === 8 ? currPosition.y + 1 : currPosition.y,
        };

        nextLastAction = lastAction;
      } else {
        // console.log('6 (default <- backward)');
        // Casilla anterior
        nextCurrPosition = {
          x: currPosition.x === 0 ? 8 : currPosition.x - 1,
          y: currPosition.x === 0 ? currPosition.y - 1 : currPosition.y,
        };

        nextLastAction = lastAction;
      }
    }

    setCurrPosition(nextCurrPosition);
    setSudokuMatrix(provisionalMatrix);
    setLastAction(nextLastAction);
  }, [currPosition, isValid, sudokuMatrix, lastAction]);

  const iterateSudoku = useCallback(() => {
    if (iteratorRound === 0) {
      setInitialValues();
    } else {
      nextRound();
    }

    setIteratorRound(iteratorRound + 1);
  }, [iteratorRound, setInitialValues, nextRound]);

  const solveSudoku = (): void => setUseIterator(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (useIterator) {
      timeout = setTimeout(() => {
        if (!isSolved()) iterateSudoku();
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

      <button onClick={solveSudoku}>Start iterator</button>
      <button onClick={() => setUseIterator(false)}>Stop iterator</button>
      <button onClick={() => console.log(rowsValid())}>Check</button>
    </>
  );
};

export default Sudoku;
