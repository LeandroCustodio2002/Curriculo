// Alterna entre tema claro e escuro e guarda a preferência no navegador.
(function () {
    const root = document.documentElement;
    const toggle = document.getElementById('theme-toggle');
    const themeColor = document.querySelector('meta[name="theme-color"]');
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    function readStored() {
        try {
            return localStorage.getItem('theme');
        } catch (e) {
            return null;
        }
    }

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);

        if (toggle) {
            const isDark = theme === 'dark';
            toggle.setAttribute('aria-pressed', String(isDark));
            toggle.setAttribute('aria-label', isDark ? 'Ativar tema claro' : 'Ativar tema escuro');

            const icon = toggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-sun', isDark);
                icon.classList.toggle('fa-moon', !isDark);
            }
        }

        if (themeColor) {
            themeColor.setAttribute('content', theme === 'dark' ? '#121519' : '#1a1d23');
        }
    }

    applyTheme(root.getAttribute('data-theme') || 'light');

    if (toggle) {
        toggle.addEventListener('click', function () {
            const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(next);

            try {
                localStorage.setItem('theme', next);
            } catch (e) {
                /* localStorage indisponível (modo privado): tema vale só nesta sessão. */
            }
        });
    }

    // Acompanha o sistema enquanto o usuário não escolher um tema manualmente.
    media.addEventListener('change', function (event) {
        if (!readStored()) {
            applyTheme(event.matches ? 'dark' : 'light');
        }
    });
})();
