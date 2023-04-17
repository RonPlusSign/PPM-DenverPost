const scrollThreshold = 64; // 64px, like the height of the sticky navbar
window.onscroll = stickyNavbarOnScroll;	// Sticky navbar on scroll
window.onload = function () {
    dateForWeatherWidget();	// Calculate current date for weather widget

    // Open disclaimer if not accepted (local storage value is set to true)
    if (localStorage.getItem('disclaimerAccepted') !== 'true') {
        document.querySelector('#disclaimer').classList.add('visible');
        document.querySelector('body').classList.add('overlay');
    }
}

function acceptDisclaimer() {
    // Set disclaimer accepted in local storage
    localStorage.setItem('disclaimerAccepted', 'true');

    // Hide disclaimer
    document.querySelector('#disclaimer').classList.remove('visible');
    document.querySelector('body').classList.remove('overlay');
}

function stickyNavbarOnScroll() {
    // If page is scrolled, show navbar as fixed and add logo to it
    const scroll = document.documentElement.scrollTop || document.body.scrollTop;
    document.querySelector('.nav-primary-middle').classList.toggle('hidden', scroll > scrollThreshold);
    document.querySelector('.nav-primary-bottom').classList.toggle('hidden', scroll > scrollThreshold);

    if (scroll > scrollThreshold) showStickyNavbar();
    else hideStickyNavbar();
}

// Show right sidenav with login/subscribe and change chevron
function onRightSidenavToggle() {
    // Close everything else
    if (isLeftSidenavOpen()) closeLeftSidenav();
    if (isSearchbarOpen()) closeSearchbar();

    // Toggle sidenav
    if (isRightSidenavOpen()) closeRightSidenav();
    else {
        showStickyNavbar();
        openRightSidenav();
    }
}

// Click event for sidebar toggle
function onLeftSidenavToggle() {
    // Close everything else
    if (isSearchbarOpen()) closeSearchbar();
    if (isRightSidenavOpen()) closeRightSidenav();

    // Toggle sidenav
    if (isLeftSidenavOpen()) closeLeftSidenav();
    else {
        showStickyNavbar();
        openLeftSidenav();
    }
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

function toggleSearchbar() {
    // Close everything else
    if (isLeftSidenavOpen()) closeLeftSidenav();
    if (isRightSidenavOpen()) closeRightSidenav();

    // Toggle searchbar
    if (isSearchbarOpen()) closeSearchbar();
    else {
        showStickyNavbar();
        openSearchbar();
    }
}

function isLeftSidenavOpen() {
    return Array.from(document.querySelector('#sidenav-left').classList).includes('active');
}

function isSearchbarOpen() {
    return Array.from(document.querySelector('#searchbar').classList).includes('active');
}

function showStickyNavbar() {
    document.querySelector('#sticky-navbar').classList.add('fixed-top');
    document.querySelector('#sticky-navbar-logo').classList.remove('hidden');
}

function hideStickyNavbar() {
    document.querySelector('#sticky-navbar').classList.remove('fixed-top');
    document.querySelector('#sticky-navbar-logo').classList.add('hidden');
}

function closeLeftSidenav() {
    document.querySelector('#sidenav-left').classList.remove('active');
    document.querySelector('body').classList.remove('overlay');
    document.querySelector('#sidenav-left-toggle-btn').children[0].classList.remove('fa-times');
    document.querySelector('#sidenav-left-toggle-btn').children[0].classList.add('fa-bars');
    stickyNavbarOnScroll();
}

function openLeftSidenav() {
    document.querySelector('#sidenav-left').classList.add('active');
    document.querySelector('body').classList.add('overlay');
    document.querySelector('#sidenav-left-toggle-btn').children[0].classList.remove('fa-bars');
    document.querySelector('#sidenav-left-toggle-btn').children[0].classList.add('fa-times');
}

function openSearchbar() {
    document.querySelector('#searchbar').classList.add('active');
    document.querySelector('body').classList.add('overlay');
    document.querySelector('#searchbar-toggle-btn').children[0].classList.remove('fa-search');
    document.querySelector('#searchbar-toggle-btn').children[0].classList.add('fa-times');
}

function closeSearchbar() {
    document.querySelector('#searchbar').classList.remove('active');
    document.querySelector('body').classList.remove('overlay');
    document.querySelector('#searchbar-toggle-btn').children[0].classList.remove('fa-times');
    document.querySelector('#searchbar-toggle-btn').children[0].classList.add('fa-search');
    stickyNavbarOnScroll();
}

function isRightSidenavOpen() {
    return Array.from(document.querySelector('#sidenav-right').classList).includes('active');
}

function openRightSidenav() {
    document.querySelector('#sidenav-right').classList.add('active');
    document.querySelector('body').classList.add('overlay');
    document.querySelector('#sidenav-right-toggle-btn').children[1].classList.remove('fa-chevron-down');
    document.querySelector('#sidenav-right-toggle-btn').children[1].classList.add('fa-chevron-up');
}

function closeRightSidenav() {
    document.querySelector('#sidenav-right').classList.remove('active');
    document.querySelector('body').classList.remove('overlay');
    document.querySelector('#sidenav-right-toggle-btn').children[1].classList.remove('fa-chevron-up');
    document.querySelector('#sidenav-right-toggle-btn').children[1].classList.add('fa-chevron-down');
}