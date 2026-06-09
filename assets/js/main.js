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
    