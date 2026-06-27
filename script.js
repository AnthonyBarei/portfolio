'use strict';

const STATUS_COLORS = { up: '#5f7d5a', down: '#b15842', dev: '#6f7c8c' };

const PROJECTS = [
    { name: 'Atelier', desc: "Wiki pour campagnes de JdR : gestion de campagnes, joueurs et personnages, fiches interactives, lancer de dés, édition Markdown collaborative (Tiptap) et bien d'autres outils.", status: 'up', link: 'https://atelier.anthonybarei.fr' },
    { name: 'Remuzat', desc: 'Réservation de la maison de vacances familiale, en Drôme provençale.', status: 'up', link: 'https://remuzat.anthonybarei.fr' },
    { name: "Aravella's Grimoire", desc: 'Base de données et API de contenu D&D 5e, alimentées par scraping — sorts, monstres, objets magiques.', status: 'up', link: 'https://grimoire.anthonybarei.fr' },
    { name: 'D&D Discord Bot', desc: "Envoi quotidien d'une question liée à un personnage de JdR sur un salon Discord.", status: 'up', link: 'https://github.com/AnthonyBarei' },
    { name: 'Banderythmo', desc: 'Outil pro de bande rythmo : import de médias, clips, mèmes, GIF, audio, enregistrement et exports. React + Vite, FastAPI, Whisper, ffmpeg.', status: 'dev', link: null },
    { name: 'Homelab', desc: 'Infrastructure self-hosted sur mini PC : Jellyfin + arr stack, Vaultwarden, Nextcloud, Home Assistant, Frigate NVR, WireGuard, Cloudflare Tunnel — le tout orchestré sous Docker.', status: 'dev', link: null },
    { name: 'StremioCacheProcessor', desc: 'Gestion du cache Stremio pour récupérer les fichiers déjà vus et téléchargés.', status: 'dev', link: 'https://github.com/AnthonyBarei' },
    { name: 'Shield Converter', desc: 'Convertit les codecs vidéo incompatibles (AV1, etc.) en HEVC pour le Direct Play sur NVIDIA Shield TV Pro avec Jellyfin.', status: 'dev', link: 'https://github.com/AnthonyBarei' },
    { name: 'MusicRecap', desc: "Le récap annuel Spotify… avant celui de Spotify : stats de playlists, top artistes et habitudes via l'API Spotify.", status: 'down', link: null },
    { name: 'pmpp', desc: "Site personnel : ajout de clips, chat entre amis et plein d'outils rigolos.", status: 'down', link: null },
];

const SKILLS = [
    { label: 'Back-end', items: ['PHP', 'Laravel', 'Python', 'FastAPI', 'API REST'] },
    { label: 'Front-end', items: ['React', 'Vue.js', 'TypeScript', 'JavaScript', 'Tailwind CSS'] },
    { label: 'Data & search', items: ['MySQL', 'Elasticsearch', 'OpenSearch', 'SQL avancé'] },
    { label: 'DevOps & infra', items: ['Docker', 'Linux', 'Git', 'Cloudflare', 'Sentry'] },
    { label: 'Multimédia', items: ['ffmpeg', 'Whisper', 'Jellyfin', 'Icecast'] },
    { label: 'Outils', items: ['Cursor IDE', 'Claude Code', 'Linear', 'Notion'] },
];

const TIMELINE = [
    { year: '2015', title: 'BTS SIO', org: 'Lycée Jean-Jacques Rousseau, Montmorency' },
    { year: '2016', title: 'Stage développeur', org: 'Lakota Solutions, Fosses — refonte site vitrine' },
    { year: '2017', title: 'Stage développeur PHP', org: 'Milliweb, Paris — agence' },
    { year: '2017', title: 'Licence Pro Informatique', org: 'CY Cergy Paris Université' },
    { year: '2017', title: 'Développeur Web', org: 'Streamakaci, Paris — streaming & webcasting (alternance)' },
    { year: '2018', title: 'Développeur Full-Stack', org: 'Mediactive Group, Paris — 7 ans (CDI)' },
    { year: '2025', title: 'Développeur Full-Stack', org: 'NumerikVodka — CDD full remote, 7 mois' },
    { year: '2026', title: 'Développeur Full-Stack', org: 'Mediactive Events Solutions — CDI' },
];

const LINKS = [
    { label: 'Github', href: 'https://github.com/AnthonyBarei' },
    { label: 'Linkedin', href: 'https://www.linkedin.com/in/anthony-barei-768b76144/' },
    { label: 'CV', href: 'CV_Anthony_Barei.pdf' },
];

function el(tag, attrs, children) {
    const node = document.createElement(tag);
    if (attrs) {
        for (const [k, v] of Object.entries(attrs)) {
            if (k === 'class') node.className = v;
            else if (k === 'style') node.style.cssText = v;
            else node.setAttribute(k, v);
        }
    }
    for (const c of children || []) {
        node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    }
    return node;
}

function renderSkills() {
    const root = document.getElementById('skills');
    SKILLS.forEach((g, i) => {
        const tags = g.items.map((s) => el('span', { class: 'skill-tag' }, [s]));
        const card = el('div', { class: 'reveal skill-card', 'data-delay': String(i * 70) }, [
            el('div', { class: 'skill-card-label' }, [g.label]),
            el('div', { class: 'skill-items' }, tags),
        ]);
        root.appendChild(card);
    });
}

function renderTimeline() {
    const root = document.getElementById('timeline');
    TIMELINE.forEach((t, i) => {
        const item = el('div', { class: 'reveal timeline-item', 'data-delay': String(i * 80) }, [
            el('span', { class: 'node' }),
            el('div', { class: 'timeline-head' }, [
                el('span', { class: 'timeline-year' }, [t.year]),
                el('span', { class: 'timeline-title' }, [t.title]),
            ]),
            el('div', { class: 'timeline-org' }, [t.org]),
        ]);
        root.appendChild(item);
    });
}

function renderProjects() {
    const root = document.getElementById('projects');
    PROJECTS.forEach((p, i) => {
        const color = STATUS_COLORS[p.status];
        const head = [el('span', { class: 'project-name' }, [p.name])];
        if (p.link) head.push(el('span', { class: 'project-ext' }, ['↗']));

        const badge = el('span', {
            class: 'badge',
            style: 'color:' + color + ';background:' + color + '18;',
        }, [
            el('span', { class: 'badge-dot', style: 'background:' + color + ';' }),
            p.status.charAt(0).toUpperCase() + p.status.slice(1),
        ]);

        const card = el('a', {
            class: 'reveal project',
            href: p.link || '#',
            'data-delay': String(i * 60),
            ...(p.link ? { target: '_blank', rel: 'noopener' } : {}),
        }, [
            el('div', { class: 'project-info' }, [
                el('div', { class: 'project-head' }, head),
                el('div', { class: 'project-desc' }, [p.desc]),
            ]),
            badge,
        ]);
        root.appendChild(card);
    });
}

function renderLinks() {
    const root = document.getElementById('links');
    LINKS.forEach((l) => {
        const a = el('a', { class: 'contact-link', href: l.href, target: '_blank', rel: 'noopener' }, [
            el('span', { class: 'arrow' }, ['→']),
            l.label,
        ]);
        root.appendChild(a);
    });
}

function setYears() {
    const start = new Date(2018, 9, 1); // octobre 2018
    const now = new Date();
    let y = now.getFullYear() - start.getFullYear();
    if (now.getMonth() < start.getMonth()) y -= 1;
    document.querySelectorAll('[data-years]').forEach((node) => { node.textContent = y; });
}

function bindGlow() {
    const glow = document.getElementById('glow');
    if (!glow) return;
    window.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });
}

function revealVisible() {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    document.querySelectorAll('.reveal:not(.shown)').forEach((node) => {
        const r = node.getBoundingClientRect();
        if (r.top < vh * 0.94 && r.bottom > 0) {
            const d = +(node.getAttribute('data-delay') || 0);
            node.style.transitionDelay = (d / 1000) + 's';
            node.classList.add('shown');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderSkills();
    renderTimeline();
    renderProjects();
    renderLinks();
    setYears();

    bindGlow();
    window.addEventListener('scroll', revealVisible, { passive: true });
    window.addEventListener('resize', revealVisible, { passive: true });

    revealVisible();
    setTimeout(revealVisible, 60);
    setTimeout(revealVisible, 260);
});
