// Advanced Stopwatch Timer
class Stopwatch {
    constructor() {
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.milliseconds = 0;
        this.timer = null;
        this.isRunning = false;
        this.laps = [];
        this.startTime = 0;
        this.lastLapTime = 0;
        
        // DOM Elements
        this.hoursEl = document.getElementById('hours');
        this.minutesEl = document.getElementById('minutes');
        this.secondsEl = document.getElementById('seconds');
        this.millisecondsEl = document.getElementById('milliseconds');
        this.display = document.querySelector('.time-display');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.lapBtn = document.getElementById('lapBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.lapsList = document.getElementById('lapsList');
        this.lapCountEl = document.getElementById('lapCount');
        this.totalTimeEl = document.getElementById('totalTime');
        this.fastestLapEl = document.getElementById('fastestLap');
        this.slowestLapEl = document.getElementById('slowestLap');
        this.soundToggle = document.getElementById('soundToggle');
        this.autoLapToggle = document.getElementById('autoLapToggle');
        this.themeSelect = document.getElementById('themeSelect');
        
        // Audio elements
        this.startSound = document.getElementById('startSound');
        this.lapSound = document.getElementById('lapSound');
        this.resetSound = document.getElementById('resetSound');
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupKeyboardShortcuts();
        this.loadSettings();
        this.updateDisplay();
        this.updateStats();
        
        // Initialize theme
        this.applyTheme(this.themeSelect.value);
    }
    
    setupEventListeners() {
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.lapBtn.addEventListener('click', () => this.recordLap());
        this.resetBtn.addEventListener('click', () => this.reset());
        
        this.soundToggle.addEventListener('change', () => this.saveSettings());
        this.autoLapToggle.addEventListener('change', () => this.saveSettings());
        this.themeSelect.addEventListener('change', (e) => {
            this.applyTheme(e.target.value);
            this.saveSettings();
        });
    }
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Don't trigger if user is typing in an input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') {
                return;
            }
            
            switch(e.key.toLowerCase()) {
                case ' ':
                case 's':
                    e.preventDefault();
                    if (this.isRunning) {
                        this.pause();
                    } else {
                        this.start();
                    }
                    break;
                    
                case 'l':
                    e.preventDefault();
                    if (this.isRunning) {
                        this.recordLap();
                    }
                    break;
                    
                case 'r':
                    e.preventDefault();
                    this.reset();
                    break;
                    
                case '1':
                    e.preventDefault();
                    this.startBtn.focus();
                    break;
                    
                case '2':
                    e.preventDefault();
                    this.pauseBtn.focus();
                    break;
                    
                case '3':
                    e.preventDefault();
                    this.lapBtn.focus();
                    break;
                    
                case '4':
                    e.preventDefault();
                    this.resetBtn.focus();
                    break;
            }
        });
    }
    
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.startTime = Date.now() - (this.hours * 3600000 + this.minutes * 60000 + this.seconds * 1000 + this.milliseconds);
            this.lastLapTime = this.startTime;
            
            this.startBtn.disabled = true;
            this.pauseBtn.disabled = false;
            this.lapBtn.disabled = false;
            
            this.display.parentElement.classList.add('running');
            
            if (this.soundToggle.checked) {
                this.startSound.currentTime = 0;
                this.startSound.play().catch(e => console.log('Audio play failed:', e));
            }
            
            this.timer = setInterval(() => this.updateTime(), 10);
            
            // Auto-lap if enabled
            if (this.autoLapToggle.checked) {
                this.autoLapTimer = setInterval(() => {
                    if (this.isRunning) {
                        this.recordLap();
                    }
                }, 60000); // Auto-lap every 60 seconds
            }
        }
    }
    
    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            clearInterval(this.timer);
            
            if (this.autoLapTimer) {
                clearInterval(this.autoLapTimer);
            }
            
            this.startBtn.disabled = false;
            this.pauseBtn.disabled = true;
            
            this.display.parentElement.classList.remove('running');
        }
    }
    
    reset() {
        this.pause();
        
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.milliseconds = 0;
        this.laps = [];
        
        this.updateDisplay();
        this.updateLapsList();
        this.updateStats();
        
        if (this.soundToggle.checked) {
            this.resetSound.currentTime = 0;
            this.resetSound.play().catch(e => console.log('Audio play failed:', e));
        }
    }
    
    updateTime() {
        const currentTime = Date.now();
        const elapsed = currentTime - this.startTime;
        
        this.hours = Math.floor(elapsed / 3600000);
        this.minutes = Math.floor((elapsed % 3600000) / 60000);
        this.seconds = Math.floor((elapsed % 60000) / 1000);
        this.milliseconds = Math.floor((elapsed % 1000) / 10);
        
        this.updateDisplay();
    }
    
    recordLap() {
        if (this.isRunning) {
            const currentTime = Date.now();
            const lapTime = currentTime - this.lastLapTime;
            this.lastLapTime = currentTime;
            
            const lapData = {
                number: this.laps.length + 1,
                time: lapTime,
                totalTime: currentTime - this.startTime
            };
            
            this.laps.push(lapData);
            
            if (this.soundToggle.checked) {
                this.lapSound.currentTime = 0;
                this.lapSound.play().catch(e => console.log('Audio play failed:', e));
            }
            
            this.updateLapsList();
            this.updateStats();
            
            // Add visual feedback
            this.lapBtn.classList.add('active');
            setTimeout(() => this.lapBtn.classList.remove('active'), 300);
        }
    }
    
    updateDisplay() {
        this.hoursEl.textContent = this.hours.toString().padStart(2, '0');
        this.minutesEl.textContent = this.minutes.toString().padStart(2, '0');
        this.secondsEl.textContent = this.seconds.toString().padStart(2, '0');
        this.millisecondsEl.textContent = this.milliseconds.toString().padStart(2, '0');
    }
    
    updateLapsList() {
        if (this.laps.length === 0) {
            this.lapsList.innerHTML = `
                <div class="no-laps">
                    <i class="fas fa-flag-checkered"></i>
                    <p>No lap times recorded yet</p>
                </div>
            `;
            return;
        }
        
        // Find fastest and slowest laps
        let fastestLap = Infinity;
        let slowestLap = 0;
        
        if (this.laps.length > 0) {
            fastestLap = Math.min(...this.laps.map(lap => lap.time));
            slowestLap = Math.max(...this.laps.map(lap => lap.time));
        }
        
        this.lapsList.innerHTML = this.laps.map((lap, index) => {
            const lapTimeFormatted = this.formatTime(lap.time);
            const totalTimeFormatted = this.formatTime(lap.totalTime);
            const isFastest = lap.time === fastestLap && this.laps.length > 1;
            const isSlowest = lap.time === slowestLap && this.laps.length > 1;
            
            let difference = '';
            if (index > 0) {
                const diff = lap.time - this.laps[index - 1].time;
                const diffFormatted = this.formatTime(Math.abs(diff));
                difference = diff >= 0 ? `+${diffFormatted}` : `-${diffFormatted}`;
            }
            
            return `
                <div class="lap-item ${isFastest ? 'lap-best' : ''} ${isSlowest ? 'lap-worst' : ''}">
                    <div class="lap-number">Lap ${lap.number}</div>
                    <div class="lap-time">${lapTimeFormatted}</div>
                    <div class="lap-difference">${difference}</div>
                </div>
            `;
        }).join('');
    }
    
    updateStats() {
        this.lapCountEl.textContent = this.laps.length;
        
        const totalElapsed = this.hours * 3600000 + this.minutes * 60000 + this.seconds * 1000 + this.milliseconds * 10;
        this.totalTimeEl.textContent = this.formatTime(totalElapsed);
        
        if (this.laps.length > 0) {
            const fastest = Math.min(...this.laps.map(lap => lap.time));
            const slowest = Math.max(...this.laps.map(lap => lap.time));
            
            this.fastestLapEl.textContent = this.formatTime(fastest);
            this.slowestLapEl.textContent = this.formatTime(slowest);
        } else {
            this.fastestLapEl.textContent = '--:--.--';
            this.slowestLapEl.textContent = '--:--.--';
        }
    }
    
    formatTime(milliseconds) {
        const hours = Math.floor(milliseconds / 3600000);
        const minutes = Math.floor((milliseconds % 3600000) / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);
        const ms = Math.floor((milliseconds % 1000) / 10);
        
        if (hours > 0) {
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
        } else {
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
        }
    }
    
    applyTheme(theme) {
        document.body.className = theme + '-theme';
    }
    
    saveSettings() {
        const settings = {
            sound: this.soundToggle.checked,
            autoLap: this.autoLapToggle.checked,
            theme: this.themeSelect.value
        };
        localStorage.setItem('stopwatchSettings', JSON.stringify(settings));
    }
    
    loadSettings() {
        const settings = JSON.parse(localStorage.getItem('stopwatchSettings')) || {
            sound: true,
            autoLap: false,
            theme: 'dark'
        };
        
        this.soundToggle.checked = settings.sound;
        this.autoLapToggle.checked = settings.autoLap;
        this.themeSelect.value = settings.theme;
        
        this.applyTheme(settings.theme);
    }
}

// Initialize stopwatch when page loads
document.addEventListener('DOMContentLoaded', () => {
    const stopwatch = new Stopwatch();
    
    // Add tooltip for keyboard shortcuts
    const addTooltip = (element, text) => {
        element.setAttribute('title', text);
    };
    
    addTooltip(stopwatch.startBtn, 'Keyboard shortcut: Space or S');
    addTooltip(stopwatch.pauseBtn, 'Keyboard shortcut: Space or S');
    addTooltip(stopwatch.lapBtn, 'Keyboard shortcut: L');
    addTooltip(stopwatch.resetBtn, 'Keyboard shortcut: R');
    
    // Add help text
    const helpText = document.createElement('div');
    helpText.className = 'shortcuts';
    helpText.innerHTML = '<i class="fas fa-keyboard"></i> Pro tip: Press Space to start/pause, L for lap, R for reset';
    document.querySelector('.controls').appendChild(helpText);
});