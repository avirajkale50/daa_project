# N-Queen Visualizer

Visualization of the N-Queens problem, created as part of the Data Structures and Algorithms course for B.E. (Computer) Second Year, Second Part.

## Project Overview

The N-Queens problem involves placing N queens on an N×N chessboard so that no two queens threaten each other. This visualization showcases the backtracking solution for the problem, allowing users to see the algorithm in action step-by-step.

### Key Features
- **Algorithmic Approach**: Solves the N-Queens problem using Depth-First Search (DFS), recursion, and backtracking.
- **Interactive Visualization**: Highlights queen placements and constraints in real-time.
- **Educational Tool**: Helps students and enthusiasts understand backtracking through a visual approach.

## Installation

To run this app locally:

1. Clone this repository:
   ```bash
   git clone https://github.com/Abhi6722/N-Queen-Visualizer.git
   ```
2. Change to the project directory:
   ```bash
   cd N-Queen-Visualizer
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## How to Use

- Select the size of the board (N) to visualize the solution.
- Watch as the algorithm places queens step-by-step, highlighting invalid and valid moves.
  
## Technologies Used
- **React**: For building the interactive front end.
- **JavaScript**: For implementing the backtracking algorithm.
- **CSS**: For styling the visualization and highlighting moves.

## Project Structure

- **`src`**: Contains all source code files.
  - **`components`**: Holds React components for the board and visualization.
  - **`utils`**: Contains helper functions for the algorithm.
  - **`App.js`**: Main application file, rendering the board and control interface.

## Algorithm Details

The backtracking algorithm attempts to place queens on the board by:
1. Trying to place a queen in each column of a row.
2. Using DFS and recursion to explore all potential solutions.
3. Backtracking when a queen placement leads to conflicts.
