import React, { useEffect, useState } from "react";
import "./Chess.css";
import Board from "./Board";
import StateSpaceTree from "./StateSpaceTree";
import solvePuzzle from "./Algorithm";

const Chess = () => {
  const [board, setBoard] = useState([]);
  const [boardSize, setBoardSize] = useState(8);
  const [animationSpeed, setAnimationSpeed] = useState(50);
  const [solutions, setSolutions] = useState(null);
  const [theme, setTheme] = useState("dark");
  const [currentState, setCurrentState] = useState({ row: 0, col: 0 });
  const [exploredPath, setExploredPath] = useState([]);

  function switchTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }

  function resetBoard() {
    const squares = Array(boardSize).fill().map((_, i) => 
      Array(boardSize).fill().map((_, j) => ({
        row: i,
        col: j,
        background: (i + j) % 2,
        hasQueen: false,
        isActive: false,
        id: `${i}, ${j}`
      }))
    );
    setBoard(squares);
    setSolutions(null);
    setCurrentState({ row: 0, col: 0 });
  }

  useEffect(() => {
    resetBoard();
  }, [boardSize]); // eslint-disable-line react-hooks/exhaustive-deps

  function getRandomIndex(max) {
    return Math.floor(Math.random() * (max + 1));
  }

  function toggleDisabled(disabledValue) {
    const btnsAndInputs = document.querySelectorAll(".toggle-disabled");
    btnsAndInputs.forEach(element => {
      element.disabled = disabledValue;
    });
  }

  function solveNQueen() {
    if (!solutions) {
      const resultsAndAnimations = solvePuzzle(board);
      setSolutions(resultsAndAnimations);
      const results = resultsAndAnimations.results;
      const randomResult = results[getRandomIndex(results.length - 1)];
      setBoard(randomResult);
    } else {
      const results = solutions.results;
      let finalBoard;
      do {
        finalBoard = results[getRandomIndex(results.length - 1)];
      } while (finalBoard === board);
      setBoard(finalBoard);
    }
  }

  function visualize() {
    let animations = [];
    if (!solutions) {
      const resultsAndAnimations = solvePuzzle(board);
      setSolutions(resultsAndAnimations);
      animations = resultsAndAnimations.animations;
    } else {
      animations = solutions.animations;
    }
    
    toggleDisabled(true);
    animations.forEach((animation, i) => {
      setTimeout(() => {
        setBoard(animation.board);
        setCurrentState(animation.state);
        setExploredPath(animation.exploredPath || []);
      }, i * animationSpeed);
    });
    
    setTimeout(() => {
      toggleDisabled(false);
    }, animations.length * animationSpeed);
  }

  return (
    <div className="theme" data-theme={theme}>
      <nav className="navbar navbar-dark">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">N-Queen</span>
          <span
            className="theme-icon text-warning h4 mb-0"
            onClick={switchTheme}
          >
            {theme === "light" ? (
              <i className="bi bi-moon-stars"></i>
            ) : (
              <i className="bi bi-brightness-high"></i>
            )}
          </span>
        </div>
      </nav>

      <div className="d-sm-flex p-1 justify-content-around align-items-center text-center input-bar">
        <button
          className="btn btn-dark mx-auto toggle-disabled"
          onClick={resetBoard}
        >
          Clear
        </button>

        <div className="form-control m-auto" style={{ maxWidth: 250 }}>
          <label htmlFor="customRange1" className="form-label">
            <span className="text-primary">Animation Delay: </span>
            <span className="font-weight-bold text-success">
              {`${animationSpeed} ms`}
            </span>
          </label>
          <input
            type="range"
            className="form-range toggle-disabled"
            min="1"
            max="1000"
            step="1"
            id="customRange1"
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(Number(e.target.value))}
          />
        </div>

        <div className="form-control m-auto" style={{ maxWidth: 250 }}>
          <label htmlFor="customRange2" className="form-label">
            <span className="text-primary">Size of Board: </span>
            <span className="font-weight-bold text-success">
              {`${boardSize} x ${boardSize}`}
            </span>
          </label>
          <input
            type="range"
            className="form-range toggle-disabled"
            min="4"
            max="12"
            step="1"
            id="customRange2"
            value={boardSize}
            onChange={(e) => setBoardSize(Number(e.target.value))}
          />
        </div>

        <button
          className="btn btn-success mx-2 mx-sm-auto toggle-disabled"
          onClick={solveNQueen}
        >
          Solve
        </button>

        <button
          className="btn btn-dark mx-2 mx-sm-auto toggle-disabled"
          onClick={visualize}
        >
          Visualize
        </button>
      </div>

      <div className="container-fluid mt-sm-4">
        <div className="row">
          <div className="col-md-6">
            <Board board={board} />
          </div>
          <div className="col-md-6">
          <StateSpaceTree 
            currentState={currentState}
            boardSize={boardSize}
            exploredPath={exploredPath}
          />
          </div>
        </div>
      </div>
      
      <div className="possible-solutions text-center mt-sm-2">
        {solutions && (
          <span className="h4">
            Possible solutions: {solutions.results.length}
          </span>
        )}
      </div>
    </div>
  );
};

export default Chess;