function calculateBMI() {
            const weight = parseFloat(document.getElementById('weight').value);
            const height = parseFloat(document.getElementById('height').value);
            
            if (!weight || !height || weight <= 0 || height <= 0) {
                alert("Please enter valid weight and height values!");
                return;
            }
            
            // Convert cm to meters
            const heightInMeters = height / 100;
            
            // Calculate BMI
            const bmi = weight / (heightInMeters * heightInMeters);
            
            // Display result
            document.getElementById('bmiValue').textContent = bmi.toFixed(2);
            
            // Determine category
            let category = '';
            let categoryClass = '';
            
            if (bmi < 18.5) {
                category = 'Underweight';
                categoryClass = 'underweight';
            } else if (bmi < 25) {
                category = 'Normal';
                categoryClass = 'normal';
            } else if (bmi < 30) {
                category = 'Overweight';
                categoryClass = 'overweight';
            } else {
                category = 'Obese';
                categoryClass = 'obese';
            }
            
            document.getElementById('bmiCategory').textContent = category;
            document.getElementById('bmiCategory').className = 'bmi-category ' + categoryClass;
            
            // Show result container
            document.getElementById('resultContainer').classList.add('show');
        }
        
        // Allow Enter key to calculate BMI
        document.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateBMI();
            }
        });

        //todo list

          const taskInput = document.getElementById('taskInput');
        const addBtn = document.getElementById('addBtn');
        const todoList = document.getElementById('todoList');
        const emptyState = document.getElementById('emptyState');
        const filterButtons = document.querySelectorAll('.filter-btn');
        const markAllBtn = document.getElementById('markAllBtn');
        const clearCompletedBtn = document.getElementById('clearCompletedBtn');
        const totalTasksEl = document.getElementById('totalTasks');
        const completedTasksEl = document.getElementById('completedTasks');
        const pendingTasksEl = document.getElementById('pendingTasks');
        
        // State
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        let currentFilter = 'all';
        
        // Initialize
        renderTodos();
        updateStats();
        
        // Add Task
        addBtn.addEventListener('click', addTask);
        taskInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') addTask();
        });
        
        function addTask() {
            const taskText = taskInput.value.trim();
            if (!taskText) {
                alert('Please enter a task!');
                return;
            }
            
            const newTodo = {
                id: Date.now(),
                text: taskText,
                completed: false,
                createdAt: new Date().toISOString()
            };
            
            todos.push(newTodo);
            saveTodos();
            renderTodos();
            updateStats();
            
            taskInput.value = '';
            taskInput.focus();
        }
        
        // Toggle Complete
        function toggleComplete(id) {
            todos = todos.map(todo => 
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            );
            saveTodos();
            renderTodos();
            updateStats();
        }
        
        // Edit Task
        function editTask(id) {
            const todo = todos.find(t => t.id === id);
            const newText = prompt('Edit task:', todo.text);
            if (newText && newText.trim()) {
                todo.text = newText.trim();
                saveTodos();
                renderTodos();
            }
        }
        
        // Delete Task
        function deleteTask(id) {
            if (confirm('Are you sure you want to delete this task?')) {
                todos = todos.filter(todo => todo.id !== id);
                saveTodos();
                renderTodos();
                updateStats();
            }
        }
        
        // Mark All Complete
        markAllBtn.addEventListener('click', () => {
            todos = todos.map(todo => ({ ...todo, completed: true }));
            saveTodos();
            renderTodos();
            updateStats();
        });
        
        // Clear Completed
        clearCompletedBtn.addEventListener('click', () => {
            if (confirm('Clear all completed tasks?')) {
                todos = todos.filter(todo => !todo.completed);
                saveTodos();
                renderTodos();
                updateStats();
            }
        });
        
        // Filter Tasks
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.dataset.filter;
                renderTodos();
            });
        });
        
        // Render Todos
        function renderTodos() {
            // Filter todos based on current filter
            let filteredTodos = todos;
            if (currentFilter === 'pending') {
                filteredTodos = todos.filter(todo => !todo.completed);
            } else if (currentFilter === 'completed') {
                filteredTodos = todos.filter(todo => todo.completed);
            }
            
            // Show/hide empty state
            if (filteredTodos.length === 0) {
                emptyState.style.display = 'block';
                todoList.innerHTML = '';
                todoList.appendChild(emptyState);
            } else {
                emptyState.style.display = 'none';
                todoList.innerHTML = '';
                
                filteredTodos.forEach(todo => {
                    const todoItem = document.createElement('div');
                    todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
                    
                    todoItem.innerHTML = `
                        <input type="checkbox" class="task-checkbox" ${todo.completed ? 'checked' : ''}
                               onclick="toggleComplete(${todo.id})">
                        <div class="task-text">${todo.text}</div>
                        <div class="task-actions">
                            <button class="action-btn edit-btn" onclick="editTask(${todo.id})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="action-btn delete-btn" onclick="deleteTask(${todo.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    `;
                    
                    todoList.appendChild(todoItem);
                });
            }
        }
        
        // Update Stats
        function updateStats() {
            const total = todos.length;
            const completed = todos.filter(todo => todo.completed).length;
            const pending = total - completed;
            
            totalTasksEl.textContent = total;
            completedTasksEl.textContent = completed;
            pendingTasksEl.textContent = pending;
        }
        
        // Save to Local Storage
        function saveTodos() {
            localStorage.setItem('todos', JSON.stringify(todos));
        }
        // form project

             const form = document.getElementById('registrationForm');
        const successMessage = document.getElementById('successMessage');
        const previewSection = document.getElementById('previewSection');
        const previewGrid = document.getElementById('previewGrid');
        
        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                showPreview();
                successMessage.style.display = 'block';
                previewSection.classList.add('show');
                form.reset();
                resetErrors();
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth' });
            }
        });
        
        // Validation functions
        function validateForm() {
            let isValid = true;
            resetErrors();
            
            // First Name
            const firstName = document.getElementById('firstName').value.trim();
            if (!firstName || firstName.length < 2) {
                showError('firstNameError', 'First name must be at least 2 characters');
                markInvalid('firstName');
                isValid = false;
            }
            
            // Last Name
            const lastName = document.getElementById('lastName').value.trim();
            if (!lastName || lastName.length < 2) {
                showError('lastNameError', 'Last name must be at least 2 characters');
                markInvalid('lastName');
                isValid = false;
            }
            
            // Email
            const email = document.getElementById('email').value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                showError('emailError', 'Please enter a valid email address');
                markInvalid('email');
                isValid = false;
            }
            
            // Phone
            const phone = document.getElementById('phone').value.trim();
            const phoneRegex = /^\d{10}$/;
            if (!phone || !phoneRegex.test(phone)) {
                showError('phoneError', 'Please enter a valid 10-digit phone number');
                markInvalid('phone');
                isValid = false;
            }
            
            // Password
            const password = document.getElementById('password').value;
            if (!password || password.length < 8) {
                showError('passwordError', 'Password must be at least 8 characters');
                markInvalid('password');
                isValid = false;
            }
            
            // Confirm Password
            const confirmPassword = document.getElementById('confirmPassword').value;
            if (password !== confirmPassword) {
                showError('confirmPasswordError', 'Passwords do not match');
                markInvalid('confirmPassword');
                isValid = false;
            }
            
            // Terms
            const terms = document.getElementById('terms').checked;
            if (!terms) {
                showError('termsError', 'You must agree to the terms and conditions');
                isValid = false;
            }
            
            return isValid;
        }
        
        // Helper functions
        function showError(elementId, message) {
            const element = document.getElementById(elementId);
            element.textContent = message;
            element.style.display = 'block';
        }
        
        function markInvalid(elementId) {
            document.getElementById(elementId).classList.add('error');
        }
        
        function resetErrors() {
            // Hide all error messages
            document.querySelectorAll('.error-message').forEach(el => {
                el.style.display = 'none';
            });
            
            // Remove error styling
            document.querySelectorAll('input, select, textarea').forEach(el => {
                el.classList.remove('error');
            });
        }
        
        function resetForm() {
            form.reset();
            resetErrors();
            successMessage.style.display = 'none';
            previewSection.classList.remove('show');
        }
        
        // Show form data preview
        function showPreview() {
            previewGrid.innerHTML = '';
            
            const formData = {
                'First Name': document.getElementById('firstName').value,
                'Last Name': document.getElementById('lastName').value,
                'Email': document.getElementById('email').value,
                'Phone': document.getElementById('phone').value,
                'Country': document.getElementById('country').value || 'Not specified',
                'Date of Birth': document.getElementById('dateOfBirth').value || 'Not specified',
                'Gender': document.querySelector('input[name="gender"]:checked')?.value || 'Not specified',
                'Bio': document.getElementById('bio').value || 'Not specified'
            };
            
            // Add interests
            const interests = [];
            document.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
                if (cb.id !== 'terms') interests.push(cb.value);
            });
            formData['Interests'] = interests.length > 0 ? interests.join(', ') : 'None';
            
            // Create preview items
            Object.entries(formData).forEach(([key, value]) => {
                const previewItem = document.createElement('div');
                previewItem.className = 'preview-item';
                previewItem.innerHTML = `
                    <div class="preview-label">${key}</div>
                    <div>${value || '-'}</div>
                `;
                previewGrid.appendChild(previewItem);
            });
        }
        
        // Real-time validation for password match
        document.getElementById('confirmPassword').addEventListener('input', function() {
            const password = document.getElementById('password').value;
            const confirmPassword = this.value;
            
            if (confirmPassword && password !== confirmPassword) {
                showError('confirmPasswordError', 'Passwords do not match');
                markInvalid('confirmPassword');
            } else {
                document.getElementById('confirmPasswordError').style.display = 'none';
                document.getElementById('confirmPassword').classList.remove('error');
            }
        });
        
        // Real-time validation for password length
        document.getElementById('password').addEventListener('input', function() {
            if (this.value.length > 0 && this.value.length < 8) {
                showError('passwordError', 'Password must be at least 8 characters');
                markInvalid('password');
            } else {
                document.getElementById('passwordError').style.display = 'none';
                document.getElementById('password').classList.remove('error');
            }
        });


        // Box change

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

        //box color change

         const colorBox = document.getElementById('colorBox');
        const currentColorDisplay = document.getElementById('currentColorDisplay');
        const colorCode = document.getElementById('colorCode');
        const rgbValue = document.getElementById('rgbValue');
        const hslValue = document.getElementById('hslValue');
        const hexValue = document.getElementById('hexValue');
        
        const colorPicker = document.getElementById('colorPicker');
        const hueSlider = document.getElementById('hueSlider');
        const saturationSlider = document.getElementById('saturationSlider');
        const lightnessSlider = document.getElementById('lightnessSlider');
        const hueValue = document.getElementById('hueValue');
        const saturationValue = document.getElementById('saturationValue');
        const lightnessValue = document.getElementById('lightnessValue');
        
        const hexInput = document.getElementById('hexInput');
        const rgbInput = document.getElementById('rgbInput');
        const hslInput = document.getElementById('hslInput');
        
        // State
        let currentColor = '#667eea';
        let gradientType = 'linear';
        let gradientAngle = 0;
        
        // Initialize
        updateColor(currentColor);
        
        // Color picker change
        colorPicker.addEventListener('input', function() {
            updateColor(this.value);
        });
        
        // HSL Sliders
        hueSlider.addEventListener('input', function() {
            hueValue.textContent = this.value;
            updateFromHSL();
        });
        
        saturationSlider.addEventListener('input', function() {
            saturationValue.textContent = this.value + '%';
            updateFromHSL();
        });
        
        lightnessSlider.addEventListener('input', function() {
            lightnessValue.textContent = this.value + '%';
            updateFromHSL();
        });
        
        // Input field changes
        hexInput.addEventListener('input', function() {
            const hex = this.value;
            if (hex.match(/^#[0-9A-F]{6}$/i)) {
                updateColor(hex);
            }
        });
        
        rgbInput.addEventListener('input', function() {
            const rgb = this.value.match(/(\d+),\s*(\d+),\s*(\d+)/);
            if (rgb) {
                const r = parseInt(rgb[1]);
                const g = parseInt(rgb[2]);
                const b = parseInt(rgb[3]);
                updateColor(rgbToHex(r, g, b));
            }
        });
        
        hslInput.addEventListener('input', function() {
            const hsl = this.value.match(/(\d+),\s*(\d+)%,\s*(\d+)%/);
            if (hsl) {
                hueSlider.value = parseInt(hsl[1]);
                saturationSlider.value = parseInt(hsl[2]);
                lightnessSlider.value = parseInt(hsl[3]);
                updateFromHSL();
            }
        });
        
        // Update color from HSL sliders
        function updateFromHSL() {
            const h = parseInt(hueSlider.value);
            const s = parseInt(saturationSlider.value);
            const l = parseInt(lightnessSlider.value);
            
            const hex = hslToHex(h, s, l);
            updateColor(hex);
        }
        
        // Main update function
        function updateColor(hex) {
            currentColor = hex;
            
            // Update color picker
            colorPicker.value = hex;
            
            // Update HSL sliders
            const hsl = hexToHSL(hex);
            hueSlider.value = hsl.h;
            saturationSlider.value = hsl.s;
            lightnessSlider.value = hsl.l;
            
            hueValue.textContent = hsl.h;
            saturationValue.textContent = hsl.s + '%';
            lightnessValue.textContent = hsl.l + '%';
            
            // Update input fields
            hexInput.value = hex;
            const rgb = hexToRGB(hex);
            rgbInput.value = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
            hslInput.value = `${hsl.h}, ${hsl.s}%, ${hsl.l}%`;
            
            // Update display
            colorBox.style.background = hex;
            colorBox.classList.add('color-change');
            setTimeout(() => colorBox.classList.remove('color-change'), 500);
            
            currentColorDisplay.style.background = hex;
            colorCode.textContent = hex;
            
            rgbValue.textContent = `RGB: ${rgb.r}, ${rgb.g}, ${rgb.b}`;
            hslValue.textContent = `HSL: ${hsl.h}°, ${hsl.s}%, ${hsl.l}%`;
            hexValue.textContent = `HEX: ${hex}`;
        }
        
        // Preset colors
        function setPresetColor(hex) {
            updateColor(hex);
            
            // Highlight active preset
            document.querySelectorAll('.preset-color').forEach(pc => {
                pc.classList.remove('active');
                if (pc.style.background === hex || 
                    pc.style.background.replace(/\s/g, '') === hex) {
                    pc.classList.add('active');
                }
            });
        }
        
        // Gradient functions
        function setGradientType(type) {
            gradientType = type;
            
            // Update active button
            document.querySelectorAll('.gradient-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
        }
        
        function setGradientAngle(angle) {
            gradientAngle = angle;
            
            // Update active button
            document.querySelectorAll('.gradient-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
        }
        
        function applyGradient() {
            const color1 = document.getElementById('gradientColor1').value;
            const color2 = document.getElementById('gradientColor2').value;
            
            let gradient;
            if (gradientType === 'linear') {
                gradient = `linear-gradient(${gradientAngle}deg, ${color1}, ${color2})`;
            } else if (gradientType === 'radial') {
                gradient = `radial-gradient(circle, ${color1}, ${color2})`;
            } else if (gradientType === 'conic') {
                gradient = `conic-gradient(from ${gradientAngle}deg, ${color1}, ${color2})`;
            }
            
            colorBox.style.background = gradient;
            colorBox.classList.add('color-change');
            setTimeout(() => colorBox.classList.remove('color-change'), 500);
            
            currentColorDisplay.style.background = gradient;
            colorCode.textContent = gradientType.charAt(0).toUpperCase() + gradientType.slice(1) + ' Gradient';
            rgbValue.textContent = `Color 1: ${color1}`;
            hslValue.textContent = `Color 2: ${color2}`;
            hexValue.textContent = `Type: ${gradientType}, Angle: ${gradientAngle}°`;
        }
        
        // Action buttons
        function copyColor() {
            navigator.clipboard.writeText(currentColor)
                .then(() => alert(`Color ${currentColor} copied to clipboard!`))
                .catch(() => alert('Failed to copy color'));
        }
        
        function randomColor() {
            const randomHex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
            updateColor(randomHex);
        }
        
        function applyColor() {
            updateColor(currentColor);
        }
        
        // Color conversion functions
        function hexToRGB(hex) {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return { r, g, b };
        }
        
        function rgbToHex(r, g, b) {
            return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        }
        
        function hexToHSL(hex) {
            let { r, g, b } = hexToRGB(hex);
            r /= 255;
            g /= 255;
            b /= 255;
            
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            let h, s, l = (max + min) / 2;
            
            if (max === min) {
                h = s = 0; // achromatic
            } else {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                
                h /= 6;
            }
            
            return {
                h: Math.round(h * 360),
                s: Math.round(s * 100),
                l: Math.round(l * 100)
            };
        }
        
        function hslToHex(h, s, l) {
            s /= 100;
            l /= 100;
            
            const c = (1 - Math.abs(2 * l - 1)) * s;
            const x = c * (1 - Math.abs((h / 60) % 2 - 1));
            const m = l - c / 2;
            
            let r = 0, g = 0, b = 0;
            
            if (0 <= h && h < 60) {
                r = c; g = x; b = 0;
            } else if (60 <= h && h < 120) {
                r = x; g = c; b = 0;
            } else if (120 <= h && h < 180) {
                r = 0; g = c; b = x;
            } else if (180 <= h && h < 240) {
                r = 0; g = x; b = c;
            } else if (240 <= h && h < 300) {
                r = x; g = 0; b = c;
            } else if (300 <= h && h < 360) {
                r = c; g = 0; b = x;
            }
            
            r = Math.round((r + m) * 255);
            g = Math.round((g + m) * 255);
            b = Math.round((b + m) * 255);
            
            return rgbToHex(r, g, b);
        }
        
        // Initialize preset active state
        document.querySelector('.preset-color').classList.add('active');


        //Alarm clock
         function updateMainClock() {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            document.getElementById('mainClock').textContent = `${hours}:${minutes}:${seconds}`;
        }
        
        setInterval(updateMainClock, 1000);
        updateMainClock();

        // ========== TAB SWITCHING ==========
        document.querySelectorAll('.tab-btn').forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons and features
                document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
                document.querySelectorAll('.feature').forEach(feature => feature.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show corresponding feature
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });

        // ========== ALARM CLOCK ==========
        let alarms = [];
        let alarmInterval;
        
        function setAlarm() {
            const timeInput = document.getElementById('alarmTime').value;
            const labelInput = document.getElementById('alarmLabel').value || 'Alarm';
            const soundInput = document.getElementById('alarmSound').value;
            
            if (!timeInput) {
                alert('Please select a time for the alarm!');
                return;
            }
            
            const alarm = {
                id: Date.now(),
                time: timeInput,
                label: labelInput,
                sound: soundInput,
                active: true
            };
            
            alarms.push(alarm);
            updateAlarmList();
            checkAlarms();
            
            // Clear inputs
            document.getElementById('alarmTime').value = '';
            document.getElementById('alarmLabel').value = '';
            
            alert(`Alarm set for ${timeInput} (${labelInput})`);
        }
        
        function updateAlarmList() {
            const alarmList = document.getElementById('alarmList');
            alarmList.innerHTML = '';
            
            alarms.forEach(alarm => {
                const alarmItem = document.createElement('div');
                alarmItem.className = 'alarm-item';
                alarmItem.innerHTML = `
                    <div>
                        <strong>${alarm.time}</strong> - ${alarm.label}
                        <br><small>Sound: ${alarm.sound}</small>
                    </div>
                    <div>
                        <button class="delete-btn" onclick="deleteAlarm(${alarm.id})">Delete</button>
                        <button onclick="toggleAlarm(${alarm.id})" style="background: ${alarm.active ? '#4CAF50' : '#888'}">
                            ${alarm.active ? 'ON' : 'OFF'}
                        </button>
                    </div>
                `;
                alarmList.appendChild(alarmItem);
            });
        }
        
        function deleteAlarm(id) {
            alarms = alarms.filter(alarm => alarm.id !== id);
            updateAlarmList();
        }
        
        function toggleAlarm(id) {
            alarms = alarms.map(alarm => {
                if (alarm.id === id) {
                    return { ...alarm, active: !alarm.active };
                }
                return alarm;
            });
            updateAlarmList();
        }
        
        function checkAlarms() {
            if (alarmInterval) clearInterval(alarmInterval);
            
            alarmInterval = setInterval(() => {
                const now = new Date();
                const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
                
                alarms.forEach(alarm => {
                    if (alarm.active && alarm.time === currentTime) {
                        triggerAlarm(alarm);
                    }
                });
            }, 60000); // Check every minute
        }
        
        function triggerAlarm(alarm) {
            // Play sound
            const audio = document.getElementById('alarmAudio');
            audio.play();
            
            // Show notification
            if (Notification.permission === "granted") {
                new Notification(`⏰ Alarm: ${alarm.label}`, {
                    body: `It's ${alarm.time}! Time to wake up!`,
                    icon: 'https://cdn-icons-png.flaticon.com/512/3208/3208720.png'
                });
            } else if (Notification.permission !== "denied") {
                Notification.requestPermission().then(permission => {
                    if (permission === "granted") {
                        new Notification(`⏰ Alarm: ${alarm.label}`, {
                            body: `It's ${alarm.time}! Time to wake up!`
                        });
                    }
                });
            }
            
            // Show alert
            alert(`⏰ ALARM: ${alarm.label}\nTime: ${alarm.time}`);
            
            // Deactivate alarm after triggering
            toggleAlarm(alarm.id);
        }
        
        // Request notification permission
        if (Notification.permission === "default") {
            Notification.requestPermission();
        }

        // ========== WORLD CLOCK ==========
        let timezones = ['local'];
        
        function addTimezone() {
            const select = document.getElementById('timezoneSelect');
            const timezone = select.value;
            
            if (!timezones.includes(timezone)) {
                timezones.push(timezone);
                updateWorldClock();
            }
        }
        
        function updateWorldClock() {
            const grid = document.getElementById('worldClockGrid');
            grid.innerHTML = '';
            
            timezones.forEach(timezone => {
                const card = document.createElement('div');
                card.className = 'timezone-card';
                
                let time;
                let name;
                
                if (timezone === 'local') {
                    const now = new Date();
                    time = now.toLocaleTimeString('en-US', { hour12: false });
                    name = 'Local Time';
                } else {
                    const now = new Date();
                    time = now.toLocaleTimeString('en-US', { 
                        timeZone: timezone,
                        hour12: false 
                    });
                    name = timezone.split('/')[1].replace('_', ' ');
                }
                
                card.innerHTML = `
                    <div class="timezone-name">${name}</div>
                    <div class="timezone-time">${time}</div>
                `;
                
                grid.appendChild(card);
            });
        }
        
        // Update world clock every second
        setInterval(updateWorldClock, 1000);
        updateWorldClock();

        // ========== STOPWATCH ==========
        let stopwatch = {
            hours: 0,
            minutes: 0,
            seconds: 0,
            milliseconds: 0,
            timer: null,
            isRunning: false,
            laps: []
        };
        
        function startStopwatch() {
            if (!stopwatch.isRunning) {
                stopwatch.isRunning = true;
                document.getElementById('stopwatchStart').disabled = true;
                document.getElementById('stopwatchPause').disabled = false;
                
                stopwatch.timer = setInterval(() => {
                    stopwatch.milliseconds += 10;
                    
                    if (stopwatch.milliseconds >= 1000) {
                        stopwatch.seconds++;
                        stopwatch.milliseconds = 0;
                    }
                    
                    if (stopwatch.seconds >= 60) {
                        stopwatch.minutes++;
                        stopwatch.seconds = 0;
                    }
                    
                    if (stopwatch.minutes >= 60) {
                        stopwatch.hours++;
                        stopwatch.minutes = 0;
                    }
                    
                    updateStopwatchDisplay();
                }, 10);
            }
        }
        
        function pauseStopwatch() {
            if (stopwatch.isRunning) {
                stopwatch.isRunning = false;
                document.getElementById('stopwatchStart').disabled = false;
                document.getElementById('stopwatchPause').disabled = true;
                clearInterval(stopwatch.timer);
            }
        }
        
        function resetStopwatch() {
            pauseStopwatch();
            stopwatch.hours = 0;
            stopwatch.minutes = 0;
            stopwatch.seconds = 0;
            stopwatch.milliseconds = 0;
            stopwatch.laps = [];
            updateStopwatchDisplay();
            document.getElementById('stopwatchLaps').innerHTML = '';
        }
        
        function lapStopwatch() {
            if (stopwatch.isRunning) {
                const lapTime = document.getElementById('stopwatchDisplay').textContent;
                const lapCount = stopwatch.laps.length + 1;
                stopwatch.laps.push({ number: lapCount, time: lapTime });
                
                const lapItem = document.createElement('div');
                lapItem.className = 'alarm-item';
                lapItem.innerHTML = `Lap ${lapCount}: ${lapTime}`;
                document.getElementById('stopwatchLaps').prepend(lapItem);
            }
        }
        
        function updateStopwatchDisplay() {
            const hours = stopwatch.hours.toString().padStart(2, '0');
            const minutes = stopwatch.minutes.toString().padStart(2, '0');
            const seconds = stopwatch.seconds.toString().padStart(2, '0');
            const milliseconds = Math.floor(stopwatch.milliseconds / 10).toString().padStart(2, '0');
            
            document.getElementById('stopwatchDisplay').textContent = 
                `${hours}:${minutes}:${seconds}.${milliseconds}`;
        }

        // ========== TIMER ==========
        let timer = {
            totalSeconds: 1500, // 25 minutes default
            remainingSeconds: 1500,
            timer: null,
            isRunning: false
        };
        
        function startTimer() {
            if (!timer.isRunning && timer.remainingSeconds > 0) {
                timer.isRunning = true;
                document.getElementById('timerStart').disabled = true;
                document.getElementById('timerPause').disabled = false;
                
                timer.timer = setInterval(() => {
                    timer.remainingSeconds--;
                    updateTimerDisplay();
                    
                    if (timer.remainingSeconds <= 0) {
                        timerFinished();
                    }
                }, 1000);
            }
        }
        
        function pauseTimer() {
            if (timer.isRunning) {
                timer.isRunning = false;
                document.getElementById('timerStart').disabled = false;
                document.getElementById('timerPause').disabled = true;
                clearInterval(timer.timer);
            }
        }
        
        function resetTimer() {
            pauseTimer();
            const minutes = parseInt(document.getElementById('timerMinutes').value) || 25;
            const seconds = parseInt(document.getElementById('timerSeconds').value) || 0;
            timer.totalSeconds = timer.remainingSeconds = (minutes * 60) + seconds;
            updateTimerDisplay();
        }
        
        function setPresetTimer(minutes) {
            document.getElementById('timerMinutes').value = minutes;
            document.getElementById('timerSeconds').value = 0;
            resetTimer();
        }
        
        function timerFinished() {
            pauseTimer();
            
            // Play sound
            const audio = document.getElementById('timerAudio');
            audio.play();
            
            // Show notification
            if (Notification.permission === "granted") {
                new Notification("⏰ Timer Finished!", {
                    body: "Your timer has completed!",
                    icon: 'https://cdn-icons-png.flaticon.com/512/3208/3208720.png'
                });
            }
            
            alert("⏰ Timer Finished!");
            
            // Flash animation
            const display = document.getElementById('timerDisplay');
            display.style.color = '#ff0000';
            setTimeout(() => display.style.color = 'white', 500);
            setTimeout(() => display.style.color = '#ff0000', 1000);
            setTimeout(() => display.style.color = 'white', 1500);
        }
        
        function updateTimerDisplay() {
            const minutes = Math.floor(timer.remainingSeconds / 60);
            const seconds = timer.remainingSeconds % 60;
            
            document.getElementById('timerDisplay').textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        
        // Initialize timer display
        resetTimer();

        // ========== INITIALIZE ==========
        updateAlarmList();
        checkAlarms();


        //Box swap


        let selectedBoxes = [];
        let swapCount = 0;
        let correctOrderCount = 0;
        let swapHistory = [];
        // let boxes = [];
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


        //Box swap PRo
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