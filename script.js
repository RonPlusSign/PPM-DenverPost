const scrollThreshold = 64; // 64px, like the height of the sticky navbar

window.onload = function () {
    dateForWeatherWidget();	// Calculate current date for weather widget

    // TODO: Cookie with disclaimer
}

// Sticky navbar on scroll
window.onscroll = function () {
    // If page is scrolled, show navbar as fixed and add logo to it
    const scroll = document.documentElement.scrollTop || document.body.scrollTop;
    document.querySelector('.nav-primary-middle').classList.toggle('hidden', scroll > scrollThreshold);
    document.querySelector('.nav-primary-bottom').classList.toggle('hidden', scroll > scrollThreshold);
    document.querySelector('#sticky-navbar').classList.toggle('fixed-top', scroll > scrollThreshold);
    document.querySelector('#sticky-navbar-logo').classList.toggle('hidden', scroll <= scrollThreshold);
};

// Show right sidenav with login/subscribe and change chevron
function onUserIconClick(element) {
    // Change chevron
    element.children[1].classList.toggle('fa-chevron-down');
    element.children[1].classList.toggle('fa-chevron-up');
    // TODO: Show right sidenav
}

// Click event for sidebar toggle
function onLeftSidenavToggle(sidenavCollapseBtn) {
    if (Array.from(document.querySelector('#sidenav-left').classList).includes('active')) {
        const scroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (scroll <= scrollThreshold) {
            document.querySelector('#sticky-navbar').classList.remove('fixed-top');
            document.querySelector('#sticky-navbar-logo').classList.add('hidden');
        }
    } else {
        document.querySelector('#sticky-navbar').classList.add('fixed-top');
        document.querySelector('#sticky-navbar-logo').classList.remove('hidden');
    }

    document.querySelector('#sidenav-left').classList.toggle('active');
    document.querySelector('body').classList.toggle('overlay');

    // Change icon
    sidenavCollapseBtn.children[0].classList.toggle('fa-bars');
    sidenavCollapseBtn.children[0].classList.toggle('fa-times');
}

function toggleFooterMenu(element) {
    document.querySelectorAll('.menu-item').forEach((menu) => {
        if (Array.from(menu.children[0].children).includes(element))
            menu.children[1].classList.toggle('shrink');
    });
}

function dateForWeatherWidget() {
    // Get current date with format "Day, Month Nth YYYY"
    const date = new Date();
    const day = date.toLocaleString('en-us', {weekday: 'long'});
    const month = date.toLocaleString('en-us', {month: 'long'});
    const dayNumber = date.getDate();
    const year = date.getFullYear();

    // Get cardinal suffix for the day number (e.g. 1st, 2nd, 3rd, 4th, ...)
    const cardinalSuffix = (dayNumber) => {
        if (dayNumber > 3 && dayNumber < 21) return 'th';
        switch (dayNumber % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    }

    // Set date in weather widget
    document.querySelector('#weather-date').innerHTML = `${day}, ${month} ${dayNumber}${cardinalSuffix(dayNumber)} ${year}`;
    document.querySelector('#weather-date-sidenav').innerHTML = `${day}, ${month} ${dayNumber}${cardinalSuffix(dayNumber)} ${year}`;
}