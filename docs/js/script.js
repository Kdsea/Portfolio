const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-links");

// Componente de Rodapé Reutilizável
const footer = document.querySelector("footer");
if (footer) {
    footer.innerHTML = `
        <p>Atualmente buscando novos desafios e times multidisciplinares.</p>
        <div class="social-links">
            <a href="https://www.linkedin.com/in/kau%C3%A3-de-souza-araujo-739073345/" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
            <a href="https://github.com/Kdsea" target="_blank" aria-label="GitHub"><i class="fab fa-github"></i></a>
        </div>
        <div class="footer-nav">
            <a href="index.html">Home</a>
            <a href="about.html">Sobre</a>
            <a href="projects.html">Projetos</a>
            <a href="entreemcontato.html">Contato</a>
        </div>
        <p class="copyright">&copy; <span id="year">${new Date().getFullYear()}</span> Kauã De Souza Araujo. Todos os direitos reservados.</p>
    `;
}

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("nav-active");
});

// Lógica do Formulário de Contato (WhatsApp)
const whatsappForm = document.getElementById('whatsappForm');

if (whatsappForm) {
    whatsappForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;
        const phoneNumber = "554499837746"; 
        
        const text = `Olá, meu nome é *${name}*.\n\n${message}`;
        const whatsappUrl = `https://wa.me/${5544998377476}?text=${encodeURIComponent(text)}`;
        
        window.open(whatsappUrl, '_blank');
    });
}

// Randomização dos Símbolos de Fundo
const symbols = document.querySelectorAll('.background-symbols span');

symbols.forEach((symbol) => {
    // Posição aleatória 
    const posX = Math.random() * 95;
    const posY = Math.random() * 95;
    
    // Tamanho e rotação aleatórios
    const size = Math.random() * 5 + 2; 
    const rotate = Math.random() * 360; 
    
    symbol.style.left = `${posX}%`;
    symbol.style.top = `${posY}%`;
    symbol.style.fontSize = `${size}rem`;
    symbol.style.transform = `rotate(${rotate}deg)`;
    
    // Variação na duração da animação para não ficarem sincronizados
    const duration = Math.random() * 10 + 10; // Entre 10s e 20s
    symbol.style.animationDuration = `${duration}s`;

    // Velocidade aleatória para o efeito Paralaxe (mais lento que a rolagem normal)
    const speed = Math.random() * 0.2 + 0.05; 
    symbol.dataset.speed = speed;
});

const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;

    // Paralaxe dos símbolos
    symbols.forEach((symbol) => {
        const speed = symbol.dataset.speed;
        // Move o símbolo para cima suavemente enquanto rola para baixo
        symbol.style.marginTop = `${-(scrollPosition * speed)}px`;
    });

    // Mostrar/Ocultar botão Voltar ao Topo
    if (backToTopBtn) {
        if (scrollPosition > 300) {
            backToTopBtn.style.display = "flex";
        } else {
            backToTopBtn.style.display = "none";
        }
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// Efeito de Digitação (Typewriter)
const typewriterElement = document.getElementById("typewriter");

if (typewriterElement) {
    const text = typewriterElement.getAttribute("data-text");
    typewriterElement.innerHTML = '<span class="cursor"></span>'; // Começa só com o cursor
    const cursor = typewriterElement.querySelector(".cursor");
    
    let charIndex = 0;
    
    function type() {
        if (charIndex < text.length) {
            // Insere a letra antes do cursor
            cursor.insertAdjacentHTML('beforebegin', text.charAt(charIndex));
            charIndex++;
            setTimeout(type, 100); // Velocidade da digitação (ms)
        } else {
            // Quando terminar de digitar, ativa o efeito glitch
            typewriterElement.classList.add("glitch-active");
        }
    }
    
    setTimeout(type, 1000); // Aguarda 1s antes de começar a digitar
}

// Animação de Scroll Reveal
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    var delay = 0; // Variável para controlar o atraso em cascata

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100; // Distância do topo para ativar

        if (elementTop < windowHeight - elementVisible) {
            if (!reveals[i].classList.contains("active")) {
                reveals[i].style.transitionDelay = `${delay}s`; // Aplica o delay dinâmico
                reveals[i].classList.add("active");
                delay += 0.2; // Aumenta 0.2s para o próximo elemento da lista
            }
        }
    }
}

window.addEventListener("scroll", reveal);
reveal(); // Verifica uma vez ao carregar a página

// Efeito de Glow e Tilt (Inclinação 3D) nos Cards
const cards = document.querySelectorAll('.card, .mini-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Cálculo do centro do cartão
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Cálculo da rotação (max 10 graus)
        const rotateX = ((y - centerY) / centerY) * -10; // Invertido para o efeito correto
        const rotateY = ((x - centerX) / centerX) * 10;
        
        // Atualiza variáveis CSS para o Glow
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);

        // Aplica a transformação 3D e remove o delay da transição para ficar fluido
        const lift = card.classList.contains('mini-card') ? -3 : -5; // Mantém a elevação original do hover
        card.style.transition = 'none';
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${lift}px)`;
    });

    card.addEventListener('mouseleave', () => {
        // Restaura a transição suave e remove a transformação
        card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
        card.style.transform = ''; // Volta ao estado original definido no CSS
    });
});

// Loader (Tela de Carregamento)
function hideLoader() {
    const loader = document.getElementById("loader-wrapper");
    if (loader) {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden"; 
    }
}

window.addEventListener("load", () => {
    const minLoadTime = 1000; // Tempo mínimo em milissegundos (1 segundo)
    const loadTime = performance.now(); // Tempo decorrido desde o início do carregamento
    const delay = loadTime < minLoadTime ? minLoadTime - loadTime : 0;
    setTimeout(hideLoader, delay);
});

// Fallback de segurança: Garante que o site abra após 5s mesmo se algo travar
setTimeout(hideLoader, 5000);

// Efeito de Partículas (Constelação)
const canvas = document.getElementById("particles-canvas");
if (canvas) {
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray;

    // Posição do mouse
    const mouse = {
        x: null,
        y: null,
        radius: 150
    }

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });
    
    window.addEventListener('mouseout', () => {
        mouse.x = undefined;
        mouse.y = undefined;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() * 1 - 0.5) * 0.5; // Velocidade lenta
            this.speedY = (Math.random() * 1 - 0.5) * 0.5;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Rebater nas bordas
            if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
            if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
        }
        draw() {
            ctx.fillStyle = 'rgba(168, 117, 255, 0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        // Número de partículas proporcional ao tamanho da tela
        let numberOfParticles = (canvas.height * canvas.width) / 10000;
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        requestAnimationFrame(animateParticles);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();

            // Conectar partículas próximas e ao mouse
            // Verifica a distância entre a partícula atual e o mouse
            if (mouse.x != null) {
                let dx = particlesArray[i].x - mouse.x;
                let dy = particlesArray[i].y - mouse.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(168, 117, 255, ${1 - distance / mouse.radius})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
            
            // Conexão entre partículas (opcional, consome mais processamento)
            for (let j = i; j < particlesArray.length; j++) {
                let dx = particlesArray[i].x - particlesArray[j].x;
                let dy = particlesArray[i].y - particlesArray[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(168, 117, 255, ${0.2 * (1 - distance / 100)})`; // Linha mais sutil entre partículas
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    initParticles();
    animateParticles();
}

// Lightbox (Galeria de Imagens)
const lightbox = document.getElementById('lightbox');
if (lightbox) {
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');
    const lightboxClose = document.querySelector('.lightbox-close');

    lightboxTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const card = trigger.closest('.card');
            const imgSrc = card.getAttribute('data-lightbox-src');
            
            if (imgSrc) {
                lightboxImg.setAttribute('src', imgSrc);
                lightbox.classList.add('active');
            }
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        // Opcional: remove a imagem para não carregar em background
        setTimeout(() => {
            lightboxImg.setAttribute('src', '');
        }, 400); // Tempo da transição do CSS
    };

    lightboxClose.addEventListener('click', closeLightbox);
    
    // Fecha ao clicar fora da imagem
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Efeito Ripple (Onda) nos Botões
const rippleButtons = document.querySelectorAll(".btn, .btn-whatsapp, #backToTop");

rippleButtons.forEach(btn => {
    btn.addEventListener("click", function(e) {
        const rect = btn.getBoundingClientRect();
        // Calcula a posição X e Y dentro do botão
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const circle = document.createElement("span");
        const diameter = Math.max(rect.width, rect.height);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${x - radius}px`;
        circle.style.top = `${y - radius}px`;
        circle.classList.add("ripple");

        btn.appendChild(circle);

        // Remove o elemento após a animação (600ms)
        setTimeout(() => {
            circle.remove();
        }, 600);
    });
});