import { SudokuMatrixCell } from "../Sudoku/Sudoku";
import "./SudokuCell.css";

interface SudokuCellProps {
  cellStatus: SudokuMatrixCell;
  valueChange: (val: number) => void;
}

const SudokuCell = (props: SudokuCellProps) => {
  return (
    <div className="sudoku-cell">
      {props.cellStatus.default ? (
        <span className="default-value">{props.cellStatus.value}</span>
      ) : (
        <input
          type="number"
          value={props.cellStatus.value || ""}
          onChange={(e) => props.valueChange(parseInt(e.target.value))}
        />
      )}
    </div>
  );
};

export default SudokuCell;
