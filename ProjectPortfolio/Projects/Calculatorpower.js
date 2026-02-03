
        // Calculator state
        let currentValue = '0';
        let calculation = '';
        let previousValue = '';
        let operator = '';
        let waitingForNewValue = false;
        let memory = 0;
        let history = [];
        
        // DOM Elements
        const resultDisplay = document.getElementById('result');
        const calculationDisplay = document.getElementById('calculation');
        const memoryDisplay = document.getElementById('memoryDisplay');
        const historyList = document.getElementById('historyList');
        
        // Initialize
        updateDisplay();
        updateMemoryDisplay();
        
        // Number input
        function appendNumber(number) {
            if (waitingForNewValue) {
                currentValue = number.toString();
                waitingForNewValue = false;
            } else {
                currentValue = currentValue === '0' ? number.toString() : currentValue + number;
            }
            updateDisplay();
        }
        
        // Decimal point
        function appendDecimal() {
            if (waitingForNewValue) {
                currentValue = '0.';
                waitingForNewValue = false;
            } else if (!currentValue.includes('.')) {
                currentValue += '.';
            }
            updateDisplay();
        }
        
        // Operator input
        function appendOperator(op) {
            const inputValue = parseFloat(currentValue);
            
            if (operator && !waitingForNewValue) {
                calculate();
            }
            
            previousValue = currentValue;
            operator = op;
            waitingForNewValue = true;
            
            calculation = `${previousValue} ${getOperatorSymbol(op)} `;
            updateCalculationDisplay();
        }
        
        // Calculate result
        function calculate() {
            const prev = parseFloat(previousValue);
            const current = parseFloat(currentValue);
            let result = 0;
            
            if (isNaN(prev) || isNaN(current)) return;
            
            switch(operator) {
                case '+':
                    result = prev + current;
                    break;
                case '-':
                    result = prev - current;
                    break;
                case '*':
                    result = prev * current;
                    break;
                case '/':
                    result = current !== 0 ? prev / current : 'Error';
                    break;
                default:
                    return;
            }
            
            // Add to history
            addToHistory(`${previousValue} ${getOperatorSymbol(operator)} ${currentValue} = ${result}`);
            
            currentValue = result.toString();
            calculation = '';
            operator = '';
            waitingForNewValue = true;
            
            updateDisplay();
            updateCalculationDisplay();
        }
        
        // Scientific functions
        function calculateFunction(func) {
            const value = parseFloat(currentValue);
            let result = 0;
            let operation = '';
            
            switch(func) {
                case 'sqrt':
                    result = value >= 0 ? Math.sqrt(value) : 'Error';
                    operation = `√(${value})`;
                    break;
                case 'square':
                    result = Math.pow(value, 2);
                    operation = `(${value})²`;
                    break;
                case 'power':
                    // For power, we need second number
                    const power = prompt('Enter power (exponent):', '2');
                    if (power !== null) {
                        result = Math.pow(value, parseFloat(power));
                        operation = `(${value})^${power}`;
                    } else {
                        return;
                    }
                    break;
                case 'percent':
                    result = value / 100;
                    operation = `${value}%`;
                    break;
                case 'sin':
                    result = Math.sin(value * Math.PI / 180);
                    operation = `sin(${value}°)`;
                    break;
                case 'cos':
                    result = Math.cos(value * Math.PI / 180);
                    operation = `cos(${value}°)`;
                    break;
                case 'tan':
                    result = Math.tan(value * Math.PI / 180);
                    operation = `tan(${value}°)`;
                    break;
                case 'log':
                    result = value > 0 ? Math.log10(value) : 'Error';
                    operation = `log(${value})`;
                    break;
                case 'ln':
                    result = value > 0 ? Math.log(value) : 'Error';
                    operation = `ln(${value})`;
                    break;
                case 'exp':
                    result = Math.exp(value);
                    operation = `e^(${value})`;
                    break;
                case 'pi':
                    result = Math.PI;
                    operation = 'π';
                    break;
                case 'factorial':
                    result = factorial(value);
                    operation = `${value}!`;
                    break;
                case 'sinh':
                    result = Math.sinh(value);
                    operation = `sinh(${value})`;
                    break;
                case 'cosh':
                    result = Math.cosh(value);
                    operation = `cosh(${value})`;
                    break;
                case 'tanh':
                    result = Math.tanh(value);
                    operation = `tanh(${value})`;
                    break;
                case 'reciprocal':
                    result = value !== 0 ? 1 / value : 'Error';
                    operation = `1/(${value})`;
                    break;
            }
            
            // Add to history
            addToHistory(`${operation} = ${result}`);
            
            currentValue = result.toString();
            updateDisplay();
        }
        
        // Helper function for factorial
        function factorial(n) {
            if (n < 0 || !Number.isInteger(n)) return 'Error';
            if (n === 0 || n === 1) return 1;
            let result = 1;
            for (let i = 2; i <= n; i++) {
                result *= i;
            }
            return result;
        }
        
        // Clear functions
        function clearAll() {
            currentValue = '0';
            calculation = '';
            previousValue = '';
            operator = '';
            waitingForNewValue = false;
            updateDisplay();
            updateCalculationDisplay();
        }
        
        function clearEntry() {
            currentValue = '0';
            updateDisplay();
        }
        
        function clearHistory() {
            history = [];
            updateHistory();
        }
        
        // Backspace
        function backspace() {
            if (currentValue.length > 1) {
                currentValue = currentValue.slice(0, -1);
            } else {
                currentValue = '0';
            }
            updateDisplay();
        }
        
        // Toggle sign
        function toggleSign() {
            currentValue = (parseFloat(currentValue) * -1).toString();
            updateDisplay();
        }
        
        // Memory functions
        function memoryClear() {
            memory = 0;
            updateMemoryDisplay();
        }
        
        function memoryRecall() {
            currentValue = memory.toString();
            updateDisplay();
        }
        
        function memoryAdd() {
            memory += parseFloat(currentValue) || 0;
            updateMemoryDisplay();
        }
        
        function memorySubtract() {
            memory -= parseFloat(currentValue) || 0;
            updateMemoryDisplay();
        }
        
        // Unit converter
        function convertUnits() {
            const input = parseFloat(document.getElementById('converterInput').value);
            const fromUnit = document.getElementById('converterFrom').value;
            const toUnit = document.getElementById('converterTo').value;
            
            if (isNaN(input)) {
                document.getElementById('converterResult').textContent = 'Result: Invalid input';
                return;
            }
            
            // Convert to meters first (base unit)
            let inMeters = 0;
            
            // Convert from unit to meters
            switch(fromUnit) {
                case 'cm': inMeters = input / 100; break;
                case 'm': inMeters = input; break;
                case 'km': inMeters = input * 1000; break;
                case 'in': inMeters = input * 0.0254; break;
                case 'ft': inMeters = input * 0.3048; break;
                case 'mi': inMeters = input * 1609.34; break;
            }
            
            // Convert from meters to target unit
            let result = 0;
            switch(toUnit) {
                case 'cm': result = inMeters * 100; break;
                case 'm': result = inMeters; break;
                case 'km': result = inMeters / 1000; break;
                case 'in': result = inMeters / 0.0254; break;
                case 'ft': result = inMeters / 0.3048; break;
                case 'mi': result = inMeters / 1609.34; break;
            }
            
            document.getElementById('converterResult').textContent = 
                `Result: ${input} ${fromUnit} = ${result.toFixed(6)} ${toUnit}`;
        }
        
        // Helper functions
        function getOperatorSymbol(op) {
            switch(op) {
                case '+': return '+';
                case '-': return '-';
                case '*': return '×';
                case '/': return '÷';
                default: return op;
            }
        }
        
        // Update displays
        function updateDisplay() {
            resultDisplay.textContent = currentValue;
        }
        
        function updateCalculationDisplay() {
            calculationDisplay.textContent = calculation;
        }
        
        function updateMemoryDisplay() {
            memoryDisplay.textContent = `Memory: ${memory}`;
        }
        
        // History functions
        function addToHistory(entry) {
            history.unshift(entry);
            if (history.length > 20) {
                history.pop();
            }
            updateHistory();
        }
        
        function updateHistory() {
            historyList.innerHTML = '';
            
            history.forEach(entry => {
                const historyItem = document.createElement('div');
                historyItem.className = 'history-item';
                
                const parts = entry.split(' = ');
                historyItem.innerHTML = `
                    <div class="history-expression">${parts[0]}</div>
                    <div class="history-result">${parts[1]}</div>
                `;
                
                historyList.appendChild(historyItem);
            });
        }
        
        // Keyboard support
        document.addEventListener('keydown', function(event) {
            const key = event.key;
            
            // Numbers
            if (key >= '0' && key <= '9') {
                appendNumber(parseInt(key));
            }
            
            // Decimal point
            else if (key === '.') {
                appendDecimal();
            }
            
            // Operators
            else if (['+', '-', '*', '/'].includes(key)) {
                appendOperator(key);
            }
            
            // Equals or Enter
            else if (key === '=' || key === 'Enter') {
                calculate();
            }
            
            // Escape for clear
            else if (key === 'Escape') {
                clearAll();
            }
            
            // Backspace
            else if (key === 'Backspace') {
                backspace();
            }
            
            // Prevent default for calculator keys
            if (['0','1','2','3','4','5','6','7','8','9','+','-','*','/','.','=','Enter','Escape','Backspace'].includes(key)) {
                event.preventDefault();
            }
        });
        
        // Initialize history
        updateHistory();
    