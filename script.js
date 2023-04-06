document.addEventListener("DOMContentLoaded", function () {

    // Click event for sidebar toggle
    document.querySelector('#sidenavCollapse').addEventListener('click', function () {
        document.querySelector('#sidenav').classList.toggle('active');

        // Change icon
        document.querySelector('#sidenavCollapse').children[0].classList.toggle('fa-bars');
        document.querySelector('#sidenavCollapse').children[0].classList.toggle('fa-times');
    });
});