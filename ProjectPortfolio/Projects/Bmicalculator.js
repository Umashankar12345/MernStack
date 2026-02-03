// BMI Calculator JavaScript
class BMICalculator {
    constructor() {
        this.weightInput = document.getElementById('weight');
        this.heightInput = document.getElementById('height');
        this.calculateBtn = document.getElementById('calculateBtn');
        this.bmiValue = document.getElementById('bmiValue');
        this.bmiCategory = document.getElementById('bmiCategory');
        this.progressFill = document.getElementById('progressFill');
        this.infoGrid = document.getElementById('infoGrid');
        this.recommendations = document.getElementById('recommendations');
        this.historyList = document.getElementById('historyList');
        this.clearHistoryBtn = document.getElementById('clearHistory');
        this.showDetailsCheckbox = document.getElementById('showDetails');
        this.saveHistoryCheckbox = document.getElementById('saveHistory');
        
        this.categories = [
            { name: 'Underweight', min: 0, max: 18.4, color: '#3498db', icon: 'fa-arrow-down' },
            { name: 'Normal', min: 18.5, max: 24.9, color: '#2ecc71', icon: 'fa-check' },
            { name: 'Overweight', min: 25, max: 29.9, color: '#f39c12', icon: 'fa-exclamation-triangle' },
            { name: 'Obese', min: 30, max: 100, color: '#e74c3c', icon: 'fa-exclamation-circle' }
        ];
        
        this.recommendationMessages = {
            underweight: [
                "Consult with a healthcare provider for dietary advice",
                "Consider increasing calorie intake with nutrient-rich foods",
                "Include protein-rich foods in your diet",
                "Regular exercise can help build muscle mass"
            ],
            normal: [
                "Maintain your current healthy lifestyle",
                "Continue with balanced diet and regular exercise",
                "Stay hydrated and get adequate sleep",
                "Regular health check-ups are recommended"
            ],
            overweight: [
                "Consider moderate calorie reduction",
                "Increase physical activity to 150+ minutes per week",
                "Focus on whole foods and reduce processed foods",
                "Consult a nutritionist for personalized advice"
            ],
            obese: [
                "Consult with a healthcare professional",
                "Consider a structured weight management program",
                "Increase physical activity gradually",
                "Focus on sustainable lifestyle changes"
            ]
        };
        
        this.init();
    }
    
    init() {
        this.loadHistory();
        this.setupEventListeners();
        this.updateInfoGrid();
        this.calculateBMI(); // Calculate initial BMI
    }
    
    setupEventListeners() {
        this.calculateBtn.addEventListener('click', () => this.calculateBMI());
        this.clearHistoryBtn.addEventListener('click', () => this.clearHistory());
        
        // Auto-calculate when inputs change
        this.weightInput.addEventListener('input', () => this.calculateBMI());
        this.heightInput.addEventListener('input', () => this.calculateBMI());
        
        // Input validation
        this.weightInput.addEventListener('blur', () => this.validateInput(this.weightInput, 20, 300));
        this.heightInput.addEventListener('blur', () => this.validateInput(this.heightInput, 100, 250));
        
        // Enter key support
        this.weightInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.calculateBMI();
        });
        this.heightInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.calculateBMI();
        });
    }
    
    validateInput(input, min, max) {
        const value = parseFloat(input.value);
        if (isNaN(value) || value < min || value > max) {
            input.style.borderColor = '#e74c3c';
            input.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)';
            return false;
        } else {
            input.style.borderColor = '#2ecc71';
            input.style.boxShadow = '0 0 0 3px rgba(46, 204, 113, 0.1)';
            return true;
        }
    }
    
    calculateBMI() {
        const weight = parseFloat(this.weightInput.value);
        const height = parseFloat(this.heightInput.value) / 100; // Convert cm to m
        
        // Validate inputs
        if (!this.validateInput(this.weightInput, 20, 300) || 
            !this.validateInput(this.heightInput, 100, 250)) {
            this.showError('Please enter valid weight (20-300 kg) and height (100-250 cm) values');
            return;
        }
        
        // Calculate BMI
        const bmi = weight / (height * height);
        const category = this.getBMICategory(bmi);
        
        // Update display
        this.updateDisplay(bmi, category);
        
        // Update progress bar
        this.updateProgressBar(bmi);
        
        // Show detailed information if enabled
        if (this.showDetailsCheckbox.checked) {
            this.updateInfoGrid();
            this.showRecommendations(category.name.toLowerCase());
        }
        
        // Save to history if enabled
        if (this.saveHistoryCheckbox.checked) {
            this.saveToHistory(bmi, category);
        }
        
        // Add animation
        this.bmiValue.classList.add('updated');
        setTimeout(() => this.bmiValue.classList.remove('updated'), 500);
    }
    
    getBMICategory(bmi) {
        return this.categories.find(cat => bmi >= cat.min && bmi <= cat.max) || this.categories[3];
    }
    
    updateDisplay(bmi, category) {
        this.bmiValue.textContent = bmi.toFixed(1);
        this.bmiCategory.textContent = category.name;
        this.bmiCategory.className = 'bmi-category ' + category.name.toLowerCase();
        this.bmiCategory.innerHTML = `<i class="fas ${category.icon}"></i> ${category.name}`;
    }
    
    updateProgressBar(bmi) {
        // Calculate percentage for progress bar (BMI range: 15-40)
        const minBMI = 15;
        const maxBMI = 40;
        let percentage = ((bmi - minBMI) / (maxBMI - minBMI)) * 100;
        
        // Clamp between 0-100
        percentage = Math.max(0, Math.min(100, percentage));
        
        this.progressFill.style.width = percentage + '%';
        
        // Update position indicator color based on BMI
        const category = this.getBMICategory(bmi);
        this.progressFill.style.background = `linear-gradient(90deg, 
            #3498db ${category.min === 0 ? 0 : 25}%, 
            #2ecc71 25%, 
            #f39c12 50%, 
            #e74c3c 75%)`;
    }
    
    updateInfoGrid() {
        this.infoGrid.innerHTML = this.categories.map(cat => `
            <div class="info-box ${cat.name.toLowerCase()}">
                <h4>${cat.name}</h4>
                <p>${cat.min === 0 ? '< ' : ''}${cat.min} - ${cat.max}${cat.max === 100 ? '+' : ''}</p>
            </div>
        `).join('');
    }
    
    showRecommendations(category) {
        const messages = this.recommendationMessages[category] || this.recommendationMessages.normal;
        
        this.recommendations.innerHTML = `
            <h4><i class="fas fa-lightbulb"></i> Health Recommendations</h4>
            <ul style="margin-top: 10px; padding-left: 20px;">
                ${messages.map(msg => `<li style="margin-bottom: 8px; color: #34495e;">${msg}</li>`).join('')}
            </ul>
        `;
    }
    
    saveToHistory(bmi, category) {
        const history = this.getHistory();
        const historyItem = {
            id: Date.now(),
            date: new Date().toLocaleString(),
            weight: parseFloat(this.weightInput.value),
            height: parseFloat(this.heightInput.value),
            bmi: bmi.toFixed(1),
            category: category.name,
            color: category.color
        };
        
        history.unshift(historyItem);
        if (history.length > 10) history.pop(); // Keep only last 10 items
        
        localStorage.setItem('bmiHistory', JSON.stringify(history));
        this.displayHistory();
    }
    
    getHistory() {
        const history = localStorage.getItem('bmiHistory');
        return history ? JSON.parse(history) : [];
    }
    
    displayHistory() {
        const history = this.getHistory();
        
        if (history.length === 0) {
            this.historyList.innerHTML = `
                <div style="text-align: center; padding: 20px; color: #95a5a6;">
                    <i class="fas fa-history" style="font-size: 2rem; margin-bottom: 10px;"></i>
                    <p>No calculation history yet</p>
                </div>
            `;
            return;
        }
        
        this.historyList.innerHTML = history.map(item => `
            <div class="history-item" style="border-left-color: ${item.color};">
                <div>
                    <div class="history-date">${item.date}</div>
                    <div style="font-size: 0.85rem; color: #7f8c8d;">
                        ${item.weight}kg / ${item.height}cm
                    </div>
                </div>
                <div style="text-align: right;">
                    <div class="history-bmi">BMI: ${item.bmi}</div>
                    <div class="history-category" style="background: ${item.color};">${item.category}</div>
                </div>
            </div>
        `).join('');
    }
    
    loadHistory() {
        this.displayHistory();
    }
    
    clearHistory() {
        if (confirm('Are you sure you want to clear all calculation history?')) {
            localStorage.removeItem('bmiHistory');
            this.displayHistory();
        }
    }
    
    showError(message) {
        // Create error message element
        let errorEl = document.getElementById('bmiError');
        if (!errorEl) {
            errorEl = document.createElement('div');
            errorEl.id = 'bmiError';
            errorEl.style.cssText = `
                background: #e74c3c;
                color: white;
                padding: 15px;
                border-radius: 8px;
                margin-top: 15px;
                text-align: center;
                animation: slideIn 0.3s ease;
            `;
            this.calculateBtn.parentNode.insertBefore(errorEl, this.calculateBtn.nextSibling);
        }
        
        errorEl.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        
        // Remove error after 3 seconds
        setTimeout(() => {
            if (errorEl.parentNode) {
                errorEl.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    if (errorEl.parentNode) errorEl.parentNode.removeChild(errorEl);
                }, 300);
            }
        }, 3000);
    }
}

// Add slideOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(20px);
        }
    }
`;
document.head.appendChild(style);

// Initialize calculator when page loads
document.addEventListener('DOMContentLoaded', () => {
    const calculator = new BMICalculator();
    
    // Add keyboard shortcut for calculation (Alt+C)
    document.addEventListener('keydown', (e) => {
        if (e.altKey && e.key === 'c') {
            e.preventDefault();
            calculator.calculateBMI();
        }
    });
    
    // Focus weight input on page load
    document.getElementById('weight').focus();
});