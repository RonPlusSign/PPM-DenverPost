document.addEventListener("DOMContentLoaded", function () {

    // Click event for sidebar toggle
    document.querySelector('#sidenavCollapse').addEventListener('click', function () {
        document.querySelector('#sidenav').classList.toggle('active');

        // Change icon
        document.querySelector('#sidenavCollapse').children[0].classList.toggle('fa-bars');
        document.querySelector('#sidenavCollapse').children[0].classList.toggle('fa-times');
    });
});

// Sticky navbar on scroll
window.onscroll = function () {
    // If page is scrolled, show navbar as fixed and add logo to it
    const scroll = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollThreshold = 64; // 64px, like the height of the sticky navbar
    document.querySelector('.nav-primary-middle').classList.toggle('hidden', scroll > scrollThreshold);
    document.querySelector('.nav-primary-bottom').classList.toggle('hidden', scroll > scrollThreshold);
    document.querySelector('#sticky-navbar').classList.toggle('fixed-top', scroll > scrollThreshold);
    document.querySelector('#sticky-navbar-logo').classList.toggle('hidden', scroll <= scrollThreshold);
};
