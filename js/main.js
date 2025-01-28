// ? Toggle mobile menu
document.getElementById('mobile-menu').addEventListener('click', function () {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
});
$(document).ready(function() {
    if (localStorage.getItem('dark-mode') === 'enabled') {
        $('body').addClass('dark-mode');
        $('#dark-mode-icon').removeClass('fa-moon').addClass('fa-sun');
    }
    $('#dark-mode-icon').click(function() {
        $('body').toggleClass('dark-mode');
        $('#dark-mode-icon').toggleClass('fa-moon fa-sun');
        if ($('body').hasClass('dark-mode')) {
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            localStorage.setItem('dark-mode', 'disabled');
        }
    });
});