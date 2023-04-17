const scrollThreshold = 64; // 64px, like the height of the sticky navbar
window.onscroll = stickyNavbarOnScroll;	// Sticky navbar on scroll
window.onload = function () {
    dateForWeatherWidget();	// Calculate current date for weather widget

    // TODO: Cookie with disclaimer
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
function onUserIconClick(element) {
    // Change chevron
    element.children[1].classList.toggle('fa-chevron-down');
    element.children[1].classList.toggle('fa-chevron-up');
    // TODO: Show right sidenav
}

// Click event for sidebar toggle
function onLeftSidenavToggle(sidenavCollapseBtn) {
    // Change icon
    sidenavCollapseBtn.children[0].classList.toggle('fa-bars');
    sidenavCollapseBtn.children[0].classList.toggle('fa-times');

    // Close everything else
    if (isSearchbarOpen()) closeSearchbar();

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

function toggleSearchbar(element) {
    // Change icon
    element.children[0].classList.toggle('fa-search');
    element.children[0].classList.toggle('fa-times');

    // Close everything else
    if (isLeftSidenavOpen()) closeLeftSidenav();

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