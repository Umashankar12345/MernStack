
        // State
        let clickCount = 0;
        let colorChanges = 0;
        let uniqueColors = new Set();
        let colorHistory = [];
        let currentMode = 'random';
        let isRainbowActive = false;
        let rainbowInterval = null;
        
        // DOM Elements
        const boxes = document.querySelectorAll('.box');
        const customColorGroup = document.getElementById('customColorGroup');
        const clickCountEl = document.getElementById('clickCount');
        const colorChangesEl = document.getElementById('colorChanges');
        const uniqueColorsEl = document.getElementById('uniqueColors');
        const colorHistoryEl = document.getElementById('colorHistory');
        
        // Initialize
        updateStats();
        boxes.forEach(box => {
            uniqueColors.add(box.style.backgroundColor);
        });
        uniqueColorsEl.textContent = uniqueColors.size;
        
        // Box click handler
        boxes.forEach(box => {
            box.addEventListener('click', function() {
                clickCount++;
                clickCountEl.textContent = clickCount;
                
                let newColor;
                
                switch(currentMode) {
                    case 'random':
                        newColor = getRandomColor();
                        break;
                    case 'gradient':
                        newColor = getRandomGradient();
                        break;
                    case 'custom':
                        newColor = document.getElementById('primaryColor').value;
                        break;
                    case 'rainbow':
                        newColor = getRainbowColor(colorChanges);
                        break;
                }
                
                // Apply color with animation
                this.classList.remove('pulse');
                void this.offsetWidth; // Trigger reflow
                this.classList.add('pulse');
                
                this.style.background = newColor;
                
                // Update stats and history
                colorChanges++;
                colorChangesEl.textContent = colorChanges;
                
                if (!uniqueColors.has(newColor)) {
                    uniqueColors.add(newColor);
                    uniqueColorsEl.textContent = uniqueColors.size;
                }
                
                addToHistory(newColor, box.id);
            });
        });
        
        // Mode switching
        function setMode(mode) {
            currentMode = mode;
            
            // Update active button
            document.querySelectorAll('.control-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
            
            // Show/hide custom color group
            if (mode === 'custom') {
                customColorGroup.style.display = 'block';
            } else {
                customColorGroup.style.display = 'none';
            }
            
            // Handle rainbow mode
            if (mode === 'rainbow' && !isRainbowActive) {
                startRainbowCycle();
            } else if (mode !== 'rainbow' && isRainbowActive) {
                stopRainbowCycle();
            }
        }
        
        // Rainbow cycle
        function startRainbowCycle() {
            isRainbowActive = true;
            let cycle = 0;
            
            rainbowInterval = setInterval(() => {
                boxes.forEach((box, index) => {
                    const hue = (cycle + index * 60) % 360;
                    box.style.background = `hsl(${hue}, 100%, 50%)`;
                });
                cycle = (cycle + 5) % 360;
            }, 100);
        }
        
        function stopRainbowCycle() {
            isRainbowActive = false;
            if (rainbowInterval) {
                clearInterval(rainbowInterval);
                rainbowInterval = null;
            }
        }
        
        // Color generators
        function getRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
        
        function getRandomGradient() {
            const color1 = getRandomColor();
            const color2 = getRandomColor();
            const angle = Math.floor(Math.random() * 360);
            return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
        }
        
        function getRainbowColor(index) {
            const hue = (index * 30) % 360;
            return `hsl(${hue}, 100%, 50%)`;
        }
        
        // Color operations
        function changeAllRandom() {
            boxes.forEach(box => {
                const newColor = getRandomColor();
                box.style.background = newColor;
                colorChanges++;
                
                if (!uniqueColors.has(newColor)) {
                    uniqueColors.add(newColor);
                }
            });
            
            updateStats();
        }
        
        function resetColors() {
            const defaultColors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c'];
            
            boxes.forEach((box, index) => {
                box.style.background = defaultColors[index];
            });
            
            updateStats();
        }
        
        function applyCustomColor() {
            const color = document.getElementById('primaryColor').value;
            boxes.forEach(box => {
                box.style.background = color;
            });
        }
        
        function copyColors() {
            const colors = Array.from(boxes).map(box => box.style.backgroundColor);
            const text = colors.join(', ');
            navigator.clipboard.writeText(text)
                .then(() => alert('Colors copied to clipboard!'))
                .catch(() => alert('Failed to copy colors'));
        }
        
        // History management
        function addToHistory(color, boxId) {
            const timestamp = new Date().toLocaleTimeString();
            const historyItem = {
                color,
                box: boxId,
                time: timestamp
            };
            
            colorHistory.unshift(historyItem);
            
            // Keep only last 10 items
            if (colorHistory.length > 10) {
                colorHistory.pop();
            }
            
            // Update history display
            updateHistory();
        }
        
        function updateHistory() {
            colorHistoryEl.innerHTML = '';
            
            colorHistory.forEach(item => {
                const historyItem = document.createElement('div');
                historyItem.className = 'history-item';
                historyItem.innerHTML = `
                    <div class="history-color" style="background: ${item.color};"></div>
                    <div>${item.box}: ${item.color}</div>
                    <div style="font-size: 0.8rem; color: #888;">${item.time}</div>
                `;
                colorHistoryEl.appendChild(historyItem);
            });
        }
        
        // Update stats
        function updateStats() {
            clickCountEl.textContent = clickCount;
            colorChangesEl.textContent = colorChanges;
            uniqueColorsEl.textContent = uniqueColors.size;
        }
        
        // Color input sync
        document.getElementById('primaryColor').addEventListener('input', function() {
            document.getElementById('primaryColorText').value = this.value;
        });
        
        document.getElementById('secondaryColor').addEventListener('input', function() {
            document.getElementById('secondaryColorText').value = this.value;
        });
        
        document.getElementById('primaryColorText').addEventListener('input', function() {
            const value = this.value;
            if (value.match(/^#[0-9A-F]{6}$/i)) {
                document.getElementById('primaryColor').value = value;
            }
        });
        
        document.getElementById('secondaryColorText').addEventListener('input', function() {
            const value = this.value;
            if (value.match(/^#[0-9A-F]{6}$/i)) {
                document.getElementById('secondaryColor').value = value;
            }
        });
    