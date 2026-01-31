class SudokuGame {
    constructor() {
        this.grid = document.getElementById('sudokuGrid');
        this.difficultySelect = document.getElementById('difficulty');
        this.timerElement = document.getElementById('time');
        this.messageElement = document.getElementById('message');
        
        this.newGameBtn = document.getElementById('newGame');
        this.checkBtn = document.getElementById('check');
        this.resetBtn = document.getElementById('reset');
        this.numberButtons = document.querySelectorAll('.num-btn');
        
        this.selectedCell = null;
        this.startTime = null;
        this.timerInterval = null;
        this.timeElapsed = 0;
        this.solvedBoard = null;
        this.gameBoard = null;
        this.initialBoard = null;
        
        this.init();
    }
    
    init() {
        this.createGrid();
        this.setupEventListeners();
        this.startNewGame();
    }
    
    createGrid() {
        this.grid.innerHTML = '';
        for (let i = 0; i < 81; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = Math.floor(i / 9);
            cell.dataset.col = i % 9;
            cell.dataset.index = i;
            cell.addEventListener('click', () => this.selectCell(cell));
            this.grid.appendChild(cell);
        }
    }
    
    setupEventListeners() {
        this.newGameBtn.addEventListener('click', () => this.startNewGame());
        this.checkBtn.addEventListener('click', () => this.checkSolution());
        this.resetBtn.addEventListener('click', () => this.resetGame());
        
        this.difficultySelect.addEventListener('change', () => this.startNewGame());
        
        // FIXED: Add proper event listeners to number buttons
        this.numberButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const number = parseInt(e.currentTarget.dataset.number);
                this.placeNumber(number);
            });
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key >= '1' && e.key <= '9') {
                this.placeNumber(parseInt(e.key));
            } else if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
                this.placeNumber(0);
            }
        });
    }
    
    startNewGame() {
        this.stopTimer();
        this.timeElapsed = 0;
        this.timerElement.textContent = '00:00';
        this.clearMessage();
        
        this.generateSolvedSudoku();
        this.createPuzzle();
        this.startTimer();
    }
    
    generateSolvedSudoku() {
        const board = Array(9).fill().map(() => Array(9).fill(0));
        this.solveSudoku(board);
        this.solvedBoard = board;
    }
    
    solveSudoku(board) {
        const empty = this.findEmptyCell(board);
        if (!empty) return true;
        
        const [row, col] = empty;
        const numbers = this.shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        
        for (const num of numbers) {
            if (this.isValid(board, row, col, num)) {
                board[row][col] = num;
                
                if (this.solveSudoku(board)) {
                    return true;
                }
                
                board[row][col] = 0;
            }
        }
        return false;
    }
    
    findEmptyCell(board) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    return [row, col];
                }
            }
        }
        return null;
    }
    
    isValid(board, row, col, num) {
        // Check row
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num) {
                return false;
            }
        }
        
        // Check column
        for (let i = 0; i < 9; i++) {
            if (board[i][col] === num) {
                return false;
            }
        }
        
        // Check 3x3 box
        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;
        
        for (let i = boxRow; i < boxRow + 3; i++) {
            for (let j = boxCol; j < boxCol + 3; j++) {
                if (board[i][j] === num) {
                    return false;
                }
            }
        }
        
        return true;
    }
    
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    createPuzzle() {
        this.gameBoard = JSON.parse(JSON.stringify(this.solvedBoard));
        this.initialBoard = JSON.parse(JSON.stringify(this.solvedBoard));
        
        const difficulty = this.difficultySelect.value;
        let cellsToRemove;
        
        switch(difficulty) {
            case 'easy': cellsToRemove = 40; break;
            case 'medium': cellsToRemove = 50; break;
            case 'hard': cellsToRemove = 55; break;
            case 'expert': cellsToRemove = 60; break;
            default: cellsToRemove = 45;
        }
        
        let removed = 0;
        while (removed < cellsToRemove) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);
            
            if (this.gameBoard[row][col] !== 0) {
                const temp = this.gameBoard[row][col];
                this.gameBoard[row][col] = 0;
                
                if (this.hasUniqueSolution(JSON.parse(JSON.stringify(this.gameBoard)))) {
                    removed++;
                } else {
                    this.gameBoard[row][col] = temp;
                }
            }
        }
        
        this.updateGrid();
    }
    
    hasUniqueSolution(board) {
        let solutions = 0;
        
        const solve = (board) => {
            if (solutions > 1) return;
            
            const empty = this.findEmptyCell(board);
            if (!empty) {
                solutions++;
                return;
            }
            
            const [row, col] = empty;
            for (let num = 1; num <= 9 && solutions <= 1; num++) {
                if (this.isValid(board, row, col, num)) {
                    board[row][col] = num;
                    solve(board);
                    board[row][col] = 0;
                }
            }
        };
        
        solve(board);
        return solutions === 1;
    }
    
    updateGrid() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            const value = this.gameBoard[row][col];
            
            cell.textContent = value !== 0 ? value : '';
            cell.classList.toggle('fixed', this.initialBoard[row][col] !== 0);
            cell.classList.remove('error', 'selected');
        });
        this.selectedCell = null;
    }
    
    selectCell(cell) {
        // Remove selection from all cells
        document.querySelectorAll('.cell').forEach(c => {
            c.classList.remove('selected');
        });
        
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        
        // Only allow selection of empty or user-filled cells
        if (this.initialBoard[row][col] === 0) {
            cell.classList.add('selected');
            this.selectedCell = cell;
        }
    }
    
    placeNumber(number) {
        if (!this.selectedCell) {
            this.showMessage('Please select a cell first!', 'error');
            return;
        }
        
        const row = parseInt(this.selectedCell.dataset.row);
        const col = parseInt(this.selectedCell.dataset.col);
        
        // Check if it's a fixed cell (from initial puzzle)
        if (this.initialBoard[row][col] !== 0) {
            this.showMessage('Cannot modify fixed cells!', 'error');
            return;
        }
        
        // Clear the cell if number is 0
        if (number === 0) {
            this.gameBoard[row][col] = 0;
            this.selectedCell.textContent = '';
            this.selectedCell.classList.remove('error');
            this.showMessage('Cell cleared', 'info');
        } 
        // Place the number
        else {
            // Check if the move is valid
            const isValid = this.isValidMove(row, col, number);
            
            // Update the board and UI
            this.gameBoard[row][col] = number;
            this.selectedCell.textContent = number;
            
            // Style based on validity
            if (isValid) {
                this.selectedCell.classList.remove('error');
                this.showMessage(`Placed ${number}`, 'info');
            } else {
                this.selectedCell.classList.add('error');
                this.showMessage('Invalid move! This number conflicts', 'error');
            }
        }
        
        // Check if puzzle is complete and correct
        if (this.isComplete()) {
            if (this.isValidSolution()) {
                this.showMessage('🎉 Congratulations! Puzzle solved! 🎉', 'success');
                this.stopTimer();
            }
        }
    }
    
    isValidMove(row, col, num) {
        // Create a temporary copy of the board without the current cell
        const tempBoard = JSON.parse(JSON.stringify(this.gameBoard));
        tempBoard[row][col] = 0; // Remove current value to check
        
        // Check if placing num at (row, col) is valid
        return this.isValid(tempBoard, row, col, num);
    }
    
    isComplete() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (this.gameBoard[row][col] === 0) {
                    return false;
                }
            }
        }
        return true;
    }
    
    isValidSolution() {
        // Check all rows, columns, and boxes
        for (let i = 0; i < 9; i++) {
            const rowSet = new Set();
            const colSet = new Set();
            const boxRow = Math.floor(i / 3) * 3;
            const boxCol = (i % 3) * 3;
            const boxSet = new Set();
            
            for (let j = 0; j < 9; j++) {
                // Check row
                if (this.gameBoard[i][j] === 0 || rowSet.has(this.gameBoard[i][j])) {
                    return false;
                }
                rowSet.add(this.gameBoard[i][j]);
                
                // Check column
                if (this.gameBoard[j][i] === 0 || colSet.has(this.gameBoard[j][i])) {
                    return false;
                }
                colSet.add(this.gameBoard[j][i]);
                
                // Check box
                const boxCell = this.gameBoard[boxRow + Math.floor(j / 3)][boxCol + (j % 3)];
                if (boxCell === 0 || boxSet.has(boxCell)) {
                    return false;
                }
                boxSet.add(boxCell);
            }
        }
        return true;
    }
    
    checkSolution() {
        if (!this.isComplete()) {
            const emptyCells = 81 - this.gameBoard.flat().filter(cell => cell !== 0).length;
            this.showMessage(`Please fill all cells first! ${emptyCells} cells remaining.`, 'error');
            return;
        }
        
        if (this.isValidSolution()) {
            this.showMessage('✅ Perfect! Your solution is correct!', 'success');
            this.stopTimer();
        } else {
            this.showMessage('❌ There are errors in your solution. Keep trying!', 'error');
            this.highlightErrors();
        }
    }
    
    highlightErrors() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            const value = this.gameBoard[row][col];
            
            // Only highlight user-entered cells that are wrong
            if (this.initialBoard[row][col] === 0 && value !== this.solvedBoard[row][col]) {
                cell.classList.add('error');
            }
        });
    }
    
    resetGame() {
        this.gameBoard = JSON.parse(JSON.stringify(this.initialBoard));
        this.updateGrid();
        this.clearMessage();
        this.stopTimer();
        this.timeElapsed = 0;
        this.timerElement.textContent = '00:00';
        this.startTimer();
        this.showMessage('Game reset to initial state', 'info');
    }
    
    startTimer() {
        this.startTime = Date.now() - this.timeElapsed * 1000;
        this.timerInterval = setInterval(() => {
            this.timeElapsed = Math.floor((Date.now() - this.startTime) / 1000);
            const minutes = Math.floor(this.timeElapsed / 60).toString().padStart(2, '0');
            const seconds = (this.timeElapsed % 60).toString().padStart(2, '0');
            this.timerElement.textContent = `${minutes}:${seconds}`;
        }, 1000);
    }
    
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
    
    showMessage(text, type = 'info') {
        this.messageElement.textContent = text;
        this.messageElement.className = `message ${type}`;
        
        // Clear info messages after 2 seconds
        if (type === 'info') {
            setTimeout(() => this.clearMessage(), 2000);
        }
        // Clear error/success messages after 3 seconds
        else if (type !== 'info') {
            setTimeout(() => this.clearMessage(), 3000);
        }
    }
    
    clearMessage() {
        this.messageElement.textContent = '';
        this.messageElement.className = 'message';
    }
}

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new SudokuGame();
});