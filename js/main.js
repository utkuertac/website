(function () {
    const html = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const metaThemeColor = document.getElementById('meta-theme-color');
    const navbar = document.querySelector('nav.navbar');
    const langToggle = document.getElementById('langToggle');
    const langEmoji = document.getElementById('langEmoji');

    // Apply theme (light/dark)
    function applyTheme(theme) {
        const isDark = theme === 'dark';
        html.setAttribute('data-bs-theme', isDark ? 'dark' : 'light');

        if (navbar) {
            navbar.classList.toggle('navbar-dark', isDark);
            navbar.classList.toggle('navbar-light', !isDark);
        }

        if (themeIcon) {
            themeIcon.src = isDark
                ? 'https://img.icons8.com/color/48/sun--v1.png'
                : 'https://img.icons8.com/color/48/new-moon.png';
            themeIcon.alt = isDark ? 'Switch to light theme' : 'Switch to dark theme';
        }

        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', isDark ? '#000000' : '#ffffff');
        }

        try {
            localStorage.setItem('theme', theme);
        } catch (e) {}
    }

    // Apply language (English/Turkish)
    function applyLanguage(lang) {
        const isEn = lang === 'en';
        html.setAttribute('lang', lang);

        // Update all elements that have both data-en and data-tr
        document.querySelectorAll('[data-en][data-tr]').forEach(el => {
            const text = isEn ? el.getAttribute('data-en') : el.getAttribute('data-tr');
            if (text) {
                el.textContent = text;
            }
        });

        // Update flag to show target language
        if (langEmoji && langToggle) {
            if (isEn) {
                langEmoji.textContent = '🇹🇷';
                langToggle.setAttribute('aria-label', "Switch to Turkish");
            } else {
                langEmoji.textContent = '🇬🇧';
                langToggle.setAttribute('aria-label', 'Switch to English');
            }
        }

        try {
            localStorage.setItem('lang', lang);
        } catch (e) {}
    }

    // Initialize saved settings
    let savedTheme = 'dark';
    let savedLang = 'en';

    try {
        savedTheme = localStorage.getItem('theme') || 'dark';
        savedLang = localStorage.getItem('lang') || 'en';
    } catch (e) {}

    applyTheme(savedTheme);
    applyLanguage(savedLang);

    // Theme toggle event
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = html.getAttribute('data-bs-theme') === 'dark' ? 'dark' : 'light';
            const next = current === 'dark' ? 'light' : 'dark';
            applyTheme(next);
        });
    }

    // Language toggle event
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const current = html.getAttribute('lang') === 'tr' ? 'tr' : 'en';
            const next = current === 'en' ? 'tr' : 'en';
            applyLanguage(next);
        });
    }
})();