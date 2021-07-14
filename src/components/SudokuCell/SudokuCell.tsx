import { SudokuCellProps } from "../../types";
import "./SudokuCell.css";

const SudokuCell = (props: SudokuCellProps) => {
  return (
    <div
      className={
        "sudoku-cell x-" +
        ((props.position.x + 1) % 3) +
        " y-" +
        ((props.position.y + 1) % 3)
      }
    >
      {props.cellData.default ? (
        <p className="default-value">{props.cellData.value}</p>
      ) : props.cellData.value || props.cellData.provValues.length === 0 ? (
        <input
          id={props.position.x + "-" + props.position.y}
          type="number"
          value={props.cellData.value || ""}
          onChange={(e) => props.valueChange(parseInt(e.target.value))}
          onKeyDown={(e) => {
            if (
              e.key !== "ArrowUp" &&
              e.key !== "ArrowRight" &&
              e.key !== "ArrowDown" &&
              e.key !== "ArrowLeft" &&
              e.key !== "Backspace" &&
              e.key !== "Tab" &&
              e.key !== "F12" &&
              !(parseInt(e.key) > 0 && parseInt(e.key) < 10)
            ) {
              e.preventDefault();
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              if (props.position.y > 0) {
                document
                  .getElementById(
                    props.position.x + "-" + (props.position.y - 1)
                  )
                  ?.focus();
              }
            } else if (e.key === "ArrowRight") {
              e.preventDefault();
              if (props.position.x < 9) {
                document
                  .getElementById(props.position.x + 1 + "-" + props.position.y)
                  ?.focus();
              }
            } else if (e.key === "ArrowDown") {
              e.preventDefault();
              if (props.position.y < 9) {
                document
                  .getElementById(
                    props.position.x + "-" + (props.position.y + 1)
                  )
                  ?.focus();
              }
            } else if (e.key === "ArrowLeft") {
              e.preventDefault();
              if (props.position.x > 0) {
                document
                  .getElementById(props.position.x - 1 + "-" + props.position.y)
                  ?.focus();
              }
            }
          }}
        />
      ) : (
        <p className="prov-values">
          {props.cellData.provValues.map((provValue) => (
            <span>{provValue}</span>
          ))}
        </p>
      )}
    </div>
  );
};

export default SudokuCell;
