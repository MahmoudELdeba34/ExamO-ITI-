  // ! Get references to the form inputs and the send button
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const sendButton = document.getElementById('sendButton');

  // ? Function to check if all fields are filled
  function checkForm() {
      if (
          nameInput.value.trim() !== '' &&
          emailInput.value.trim() !== '' &&
          subjectInput.value.trim() !== '' &&
          messageInput.value.trim() !== ''
      ) {
          sendButton.disabled = false; // ? Enable the button
      } else {
          sendButton.disabled = true; // ? Disable the button
      }
  }

  // ! Add event listeners to all input fields
  nameInput.addEventListener('input', checkForm);
  emailInput.addEventListener('input', checkForm);
  subjectInput.addEventListener('input', checkForm);
  messageInput.addEventListener('input', checkForm);

  // ! Handle Contact Form Submission
  document.getElementById('contactForm').addEventListener('submit', function (e) {
      e.preventDefault();

      // ! Get Form Data
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const subject = subjectInput.value.trim();
      const message = messageInput.value.trim();

      // ! Simple Validation
      if (name === '' || email === '' || subject === '' || message === '') {
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Please fill in all fields!',
          });
          return;
      }

      // ! Simulate Form Submission (You can replace this with AJAX or backend logic)
      Swal.fire({
          icon: 'success',
          title: 'Message Sent!',
          text: 'Your message has been sent successfully.',
      }).then(() => {
          document.getElementById('contactForm').reset(); // ? Clear the form
          sendButton.disabled = true; // ? Disable the button after submission
      });
  });

  // ? Highlight Active Nav Item
  const currentPage = window.location.pathname.split('/').pop();
  const navItems = document.querySelectorAll('.navbar-nav .nav-item');

  navItems.forEach(item => {
      const link = item.querySelector('.nav-link').getAttribute('href');
      if (link === currentPage) {
          item.classList.add('active');
      }
  });