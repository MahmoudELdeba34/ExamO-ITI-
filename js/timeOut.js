// ! Retrieve the result from localStorage (if it is stored)
  const score = localStorage.getItem('examScore') || '0';
  document.getElementById('score').textContent = score;