// ? Handle the Yes button click
document.getElementById("yesButton").addEventListener("click", function () {
    // ! Get the selected exam type from localStorage
    const examType = localStorage.getItem("selectedExam");

    if (examType) {
        // ! Redirect to the exam page with the selected exam type
        window.location.href = `examQustions.html?exam=${examType}`;
    } else {
        alert("No exam selected. Please go back and choose an exam.");
    }
});

// ? Handle the No button click
document.getElementById("noButton").addEventListener("click", function () {
    window.location.href = "index.html";
});
//!----------------------------------------------------------------------------------------
// Example: Save a selected exam type in localStorage for testing
// This can be set on a previous page where the user chooses the exam
// Example: localStorage.setItem("selectedExam", "html"); // ! HTML Exam
//!-----------------------------------------------------------------------------------------