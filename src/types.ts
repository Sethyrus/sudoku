export interface SudokuCellProps {
  cellData: SudokuMatrixCell;
  position: {
    x: number;
    y: number;
  };
  valueChange: (val: number) => void;
}

export interface SudokuMatrixCell {
  value: number | null;
  default?: boolean;
}

export type SudokuMatrix = SudokuMatrixCell[][];