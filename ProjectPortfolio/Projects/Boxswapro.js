
        // Game State
        let gameState = {
            moves: 0,
            startTime: null,
            timer: null,
            elapsedTime: 0,
            mode: 'drag',
            pattern: 'normal',
            gridSize: 4,
            animationSpeed: 'medium',
            selectedBox: null,
            isSolved: false,
            moveHistory: []
        };
        
        // Colors for boxes
        const colorPalettes = {
            rainbow: ['#FF6B6B', '#FF8E53', '#FFD166', '#06D6A0', '#118AB2', '#7209B7'],
            pastel: ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#D0BAFF'],
            vibrant: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF']
        };
        
        // Initialize game
        initGame();
        
        function initGame() {
            const swapArea = document.getElementById('swapArea');
            swapArea.innerHTML = '';
            
            // Set grid size
            swapArea.style.gridTemplateColumns = `repeat(${gameState.gridSize}, 1fr)`;
            swapArea.style.gridTemplateRows = `repeat(${gameState.gridSize}, 1fr)`;
            
            // Create boxes
            const totalBoxes = gameState.gridSize * gameState.gridSize;
            for (let i = 0; i < totalBoxes; i++) {
                const box = document.createElement('div');
                box.className = 'box';
                box.id = `box-${i}`;
                box.dataset.id = i;
                box.dataset.correctPosition = i;
                
                // Calculate position in grid
                const row = Math.floor(i / gameState.gridSize);
                const col = i % gameState.gridSize;
                box.style.gridArea = `${row + 1} / ${col + 1}`;
                
                // Set color based on pattern
                const color = getBoxColor(i);
                box.style.background = color;
                
                // Box content
                box.innerHTML = `
                    <div class="grid-lines"></div>
                    <div class="box-number">${i + 1}</div>
                    <div class="box-content"><i class="fas fa-cube"></i></div>
                    <div class="box-label">Pos ${row + 1},${col + 1}</div>
                `;
                
                // Add event listeners based on mode
                setupBoxEvents(box);
                
                swapArea.appendChild(box);
            }
            
            // Start timer
            startTimer();
            updateStats();
        }
        
        function getBoxColor(index) {
            const colors = colorPalettes.rainbow;
            const colorIndex = index % colors.length;
            return colors[colorIndex];
        }
        
        function setupBoxEvents(box) {
            // Remove all event listeners first
            box.replaceWith(box.cloneNode(true));
            const newBox = document.getElementById(box.id);
            
            if (gameState.mode === 'drag') {
                // Drag and drop mode
                newBox.setAttribute('draggable', 'true');
                newBox.addEventListener('dragstart', handleDragStart);
                newBox.addEventListener('dragover', handleDragOver);
                newBox.addEventListener('drop', handleDrop);
                newBox.addEventListener('dragend', handleDragEnd);
            } else if (gameState.mode === 'click') {
                // Click to select and swap mode
                newBox.addEventListener('click', handleBoxClick);
            }
        }
        
        // Drag and drop handlers
        function handleDragStart(e) {
            this.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', this.id);
        }
        
        function handleDragOver(e) {
            e.preventDefault();
            this.classList.add('drop-target');
        }
        
        function handleDrop(e) {
            e.preventDefault();
            this.classList.remove('drop-target');
            
            const draggedId = e.dataTransfer.getData('text/plain');
            const draggedBox = document.getElementById(draggedId);
            const targetBox = this;
            
            if (draggedBox !== targetBox) {
                swapBoxes(draggedBox, targetBox);
                addToHistory(draggedBox, targetBox);
            }
        }
        
        function handleDragEnd(e) {
            this.classList.remove('dragging');
            document.querySelectorAll('.box').forEach(box => {
                box.classList.remove('drop-target');
            });
        }
        
        // Click mode handler
        function handleBoxClick() {
            if (gameState.selectedBox === null) {
                // First selection
                gameState.selectedBox = this;
                this.classList.add('drop-target');
            } else if (gameState.selectedBox === this) {
                // Deselect
                gameState.selectedBox.classList.remove('drop-target');
                gameState.selectedBox = null;
            } else {
                // Second selection - swap
                const box1 = gameState.selectedBox;
                const box2 = this;
                
                swapBoxes(box1, box2);
                addToHistory(box1, box2);
                
                box1.classList.remove('drop-target');
                gameState.selectedBox = null;
            }
        }
        
        // Swap boxes with animation
        function swapBoxes(box1, box2) {
            if (gameState.isSolved) return;
            
            // Get current grid positions
            const pos1 = box1.style.gridArea;
            const pos2 = box2.style.gridArea;
            
            // Swap positions
            box1.style.gridArea = pos2;
            box2.style.gridArea = pos1;
            
            // Add animation
            const animationClass = getAnimationClass();
            box1.classList.add(animationClass);
            box2.classList.add(animationClass);
            
            setTimeout(() => {
                box1.classList.remove(animationClass);
                box2.classList.remove(animationClass);
            }, getAnimationDuration());
            
            // Update game state
            gameState.moves++;
            updateStats();
            checkSolution();
        }
        
        function getAnimationClass() {
            return gameState.animationSpeed === 'fast' ? 'swap-animation' : 'swap-animation';
        }
        
        function getAnimationDuration() {
            switch(gameState.animationSpeed) {
                case 'slow': return 800;
                case 'fast': return 400;
                default: return 600;
            }
        }
        
        // Game controls
        function setMode(mode) {
            gameState.mode = mode;
            
            // Update UI
            document.querySelectorAll('.mode-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
            
            // Re-setup box events
            document.querySelectorAll('.box').forEach(box => {
                setupBoxEvents(box);
            });
        }
        
        function setPattern(pattern) {
            gameState.pattern = pattern;
            
            // Update UI
            document.querySelectorAll('.pattern-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
            
            // Apply pattern
            applyPattern(pattern);
        }
        
        function applyPattern(pattern) {
            const boxes = document.querySelectorAll('.box');
            
            boxes.forEach((box, index) => {
                let newPos;
                switch(pattern) {
                    case 'normal':
                        newPos = index;
                        break;
                    case 'checker':
                        newPos = (index % 2 === 0) ? index + 1 : index - 1;
                        if (newPos < 0 || newPos >= boxes.length) newPos = index;
                        break;
                    case 'spiral':
                        // Simple spiral pattern
                        newPos = (index + Math.floor(gameState.gridSize / 2)) % boxes.length;
                        break;
                    case 'diagonal':
                        const row = Math.floor(index / gameState.gridSize);
                        const col = index % gameState.gridSize;
                        newPos = col * gameState.gridSize + row;
                        break;
                    case 'random':
                        newPos = Math.floor(Math.random() * boxes.length);
                        break;
                    default:
                        newPos = index;
                }
                
                const newRow = Math.floor(newPos / gameState.gridSize);
                const newCol = newPos % gameState.gridSize;
                box.style.gridArea = `${newRow + 1} / ${newCol + 1}`;
            });
            
            gameState.moves++;
            updateStats();
        }
        
        function shuffleBoxes() {
            const boxes = Array.from(document.querySelectorAll('.box'));
            const positions = boxes.map(box => box.style.gridArea);
            
            // Fisher-Yates shuffle
            for (let i = positions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [positions[i], positions[j]] = [positions[j], positions[i]];
            }
            
            // Apply shuffled positions
            boxes.forEach((box, index) => {
                box.style.gridArea = positions[index];
            });
            
            gameState.moves = 0;
            gameState.isSolved = false;
            updateStats();
        }
        
        function solvePuzzle() {
            const boxes = document.querySelectorAll('.box');
            
            boxes.forEach((box, index) => {
                const row = Math.floor(index / gameState.gridSize);
                const col = index % gameState.gridSize;
                box.style.gridArea = `${row + 1} / ${col + 1}`;
                box.dataset.correctPosition = index;
            });
            
            gameState.isSolved = true;
            showVictory();
        }
        
        function resetGame() {
            gameState.moves = 0;
            gameState.elapsedTime = 0;
            gameState.moveHistory = [];
            gameState.isSolved = false;
            
            stopTimer();
            startTimer();
            initGame();
            updateHistory();
        }
        
        function hint() {
            const boxes = document.querySelectorAll('.box');
            const incorrectBoxes = Array.from(boxes).filter((box, index) => {
                const currentPos = box.style.gridArea;
                const [row, col] = currentPos.split(' / ').map(x => parseInt(x));
                const currentIndex = (row - 1) * gameState.gridSize + (col - 1);
                return currentIndex !== parseInt(box.dataset.correctPosition);
            });
            
            if (incorrectBoxes.length > 0) {
                const box = incorrectBoxes[0];
                box.classList.add('swap-animation');
                setTimeout(() => box.classList.remove('swap-animation'), 600);
            }
        }
        
        function changeGridSize() {
            gameState.gridSize = parseInt(document.getElementById('gridSize').value);
            resetGame();
        }
        
        function changeAnimationSpeed() {
            gameState.animationSpeed = document.getElementById('animationSpeed').value;
        }
        
        // Game logic
        function checkSolution() {
            const boxes = document.querySelectorAll('.box');
            let isCorrect = true;
            
            boxes.forEach((box, index) => {
                const currentPos = box.style.gridArea;
                const [row, col] = currentPos.split(' / ').map(x => parseInt(x));
                const currentIndex = (row - 1) * gameState.gridSize + (col - 1);
                
                if (currentIndex === parseInt(box.dataset.correctPosition)) {
                    box.classList.add('correct');
                } else {
                    box.classList.remove('correct');
                    isCorrect = false;
                }
            });
            
            if (isCorrect && !gameState.isSolved) {
                gameState.isSolved = true;
                showVictory();
            }
        }
        
        function showVictory() {
            document.querySelectorAll('.box').forEach(box => {
                box.classList.add('victory-animation');
            });
            
            setTimeout(() => {
                alert(`🎉 Puzzle Solved!\nMoves: ${gameState.moves}\nTime: ${formatTime(gameState.elapsedTime)}`);
                document.querySelectorAll('.box').forEach(box => {
                    box.classList.remove('victory-animation');
                });
            }, 1000);
        }
        
        // History functions
        function addToHistory(box1, box2) {
            const move = {
                box1: box1.querySelector('.box-number').textContent,
                box2: box2.querySelector('.box-number').textContent,
                time: gameState.elapsedTime
            };
            
            gameState.moveHistory.push(move);
            updateHistory();
        }
        
        function updateHistory() {
            const historyList = document.getElementById('historyList');
            historyList.innerHTML = '';
            
            const recentMoves = gameState.moveHistory.slice(-10).reverse();
            
            recentMoves.forEach(move => {
                const item = document.createElement('div');
                item.className = 'history-item';
                item.innerHTML = `
                    <i class="fas fa-exchange-alt"></i>
                    Box ${move.box1} ↔ Box ${move.box2}
                    <span style="float: right; color: #aaa;">${formatTime(move.time)}</span>
                `;
                historyList.appendChild(item);
            });
        }
        
        // Timer functions
        function startTimer() {
            gameState.startTime = Date.now();
            gameState.timer = setInterval(() => {
                gameState.elapsedTime = Math.floor((Date.now() - gameState.startTime) / 1000);
                updateStats();
            }, 1000);
        }
        
        function stopTimer() {
            if (gameState.timer) {
                clearInterval(gameState.timer);
            }
        }
        
        function formatTime(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        
        // Stats update
        function updateStats() {
            document.getElementById('movesCount').textContent = gameState.moves;
            document.getElementById('timeCount').textContent = formatTime(gameState.elapsedTime);
            
            const totalBoxes = gameState.gridSize * gameState.gridSize;
            const correctBoxes = document.querySelectorAll('.box.correct').length;
            const accuracy = totalBoxes > 0 ? Math.round((correctBoxes / totalBoxes) * 100) : 100;
            document.getElementById('accuracyRate').textContent = `${accuracy}%`;
        }
    