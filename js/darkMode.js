const sunIcon = document.querySelector('#sun-icon');
const moonIcon = document.querySelector('#moon-icon');
const darkMode = localStorage.getItem('darkMode') === 'true';

function setDarkMode(mode) {
    document.body.classList.toggle('dark', mode);
    localStorage.setItem('darkMode', mode);
}

function toggleIcons(sunDisplay, moonDisplay) {
    sunIcon.style.display = sunDisplay;
    moonIcon.style.display = moonDisplay;
}

function toggleDarkMode() {
    const isDark = !document.body.classList.contains('dark');
    setDarkMode(isDark);
    toggleIcons(isDark ? 'none' : 'block', isDark ? 'block' : 'none');
}

sunIcon.addEventListener('click', toggleDarkMode);
moonIcon.addEventListener('click', toggleDarkMode);

setDarkMode(darkMode);
toggleIcons(darkMode ? 'none' : 'block', darkMode ? 'block' : 'none');