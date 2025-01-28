        // !  Highlight Active Nav Item
        const currentPage = window.location.pathname.split('/').pop();
        const navItems = document.querySelectorAll('.navbar-nav .nav-item');

        navItems.forEach(item => {
            const link = item.querySelector('.nav-link').getAttribute('href');
            if (link === currentPage) {
                item.classList.add('active');
            }
        });