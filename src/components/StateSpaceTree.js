import React from 'react';

const StateSpaceTree = ({ currentState, boardSize, exploredPath = [] }) => {
  const nodeRadius = 20;
  const levelGap = 80;
  const siblingGap = boardSize <= 8 ? 60 : 40;
  
  const width = siblingGap * Math.pow(boardSize, 2);
  const height = levelGap * 4; // 4 levels total
  
  // Function to determine node status
  const getNodeStatus = (level, position) => {
    const isCurrent = currentState.col === level && currentState.row === position;
    const isExplored = exploredPath.some(
      path => path.col === level && path.row === position
    );
    const isPartOfSolution = exploredPath.some(
      path => path.col === level && path.row === position && path.isSolution
    );

    return {
      isCurrent,
      isExplored,
      isPartOfSolution
    };
  };

  const getNodeStyle = (status) => {
    if (status.isCurrent) {
      return {
        fill: '#6610f2',
        stroke: '#6610f2',
        textColor: 'white'
      };
    }
    if (status.isPartOfSolution) {
      return {
        fill: '#28a745',
        stroke: '#28a745',
        textColor: 'white'
      };
    }
    if (status.isExplored) {
      return {
        fill: '#ffc107',
        stroke: '#ffc107',
        textColor: 'black'
      };
    }
    return {
      fill: 'white',
      stroke: '#333',
      textColor: 'black'
    };
  };

  const getNodeKey = (level, position) => `node-${level}-${position}`;

  const renderNode = (level, position) => {
    const x = (position - (Math.min(boardSize, Math.pow(boardSize, level)) / 2)) * siblingGap + width / 2;
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
            stroke={nodeStatus.isExplored ? style.stroke : '#ddd'}
            strokeWidth={nodeStatus.isExplored ? "2" : "1"}
            strokeDasharray={nodeStatus.isExplored ? "none" : "4"}
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
          {`${position}`}
        </text>
      </g>
    );
  };

  const renderLevel = (level) => {
    const nodesInLevel = Math.min(boardSize, level === 0 ? 1 : boardSize);
    return Array.from({ length: nodesInLevel }, (_, i) => renderNode(level, i));
  };

  return (
    <div className="state-space-tree-container" style={{ width: '100%', marginTop: '20px'}}>
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">State Space Tree</h5>
        </div>
        <div className="card-body" style={{ overflowX: 'auto' }}>
          <svg
            width="100%"
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
            style={{ 
              border: '1px solid #ddd',
              borderRadius: '4px',
              background: '#f8f9fa'
            }}
          >
            {Array.from({ length: 4 }, (_, i) => (
              <g key={`level-${i}`}>
                {renderLevel(i)}
              </g>
            ))}
          </svg>
          
          <div className="text-center mt-3">
            <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap">
              <div className="d-flex align-items-center">
                <div style={{ 
                  width: '20px', 
                  height: '20px', 
                  borderRadius: '50%', 
                  border: '2px solid #333',
                  marginRight: '8px' 
                }}></div>
                <span>Unexplored</span>
              </div>
              <div className="d-flex align-items-center">
                <div style={{ 
                  width: '20px', 
                  height: '20px', 
                  borderRadius: '50%', 
                  backgroundColor: '#ffc107',
                  marginRight: '8px' 
                }}></div>
                <span>Explored</span>
              </div>
              <div className="d-flex align-items-center">
                <div style={{ 
                  width: '20px', 
                  height: '20px', 
                  borderRadius: '50%', 
                  backgroundColor: '#6610f2',
                  marginRight: '8px' 
                }}></div>
                <span>Current Position</span>
              </div>
              <div className="d-flex align-items-center">
                <div style={{ 
                  width: '20px', 
                  height: '20px', 
                  borderRadius: '50%', 
                  backgroundColor: '#28a745',
                  marginRight: '8px' 
                }}></div>
                <span>Solution Path</span>
              </div>
            </div>
            <small className="text-muted mt-2 d-block">
              Numbers indicate queen position in each row
            </small>
          </div>
          
          {/* Explanation for each level */}
          <div className="mt-4">
            {Array.from({ length: 4 }, (_, i) => (
              <p key={`explanation-${i}`} className="text-muted">
                <strong>Level {i + 1}:</strong> Attempting to place a queen in row {i + 1}.
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StateSpaceTree;
