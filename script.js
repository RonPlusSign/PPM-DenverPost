document.addEventListener("DOMContentLoaded", function (event) {

    // Click event for sidebar toggle
    document.querySelector('#sidenavCollapse').addEventListener('click', function () {
        document.querySelector('#sidenav').classList.toggle('active');

        // Change icon
        document.querySelector('#sidenavCollapse').children[0].classList.toggle('fa-bars');
        document.querySelector('#sidenavCollapse').children[0].classList.toggle('fa-times');
    });
});