import { SudokuMatrixCell } from "../Sudoku/Sudoku";
import "./SudokuCell.css";

interface SudokuCellProps {
  cellStatus: SudokuMatrixCell;
  position: {
    x: number;
    y: number;
  };
  valueChange: (val: number) => void;
}

const SudokuCell = (props: SudokuCellProps) => {
  return (
    <div className={"sudoku-cell"}>
      {props.cellStatus.default ? (
        <p className="default-value">{props.cellStatus.value}</p>
      ) : (
        <input
          id={props.position.x + "-" + props.position.y}
          type="number"
          value={props.cellStatus.value || ""}
          onChange={(e) => props.valueChange(parseInt(e.target.value))}
          onKeyDown={(e) => {
            e.preventDefault();

            if (e.key === 'ArrowUp') {
              if (props.position.x > 0) {
                document.getElementById((props.position.x - 1) + "-" + props.position.y)?.focus();
              }
            } else if (e.key === 'ArrowRight') {
              if (props.position.y < 9) {
                document.getElementById(props.position.x + "-" + (props.position.y + 1))?.focus();
              }
            } else if (e.key === 'ArrowDown') {
              if (props.position.x < 9) {
                document.getElementById((props.position.x + 1) + "-" + props.position.y)?.focus();
              }
            } else if (e.key === 'ArrowLeft') {
              if (props.position.y > 0) {
                document.getElementById(props.position.x + "-" + (props.position.y - 1))?.focus();
              }
            }
          }}
        />
      )}
    </div>
  );
};

export default SudokuCell;
