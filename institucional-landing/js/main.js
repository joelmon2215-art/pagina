document.addEventListener('DOMContentLoaded', () => {
    // Menú móvil (si existe un botón .menu-toggle)
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('header nav');
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', nav.classList.contains('open'));
        });
    }

    // Scroll suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // cerrar menú en móvil si está abierto
                if (nav && nav.classList.contains('open')) nav.classList.remove('open');
            }
        });
    });

    // Slider simple para sección "Hitos" (.hitos-slider con .slides > .slide)
    function initSlider(selector) {
        const slider = document.querySelector(selector);
        if (!slider) return;

        const track = slider.querySelector('.slides');
        const slides = Array.from(slider.querySelectorAll('.slide'));
        const prevBtn = slider.querySelector('.prev');
        const nextBtn = slider.querySelector('.next');
        let index = 0;
        let slideWidth = slider.clientWidth;

        function update() {
            slideWidth = slider.clientWidth;
            track.style.transform = `translateX(-${index * slideWidth}px)`;
            // deshabilitar botones según límites
            if (prevBtn) prevBtn.disabled = index <= 0;
            if (nextBtn) nextBtn.disabled = index >= slides.length - 1;
        }

        function goTo(i) {
            index = Math.max(0, Math.min(i, slides.length - 1));
            update();
        }

        if (prevBtn) prevBtn.addEventListener('click', () => goTo(index - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => goTo(index + 1));

        // Soporte teclado
        slider.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') goTo(index - 1);
            if (e.key === 'ArrowRight') goTo(index + 1);
        });

        // Ajustar al redimensionar ventana
        window.addEventListener('resize', update);

        // Inicializar
        update();
    }
    initSlider('.hitos-slider');

    // Reveal on scroll para elementos con clase .reveal
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && reveals.length) {
        const obs = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        reveals.forEach(el => obs.observe(el));
    } else {
        // Fallback: mostrar todos
        reveals.forEach(el => el.classList.add('visible'));
    }

    // Botón "volver arriba"
    let backTop = document.querySelector('.back-to-top');
    if (!backTop) {
        // crear botón si no existe
        backTop = document.createElement('button');
        backTop.className = 'back-to-top';
        backTop.setAttribute('aria-label', 'Volver arriba');
        backTop.innerHTML = '↑';
        document.body.appendChild(backTop);
    }
    backTop.style.display = 'none';
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) backTop.style.display = 'block';
        else backTop.style.display = 'none';
    });
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});