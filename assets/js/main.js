document.addEventListener('DOMContentLoaded', () => {
            const reveals = document.querySelectorAll('.reveal');
            
            const revealOptions = {
                threshold: 0.1,
                rootMargin: "0px 0px -20px 0px"
            };

            const revealOnScroll = new IntersectionObserver(function(entries, observer) {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('active');
                });
            }, revealOptions);

            reveals.forEach(reveal => {
                revealOnScroll.observe(reveal);
            });

            // Menu Mobile
            const nav = document.querySelector('nav');
            const menuBtn = document.getElementById('mobile-menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');

            if (nav && menuBtn && mobileMenu) {
                const setMenu = (open) => {
                    nav.classList.toggle('menu-open', open);
                    menuBtn.setAttribute('aria-expanded', String(open));
                    menuBtn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
                    mobileMenu.setAttribute('aria-hidden', String(!open));
                };

                menuBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    setMenu(!nav.classList.contains('menu-open'));
                });

                // Fecha ao escolher um link, ao tocar fora ou ao apertar Esc
                mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
                document.addEventListener('click', (e) => {
                    if (!nav.contains(e.target)) setMenu(false);
                });
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') setMenu(false);
                });
                window.addEventListener('resize', () => {
                    if (window.innerWidth >= 1024) setMenu(false);
                });
            }

            // Vídeo inteligente: só baixa/toca quando está perto de aparecer e pausa quando sai da tela.
            // No celular ele fica abaixo do texto, então não disputa a internet com o que aparece primeiro.
            const heroVideo = document.querySelector('#hero-media-wrapper video');
            if (heroVideo) {
                new IntersectionObserver(([entry]) => {
                    if (entry.isIntersecting) {
                        heroVideo.play().catch(() => {});
                    } else {
                        heroVideo.pause();
                    }
                }, { rootMargin: '200px 0px' }).observe(heroVideo);
            }

            // Efeito Parallax/Continuidade no Vídeo da Hero
            const heroMediaWrapper = document.getElementById('hero-media-wrapper');
            const heroDeco1 = document.getElementById('hero-deco-1');
            const heroDeco2 = document.getElementById('hero-deco-2');
            
            if (heroMediaWrapper) {
                // Usando requestAnimationFrame para otimizar o scroll
                let ticking = false;
                window.addEventListener('scroll', () => {
                    if (!ticking) {
                        window.requestAnimationFrame(() => {
                            // Verifica se é Desktop (telas >= 1024px)
                            if (window.innerWidth >= 1024) {
                                const scrollY = window.scrollY;
                                
                                // Apenas aplica o efeito enquanto estivermos na hero ou um pouco abaixo
                                if (scrollY < window.innerHeight * 1.5) {
                                    // O vídeo desce (parallax), mantendo continuidade para a próxima seção
                                    const moveY = scrollY * 0.45; 
                                    const scale = 1 + (scrollY * 0.0003); // Zoom suave
                                    
                                    heroMediaWrapper.style.transform = `translateY(${moveY}px) scale(${scale})`;
                                    
                                    // Os elementos decorativos se movem em velocidades diferentes para criar profundidade
                                    if (heroDeco1) heroDeco1.style.transform = `translateY(${scrollY * 0.25}px)`;
                                    if (heroDeco2) heroDeco2.style.transform = `translateY(${scrollY * 0.15}px)`;
                                }
                            } else {
                                // No Mobile limpa qualquer transform residual para não cortar o vídeo
                                heroMediaWrapper.style.transform = 'none';
                                if (heroDeco1) heroDeco1.style.transform = 'none';
                                if (heroDeco2) heroDeco2.style.transform = 'none';
                            }
                            ticking = false;
                        });
                        ticking = true;
                    }
                });
            }
        });
    