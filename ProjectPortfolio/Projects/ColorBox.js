  
        // DOM Elements
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
    