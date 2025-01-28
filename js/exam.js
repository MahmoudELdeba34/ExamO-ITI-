        // ? Set user name from localStorage
        document.addEventListener("DOMContentLoaded", function () {
            const user = JSON.parse(localStorage.getItem("user"));

            if (user && user.firstName && user.lastName) {
                const userNameElement = document.getElementById("userName");
                userNameElement.textContent = `${user.firstName} ${user.lastName}`;
            } else {
                // ! Redirect to signin if user data not found
                window.location.href = "signin.html";
            }
        });
        // ? Function to start the exam
        function startExam(examType) {
            // ! Save the selected exam in localStorage
            localStorage.setItem("selectedExam", examType);
            //  ! Redirect to the Ready page
            window.location.href = "ready.html";
        }
