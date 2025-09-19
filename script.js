// Smooth scrolling para links de navegação com compensação do header fixo
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;

        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 0;
        const targetTop = target.getBoundingClientRect().top + window.pageYOffset - (headerHeight + 10);

        window.scrollTo({
            top: targetTop,
            behavior: 'smooth'
        });
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#FFFFFF';
        header.style.backdropFilter = 'none';
    }
});

// Intersection Observer para animações
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animações aos elementos
document.addEventListener('DOMContentLoaded', function() {
    // Elementos para animar
    const animatedElements = document.querySelectorAll('.module, .benefit, .testimonial, .about-text, .section-header');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Animação dos números das estatísticas
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
});

// Função para animar números
function animateNumber(element) {
    const finalNumber = element.textContent;
    const isDecimal = finalNumber.includes('.');
    const duration = 2000;
    const increment = isDecimal ? 0.1 : 1;
    let current = 0;
    const target = parseFloat(finalNumber);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (isDecimal) {
            element.textContent = current.toFixed(1);
        } else {
            element.textContent = Math.floor(current) + (finalNumber.includes('+') ? '+' : '');
        }
    }, duration / (target / increment));
}

// Efeito parallax suave no hero (limitado ao hero e com deslocamento máximo)
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    const parallaxElements = document.querySelectorAll('.big-five-visual');
    if (!hero || parallaxElements.length === 0) return;

    const rect = hero.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    // Apenas quando o hero estiver visível
    if (rect.bottom <= 0 || rect.top >= windowHeight) return;

    const progress = 1 - Math.max(0, Math.min(1, rect.top / windowHeight)); // 0 a 1 conforme entra na tela
    const maxTranslate = 60; // limite em px para não invadir a próxima seção

    parallaxElements.forEach(element => {
        const speed = 0.6;
        const translate = Math.min(maxTranslate, progress * windowHeight * 0.2 * speed);
        element.style.transform = `translateY(${translate}px)`;
    });
});

// Adicionar efeito hover nos botões CTA
document.querySelectorAll('.btn-primary, .btn-cta').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.02)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Efeito de digitação no título principal
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Aplicar efeito de digitação quando a página carregar
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.hero h1');
    const originalText = heroTitle.textContent;
    
    // Pequeno delay para garantir que tudo carregou
    setTimeout(() => {
        typeWriter(heroTitle, originalText, 50);
    }, 500);
});

// Adicionar animação de pulso nos ícones dos traços
document.addEventListener('DOMContentLoaded', function() {
    const traits = document.querySelectorAll('.trait');
    
    traits.forEach((trait, index) => {
        setTimeout(() => {
            trait.style.animation = `float 3s ease-in-out infinite, pulse 2s ease-in-out infinite`;
        }, index * 200);
    });
    
    // FAQ acordeão
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        btn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            // fecha todos
            faqItems.forEach(i => {
                i.classList.remove('active');
                const b = i.querySelector('.faq-question');
                const a = i.querySelector('.faq-answer');
                const ic = i.querySelector('.faq-icon');
                if (b && a && ic) {
                    b.setAttribute('aria-expanded', 'false');
                    a.setAttribute('aria-hidden', 'true');
                    ic.textContent = '+';
                }
            });
            // abre o clicado se não estava ativo
            if (!isActive) {
                item.classList.add('active');
                btn.setAttribute('aria-expanded', 'true');
                answer.setAttribute('aria-hidden', 'false');
                if (icon) icon.textContent = '−';
            }
        });
    });
});

// CSS para animação de pulso (adicionado via JavaScript)
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    .trait:hover {
        transform: scale(1.1) !important;
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(style);

// Contador de visitantes simulado (opcional)
function updateVisitorCount() {
    const count = Math.floor(Math.random() * 50) + 150; // Entre 150-200
    const visitorElement = document.querySelector('.visitor-count');
    if (visitorElement) {
        visitorElement.textContent = `${count} pessoas visualizando agora`;
    }
}

// Atualizar contador a cada 30 segundos
setInterval(updateVisitorCount, 30000);

// Adicionar efeito de loading suave
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Validação e tracking de cliques nos botões CTA
document.querySelectorAll('a[href*="hotmart"]').forEach(button => {
    button.addEventListener('click', function(e) {
        // Aqui você pode adicionar tracking analytics
        console.log('Clique no botão CTA registrado');
        
        // Adicionar efeito visual de confirmação
        const originalText = this.textContent;
        this.textContent = 'Redirecionando...';
        this.style.background = 'linear-gradient(45deg, #27AE60, #2ECC71)';
        
        setTimeout(() => {
            this.textContent = originalText;
            this.style.background = '';
        }, 1500);
    });
});

// Adicionar indicador de scroll
const scrollIndicator = document.createElement('div');
scrollIndicator.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #FF6B6B, #FFE66D, #4ECDC4);
    z-index: 9999;
    transition: width 0.3s ease;
`;
document.body.appendChild(scrollIndicator);

window.addEventListener('scroll', function() {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollIndicator.style.width = scrollPercent + '%';
});

// Menu mobile (caso seja necessário no futuro)
function createMobileMenu() {
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelector('.nav-links');
    
    // Criar botão hamburger
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '☰';
    hamburger.style.cssText = `
        display: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--primary);
    `;
    
    nav.appendChild(hamburger);
    
    // Funcionalidade do menu mobile
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('mobile-active');
    });
    
    // CSS para menu mobile
    const mobileStyle = document.createElement('style');
    mobileStyle.textContent = `
        @media (max-width: 768px) {
            .hamburger {
                display: block !important;
            }
            
            .nav-links {
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: white;
                flex-direction: column;
                padding: 1rem;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .nav-links.mobile-active {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
        }
    `;
    document.head.appendChild(mobileStyle);
}

// Inicializar menu mobile
createMobileMenu();
