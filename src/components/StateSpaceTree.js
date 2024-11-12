import React from "react";

const StateSpaceTree = ({ currentState, boardSize, exploredPath = [] }) => {
  const nodeRadius = 20;
  const levelGap = 80;
  const siblingGap = boardSize <= 8 ? 60 : 40;

  const width = siblingGap * Math.pow(boardSize, 2);
  const height = levelGap * (boardSize + 1);

  // Function to determine node status
  const getNodeStatus = (level, position) => {
    const isCurrent =
      currentState.col === level && currentState.row === position;
    const isExplored = exploredPath.some(
      (path) => path.col === level && path.row === position
    );
    const isPartOfSolution = exploredPath.some(
      (path) => path.col === level && path.row === position && path.isSolution
    );

    return {
      isCurrent,
      isExplored,
      isPartOfSolution,
    };
  };

  const getNodeStyle = (status) => {
    if (status.isCurrent) {
      return {
        fill: "#6610f2",
        stroke: "#6610f2",
        textColor: "white",
      };
    }
    if (status.isPartOfSolution) {
      return {
        fill: "#28a745", // Green color for solution path
        stroke: "#28a745",
        textColor: "black",
      };
    }
    if (status.isExplored) {
      return {
        fill: "#ffc107", // Yellow color for explored nodes
        stroke: "#ffc107",
        textColor: "white",
      };
    }
    return {
      fill: "white",
      stroke: "#ddd",
      textColor: "black",
    };
  };

  const getNodeKey = (level, position) => `node-${level}-${position}`;

  const renderNode = (level, position) => {
    const x =
      (position - Math.min(boardSize, Math.pow(boardSize, level)) / 2) *
        siblingGap +
      width / 2;
    const y = level * levelGap + nodeRadius;

    const nodeStatus = getNodeStatus(level, position);
    const style = getNodeStyle(nodeStatus);

    return (
      <g key={getNodeKey(level, position)}>
        {level > 0 && (
          <line
            x1={x}
            y1={y}
            x2={width / 2}
            y2={(level - 1) * levelGap + nodeRadius * 2}
            stroke={nodeStatus.isPartOfSolution ? style.stroke : "#ddd"}
            strokeWidth={nodeStatus.isPartOfSolution ? "2" : "1"}
            strokeDasharray={nodeStatus.isPartOfSolution ? "none" : "4"}
          />
        )}
        <circle
          cx={x + 20}
          cy={y}
          r={nodeRadius}
          fill={style.fill}
          stroke={style.stroke}
          strokeWidth="2"
        />
        <text
          x={x + 20}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={style.textColor}
          fontSize="12px"
        >
          {`${position + 1}`}
        </text>
      </g>
    );
  };

  const renderLevel = (level) => {
    const nodesInLevel = Math.min(boardSize, level === 0 ? 1 : boardSize);
    return Array.from({ length: nodesInLevel }, (_, i) => renderNode(level, i));
  };

  // Find the solution path
  const solutionPath = exploredPath.filter((path) => path.isSolution);

  return (
    <div
      className="state-space-tree-container"
      style={{ width: "100%", marginTop: "20px" }}
    >
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">State Space Tree</h5>
        </div>
        <div className="card-body" style={{ overflowX: "auto" }}>
          <svg
            width="100%"
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
            style={{
              border: "1px solid #ddd",
              borderRadius: "4px",
              background: "#f8f9fa",
            }}
          >
            {Array.from({ length: boardSize }, (_, i) => (
              <g key={`level-${i}`}>{renderLevel(i)}</g>
            ))}
          </svg>

          <div className="text-center mt-3">
            <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap">
              <div className="d-flex align-items-center">
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    border: "2px solid #ddd",
                    marginRight: "8px",
                  }}
                ></div>
                <span>Unexplored</span>
              </div>
              <div className="d-flex align-items-center">
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: "#ffc107", // Yellow for explored
                    marginRight: "8px",
                  }}
                ></div>
                <span>Explored</span>
              </div>
              <div className="d-flex align-items-center">
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: "#28a745", // Green for solution path
                    marginRight: "8px",
                  }}
                ></div>
                <span>Solution Path</span>
              </div>

              <div className="d-flex align-items-center">
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: "#5d00ff",
                    marginRight: "8px",
                  }}
                ></div>
                <span>Current Node</span>
              </div>
            </div>
            <small className="text-muted mt-2 d-block">
              Numbers indicate queen position in each row
            </small>
          </div>

          {/* Explanation for each level */}
          <div className="mt-4">
            {Array.from({ length: boardSize }, (_, i) => (
              <p key={`explanation-${i}`} className="text-muted">
                <strong>Level {i + 1}:</strong> Attempting to place a queen in
                row {i + 1}.
              </p>
            ))}
          </div>

          {/* Explored Paths */}
          <div className="mt-4">
            <h5 className="text-primary">Explored Paths:</h5>
            <ul className="text-muted">
              {exploredPath.map((path, index) => (
                <li key={`path-${index}`}>
                  {path.isSolution ? (
                    <span className="text-success fw-bold">
                      Solution Path:{" "}
                    </span>
                  ) : (
                    <span>Explored Path: </span>
                  )}
                  [{path.col + 1}, {path.row + 1}]
                </li>
              ))}
            </ul>
          </div>

          {/* Solution Path Visualization */}
          <div className="mt-4">
            <h5 className="text-primary">Solution Path:</h5>
            <div className="d-flex flex-wrap justify-content-center">
              {Array.from(
                new Map(solutionPath.map((path) => [path.col, path])).values()
              ).map((path, index) => (
                <div
                  key={`solution-path-${index}`}
                  className="d-flex align-items-center mx-2 mb-2"
                >
                  {path.col > 0 && (
                    <div className="me-2">
                      <svg width="30" height="30" viewBox="0 0 30 30">
                        <polyline
                          points="10,15 20,15"
                          stroke="#f8d7da"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      backgroundColor: "#f8d7da",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    {path.row + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StateSpaceTree;
