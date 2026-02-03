
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
    