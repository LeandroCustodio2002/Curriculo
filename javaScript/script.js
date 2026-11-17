// Menu mobile + carregamento dos projetos.
(function () {
    const navToggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('nav');
    const backdrop = document.getElementById('nav-backdrop');

    function setMenu(open) {
        if (!nav || !navToggle) return;

        nav.classList.toggle('is-open', open);
        navToggle.setAttribute('aria-expanded', String(open));
        navToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');

        if (backdrop) backdrop.hidden = !open;
        document.body.style.overflow = open ? 'hidden' : '';
    }

    if (navToggle && nav) {
        navToggle.addEventListener('click', function () {
            setMenu(nav.classList.contains('is-open') === false);
        });

        nav.addEventListener('click', function (event) {
            if (event.target.closest('a')) setMenu(false);
        });
    }

    if (backdrop) {
        backdrop.addEventListener('click', function () {
            setMenu(false);
        });
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') setMenu(false);
    });

    // Fecha o menu ao voltar para o layout desktop.
    window.matchMedia('(min-width: 861px)').addEventListener('change', function (event) {
        if (event.matches) setMenu(false);
    });
})();

(function () {
    const list = document.getElementById('projects-list');
    if (!list) return;

    function escapeHtml(value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
            return {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            }[char];
        });
    }

    function render(projects) {
        list.innerHTML = projects.map(function (project) {
            const name = escapeHtml(project.name);
            return `
            <article class="project">
                <div class="project__media">
                    <img src="${escapeHtml(project.image)}" alt="Captura de tela do projeto ${name}" loading="lazy">
                </div>
                <div class="project__body">
                    <h3>${name}</h3>
                    <p>${escapeHtml(project.description)}</p>
                    <a class="btn btn--block" href="${escapeHtml(project.link)}" target="_blank" rel="noopener">
                        Acessar projeto
                    </a>
                </div>
            </article>`;
        }).join('');
    }

    fetch('javaScript/data.json')
        .then(function (response) {
            if (!response.ok) throw new Error('HTTP ' + response.status);
            return response.json();
        })
        .then(render)
        .catch(function (error) {
            console.error('Não foi possível carregar os projetos:', error);
            list.innerHTML = '<p class="projects-status">Não foi possível carregar os projetos agora. Confira no <a href="https://github.com/ImOutOfBounds" target="_blank" rel="noopener">GitHub</a>.</p>';
        });
})();
