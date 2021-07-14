export interface SudokuCellPosition {
  x: number;
  y: number;
}

export interface SudokuCellProps
{
  cellData: SudokuMatrixCell;
  position: SudokuCellPosition;
  valueChange: (val: number) => void;
}

export interface SudokuMatrixCell
{
  value: SudokuMatrixCellValue;
  provValues: number[];
  default: boolean;
}

export type SudokuMatrix = SudokuMatrixCell[][];

export type SudokuMatrixCellValue = number | null | undefined;