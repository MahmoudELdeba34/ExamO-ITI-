// ? password 
function togglePasswordVisibility(id) {
    const passwordInput = document.getElementById(id);
    const toggleIcon = passwordInput.nextElementSibling;
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.textContent = "🙈"; 
    } else {
        passwordInput.type = "password";
        toggleIcon.textContent = "👁️"; 
    }
}

const form = document.getElementById('registerForm');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    document.querySelectorAll('.error').forEach(error => error.textContent = ''); // ? Clear previous error messages

    // ? Get input values
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    let valid = true;

    // ! Validation
    const namePattern = /^[A-Za-z]{2,}$/;
    if (!namePattern.test(firstName)) {
        document.getElementById('errorFirstName').textContent = 'First name must contain only letters and be at least 2 characters long.';
        valid = false;
    }
    if (!namePattern.test(lastName)) {
        document.getElementById('errorLastName').textContent = 'Last name must contain only letters and be at least 2 characters long.';
        valid = false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById('errorEmail').textContent = 'Enter a valid email.';
        valid = false;
    }

    if (password.length < 6) {
        document.getElementById('errorPassword').textContent = 'Password must be at least 6 characters.';
        valid = false;
    }
    if (password !== confirmPassword) {
        document.getElementById('errorConfirmPassword').textContent = 'Passwords do not match.';
        valid = false;
    }

    // ? Check if email already exists in localStorage
    const existingUser = localStorage.getItem('user');
    if (existingUser) {
        const parsedUser = JSON.parse(existingUser);
        if (parsedUser.email === email) {
            Swal.fire({
                title: 'Error!',
                text: 'This email is already registered. Please log in.',
                icon: 'error',
                position: 'top-center',
                showConfirmButton: false
            });
            return; 
        }
    }

    // ? If valid, save to localStorage
    if (valid) {
        const userData = {
            firstName,
            lastName,
            email,
            password
        };
        localStorage.setItem('user', JSON.stringify(userData));

        Swal.fire({
            title: 'Success!',
            text: 'Your registration was successful.',
            icon: 'success',
            position: 'center',  
            showConfirmButton: true,
            timer: 1500
        }).then(() => {
            form.reset(); // ! Clear the form
            window.location.href = "SignIn.html"; // ! Redirect to SignIn.html
        });
    }
});
