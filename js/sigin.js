document.addEventListener("DOMContentLoaded", function () {
    const signInButton = document.querySelector(".btn-register");

    signInButton.addEventListener("click", function () {
        // ? Get input values
        const emailInput = document.querySelector('input[type="email"]').value.trim().toLowerCase();
        const passwordInput = document.querySelector('input[type="password"]').value.trim();

        // ? Check if fields are filled
        if (!emailInput || !passwordInput) {
            Swal.fire({
                title: "Error!",
                text: "Please fill in all fields.",
                icon: "warning",
                confirmButtonText: "OK"
            });
            return;
        }

        // ? Retrieve user data from localStorage
        const existingUser = localStorage.getItem("user");

        if (existingUser) {
            const parsedUser = JSON.parse(existingUser);

            // ! Validate credentials
            const storedEmail = parsedUser.email.trim().toLowerCase();
            const storedPassword = parsedUser.password;

            if (storedEmail === emailInput && storedPassword === passwordInput) {
                Swal.fire({
                    title: "Success!",
                    text: "You have signed in successfully.",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    window.location.href = "exams.html";
                });
            } else {
                Swal.fire({
                    title: "Error!",
                    text: "Invalid email or password.",
                    icon: "error",
                    confirmButtonText: "Try Again"
                });
            }
        } else {
            Swal.fire({
                title: "Error!",
                text: "No account found with this email. Please register first.",
                icon: "error",
                confirmButtonText: "Register"
            }).then(() => {
                window.location.href = "register.html";
            });
        }
    });
});
