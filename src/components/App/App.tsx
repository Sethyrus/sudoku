import Sudoku from '../Sudoku/Sudoku';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <div className="title">
        <h1>SUDOKU</h1>
      </div>
      <Sudoku />
    </div>
  );
}

export default App;
