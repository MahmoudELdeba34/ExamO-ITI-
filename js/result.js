// ? Retrieve result from localStorage
 const examResult = JSON.parse(localStorage.getItem('examResult'));

 if (examResult) {
     const correctAnswers = examResult.correctAnswers;
     const incorrectAnswers = examResult.incorrectAnswers;
     const totalQuestions = 30; // ! toltal questions
     const scorePercentage = (correctAnswers / totalQuestions) * 100;

     document.getElementById('correct-answers').textContent = correctAnswers;
     document.getElementById('incorrect-answers').textContent = incorrectAnswers;
     document.getElementById('total-score').textContent = `${correctAnswers} / ${totalQuestions}`;

     const resultMessage = document.getElementById('result-message');
     if (scorePercentage >= 50) {
         resultMessage.textContent = "Congratulations! You passed!";
         resultMessage.classList.add('pass');
     } else {
         resultMessage.textContent = "Unfortunately, you did not pass. Better luck next time.";
         resultMessage.classList.add('fail');
     }
 }