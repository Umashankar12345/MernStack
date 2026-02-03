 
        // State
        let selectedBoxes = [];
        let swapCount = 0;
        let correctOrderCount = 0;
        let swapHistory = [];
        let boxes = [];
        let originalPositions = [];
        let isDragging = false;
        let dragSrcEl = null;
        
        // Colors for boxes
        const boxColors = [
            '#FF6B6B', '#4ECDC4', '#FFD166', '#06D6A0', '#118AB2',
            '#EF476F', '#073B4C', '#7209B7', '#3A86FF', '#FB5607'
        ];
        
        // Icons for boxes
        const boxIcons = [
            'fa-star', 'fa-heart', 'fa-gem', 'fa-moon', 'fa-sun',
            'fa-cloud', 'fa-bolt', 'fa-snowflake', 'fa-leaf', 'fa-fire'
        ];
        
        // Initialize
        initBoxes();
        
        function initBoxes() {
            const swapArea = document.getElementById('swapArea');
            swapArea.innerHTML = '';
            boxes = [];
            selectedBoxes = [];
            
            for (let i = 0; i < 9; i++) {
                const box = document.createElement('div');
                box.className = 'box';
                box.id = `box-${i}`;
                box.dataset.index = i;
                box.dataset.originalIndex = i;
                box.style.background = boxColors[i];
                box.style.gridArea = `area-${i}`;
                
                box.innerHTML = `
                    <div class="box-label">Box ${i + 1}</div>
                    <div class="box-content">
                        <i class="fas ${boxIcons[i]}"></i>
                    </div>
                `;
                
                // Click selection
                box.addEventListener('click', function(e) {
                    if (e.ctrlKey || e.metaKey) {
                        // Multi-select with Ctrl/Cmd
                        toggleBoxSelection(this);
                    } else {
                        // Single select or swap
                        handleBoxClick(this);
                    }
                });
                
                // Drag and drop
                box.setAttribute('draggable', 'true');
                box.addEventListener('dragstart', handleDragStart);
                box.addEventListener('dragover', handleDragOver);
                box.addEventListener('drop', handleDrop);
                box.addEventListener('dragend', handleDragEnd);
                
                swapArea.appendChild(box);
                boxes.push(box);
                originalPositions.push({
                    id: box.id,
                    index: i,
                    position: `area-${i}`
                });
            }
            
            updateStats();
        }
        
        // Box selection functions
        function handleBoxClick(box) {
            if (selectedBoxes.length === 0) {
                // First selection
                selectBox(box);
            } else if (selectedBoxes.length === 1 && selectedBoxes[0] !== box) {
                // Second selection - swap
                selectBox(box);
                swapSelected();
            } else if (selectedBoxes.includes(box)) {
                // Deselect if already selected
                deselectBox(box);
            } else {
                // Replace selection
                deselectAll();
                selectBox(box);
            }
        }
        
        function toggleBoxSelection(box) {
            if (selectedBoxes.includes(box)) {
                deselectBox(box);
            } else {
                selectBox(box);
            }
        }
        
        function selectBox(box) {
            box.classList.add('selected');
            selectedBoxes.push(box);
            updateSwapButton();
            updateStats();
        }
        
        function deselectBox(box) {
            box.classList.remove('selected');
            selectedBoxes = selectedBoxes.filter(b => b !== box);
            updateSwapButton();
            updateStats();
        }
        
        function deselectAll() {
            selectedBoxes.forEach(box => box.classList.remove('selected'));
            selectedBoxes = [];
            updateSwapButton();
            updateStats();
        }
        
        // Swap functions
        function swapSelected() {
            if (selectedBoxes.length !== 2) return;
            
            const [box1, box2] = selectedBoxes;
            swapBoxes(box1, box2);
            addToHistory(box1, box2);
            
            selectedBoxes = [];
            updateSwapButton();
            checkCorrectOrder();
        }
        
        function swapBoxes(box1, box2) {
            // Get current grid positions
            const pos1 = box1.style.gridArea;
            const pos2 = box2.style.gridArea;
            
            // Animate swap
            box1.classList.add('swap-animation');
            box2.classList.add('swap-animation');
            
            setTimeout(() => {
                // Swap positions
                box1.style.gridArea = pos2;
                box2.style.gridArea = pos1;
                
                // Update data
                const tempIndex = box1.dataset.index;
                box1.dataset.index = box2.dataset.index;
                box2.dataset.index = tempIndex;
                
                // Remove animation class
                setTimeout(() => {
                    box1.classList.remove('swap-animation');
                    box2.classList.remove('swap-animation');
                    box1.classList.remove('selected');
                    box2.classList.remove('selected');
                }, 300);
            }, 400);
            
            swapCount++;
            updateStats();
        }
        
        // Drag and drop functions
        function handleDragStart(e) {
            this.style.opacity = '0.4';
            dragSrcEl = this;
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', this.innerHTML);
        }
        
        function handleDragOver(e) {
            if (e.preventDefault) {
                e.preventDefault();
            }
            this.classList.add('drag-over');
            return false;
        }
        
        function handleDrop(e) {
            e.stopPropagation();
            e.preventDefault();
            
            if (dragSrcEl !== this) {
                swapBoxes(dragSrcEl, this);
                addToHistory(dragSrcEl, this);
                checkCorrectOrder();
            }
            
            this.classList.remove('drag-over');
            return false;
        }
        
        function handleDragEnd(e) {
            this.style.opacity = '1';
            document.querySelectorAll('.box').forEach(box => {
                box.classList.remove('drag-over');
            });
        }
        
        // Control functions
        function resetPositions() {
            boxes.forEach(box => {
                const original = originalPositions.find(p => p.id === box.id);
                if (original) {
                    box.style.gridArea = original.position;
                    box.dataset.index = original.index;
                }
                box.classList.remove('selected');
            });
            
            selectedBoxes = [];
            updateSwapButton();
            checkCorrectOrder();
        }
        
        function shuffleBoxes() {
            // Get all positions
            const positions = boxes.map(box => box.style.gridArea);
            
            // Shuffle positions using Fisher-Yates algorithm
            for (let i = positions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [positions[i], positions[j]] = [positions[j], positions[i]];
            }
            
            // Apply shuffled positions
            boxes.forEach((box, index) => {
                box.style.gridArea = positions[index];
                box.dataset.index = index;
            });
            
            deselectAll();
            checkCorrectOrder();
        }
        
        function undoSwap() {
            if (swapHistory.length === 0) return;
            
            const lastSwap = swapHistory.pop();
            swapBoxes(lastSwap.box1, lastSwap.box2);
            
            // Remove from history array
            swapHistory = swapHistory.slice(0, -1);
            updateHistoryDisplay();
            updateUndoButton();
        }
        
        // History functions
        function addToHistory(box1, box2) {
            const historyEntry = {
                box1: { id: box1.id, label: box1.querySelector('.box-label').textContent },
                box2: { id: box2.id, label: box2.querySelector('.box-label').textContent },
                timestamp: new Date().toLocaleTimeString()
            };
            
            swapHistory.push(historyEntry);
            updateHistoryDisplay();
            updateUndoButton();
        }
        
        function updateHistoryDisplay() {
            const historyList = document.getElementById('historyList');
            historyList.innerHTML = '';
            
            // Show last 5 swaps
            const recentHistory = swapHistory.slice(-5).reverse();
            
            recentHistory.forEach(entry => {
                const historyItem = document.createElement('div');
                historyItem.className = 'history-item';
                historyItem.innerHTML = `
                    <i class="fas fa-exchange-alt"></i>
                    ${entry.box1.label} ↔ ${entry.box2.label}
                    <span style="float: right; color: #aaa; font-size: 0.8em;">${entry.timestamp}</span>
                `;
                historyList.appendChild(historyItem);
            });
        }
        
        function updateUndoButton() {
            const undoBtn = document.getElementById('undoBtn');
            undoBtn.disabled = swapHistory.length === 0;
        }
        
        // Utility functions
        function updateSwapButton() {
            const swapBtn = document.getElementById('swapBtn');
            swapBtn.disabled = selectedBoxes.length !== 2;
        }
        
        function checkCorrectOrder() {
            correctOrderCount = 0;
            boxes.forEach(box => {
                if (parseInt(box.dataset.index) === parseInt(box.dataset.originalIndex)) {
                    correctOrderCount++;
                }
            });
            updateStats();
        }
        
        function updateStats() {
            document.getElementById('swapCount').textContent = swapCount;
            document.getElementById('selectedCount').textContent = selectedBoxes.length;
            document.getElementById('correctCount').textContent = `${correctOrderCount}/${boxes.length}`;
        }
        
        // Initialize
        updateSwapButton();
        updateUndoButton();
        checkCorrectOrder();
    