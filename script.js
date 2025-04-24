document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');
    const forgotPasswordLink = document.getElementById('forgotPassword');
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const toast = document.getElementById('toast');
    const closeToast = toast.querySelector('.close');
    
    // Toggle between sign-in and sign-up forms
    registerBtn.addEventListener('click', () => {
        container.classList.add('sign-in-mode');
    });
    
    loginBtn.addEventListener('click', () => {
        container.classList.remove('sign-in-mode');
    });
    
    // Forgot password link
    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Password Reset', 'A password reset link has been sent to your email.');
    });
    
    // Close toast notification
    closeToast.addEventListener('click', () => {
        toast.classList.remove('active');
    });
    
    // Register form validation
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('regUsername').value.trim();
        const email = document.getElementById('regEmail').value.trim();
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regConfirmPassword').value;
        
        // Reset error messages
        resetErrors();
        
        let isValid = true;
        
        // Username validation
        if (username.length < 3) {
            document.getElementById('usernameError').textContent = 'Username must be at least 3 characters';
            document.getElementById('usernameError').style.display = 'block';
            isValid = false;
        }
        
        // Email validation
        if (!validateEmail(email)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address';
            document.getElementById('emailError').style.display = 'block';
            isValid = false;
        }
        
        // Password validation
        if (password.length < 6) {
            document.getElementById('passwordError').textContent = 'Password must be at least 6 characters';
            document.getElementById('passwordError').style.display = 'block';
            isValid = false;
        }
        
        // Confirm password validation
        if (password !== confirmPassword) {
            document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
            document.getElementById('confirmPasswordError').style.display = 'block';
            isValid = false;
        }
        
        if (isValid) {
            // In a real app, you would send this data to a backend
            showToast('Registration Successful', 'You have successfully registered!');
            registerForm.reset();
            
            // Simulate redirect after successful registration
            setTimeout(() => {
                container.classList.remove('sign-in-mode');
            }, 2000);
        }
    });
    
    // Login form validation
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        
        // Reset error messages
        resetErrors();
        
        let isValid = true;
        
        // Email validation
        if (!validateEmail(email)) {
            document.getElementById('loginEmailError').textContent = 'Please enter a valid email address';
            document.getElementById('loginEmailError').style.display = 'block';
            isValid = false;
        }
        
        // Password validation
        if (password.length < 6) {
            document.getElementById('loginPasswordError').textContent = 'Password must be at least 6 characters';
            document.getElementById('loginPasswordError').style.display = 'block';
            isValid = false;
        }
        
        if (isValid) {
            // In a real app, you would send this data to a backend
            showToast('Login Successful', 'Welcome back! Redirecting to dashboard...');
            loginForm.reset();
            
            // Simulate redirect after successful login
            setTimeout(() => {
                // window.location.href = 'dashboard.html';
                showToast('Note', 'In a real app, this would redirect to dashboard');
            }, 2000);
        }
    });
    
    // Helper function to validate email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Helper function to reset all error messages
    function resetErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => {
            error.textContent = '';
            error.style.display = 'none';
        });
    }
    
    // Show toast notification
    function showToast(title, message) {
        const toastTitle = toast.querySelector('.text-1');
        const toastMessage = toast.querySelector('.text-2');
        const progress = toast.querySelector('.progress');
        
        toastTitle.textContent = title;
        toastMessage.textContent = message;
        
        toast.classList.add('active');
        progress.classList.add('active');
        
        setTimeout(() => {
            toast.classList.remove('active');
        }, 5000); // Hide after 5 seconds
        
        setTimeout(() => {
            progress.classList.remove('active');
        }, 5300);
    }
    
    // Add animation to input fields when focused
    const inputGroups = document.querySelectorAll('.input-group');
    inputGroups.forEach(group => {
        const input = group.querySelector('input');
        const icon = group.querySelector('i');
        
        input.addEventListener('focus', () => {
            group.style.transform = 'translateY(-5px)';
            icon.style.color = '#667eea';
        });
        
        input.addEventListener('blur', () => {
            group.style.transform = 'translateY(0)';
            if (!input.value) {
                icon.style.color = '#666';
            }
        });
    });
});