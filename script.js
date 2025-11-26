lucide.createIcons();

// 1. Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('bg-black/95', 'shadow-lg', 'py-4');
        navbar.classList.remove('bg-gradient-to-b', 'py-6');
    } else {
        navbar.classList.remove('bg-black/95', 'shadow-lg', 'py-4');
        navbar.classList.add('bg-gradient-to-b', 'py-6');
    }
});

// 2. Reveal on Scroll Logic
const observerOptions = { threshold: 0.15 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);
document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));

// 3. Countdown Logic
function updateCountdown() {
    const targetDate = new Date("January 1, 2026 00:00:00").getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days.toString().padStart(3, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
    }
}
setInterval(updateCountdown, 1000);
updateCountdown();

/* --- 4. TUTORIAL ENGINE (Consolidado) --- */

const steps = [
    // Parte 1: Página do Produtor (Identidade)
    {
        target: '#producer-mockup-logo',
        title: 'Identidade Preservada',
        text: 'Aqui sua marca brilha. No Café Direto, não escondemos quem produz. Seu logo é o destaque principal da página, fortalecendo seu nome no mercado.'
    },
    {
        target: '#tour-video',
        title: 'Storytelling Visual',
        text: 'Um espaço nobre para seu vídeo institucional. Conecte-se emocionalmente com o consumidor mostrando o rosto e a terra de quem faz o café acontecer.'
    },
    // Parte 2: O Marketplace
    {
        target: '#tour-shop-header',
        title: 'Sua Vitrine Virtual',
        text: 'Apresentamos o marketplace: um ambiente elegante, "dark mode", desenhado para transmitir sofisticação e valorizar a qualidade premium dos seus grãos.'
    },
    {
        target: '#tour-filters',
        title: 'Busca Especializada',
        text: 'Ferramenta essencial para o público exigente. Seus clientes encontram seus produtos filtrando por detalhes técnicos: Nível de Torra, Processamento e Notas.'
    },
    {
        target: '#tour-product-card',
        title: 'Foco no Produto',
        text: 'Cards otimizados para despertar desejo. Fotos imersivas que ganham cor ao interagir, mantendo o foco total no visual do grão e da embalagem.'
    },
    {
        target: '#tour-tags',
        title: 'Educação Sensorial',
        text: 'Destaque as notas sensoriais únicas do seu terroir (como Chocolate ou Nozes) diretamente na vitrine, ajudando o cliente a escolher o perfil ideal.'
    }
];

let currentStep = 0;
const overlay = document.getElementById('tutorial-overlay');
const highlightBox = document.getElementById('highlight-box');
const tooltipCard = document.getElementById('tooltip-card');
const startBtn = document.getElementById('start-tutorial-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

function startTour() {
    currentStep = 0;
    overlay.classList.remove('hidden');
    startBtn.classList.add('hidden');
    updateTour();
    document.body.style.overflow = 'hidden'; 
}

function endTour() {
    overlay.classList.add('hidden');
    startBtn.classList.remove('hidden');
    highlightBox.style.opacity = '0';
    tooltipCard.classList.remove('active');
    document.body.style.overflow = 'auto';
    window.scrollTo({top: 0, behavior: 'smooth'});
}

function nextStep() {
    if (currentStep < steps.length - 1) {
        currentStep++;
        updateTour();
    } else {
        endTour();
    }
}

function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        updateTour();
    }
}

function updateTour() {
    const step = steps[currentStep];
    const targetEl = document.querySelector(step.target);
    
    if (!targetEl) return;

    // Scroll to element
    targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Update Text
    document.getElementById('step-count').innerText = `Passo ${currentStep + 1}/${steps.length}`;
    document.getElementById('tooltip-title').innerText = step.title;
    document.getElementById('tooltip-text').innerText = step.text;

    // Update Buttons
    prevBtn.disabled = currentStep === 0;
    if (currentStep === steps.length - 1) {
        nextBtn.innerHTML = 'Finalizar <i data-lucide="check" class="w-3 h-3"></i>';
    } else {
        nextBtn.innerHTML = 'Próximo <i data-lucide="arrow-right" class="w-3 h-3"></i>';
    }

    // Calculate Position after delay
    setTimeout(() => {
        const rect = targetEl.getBoundingClientRect();
        
        // Set Highlight Box
        highlightBox.style.top = rect.top + 'px';
        highlightBox.style.left = rect.left + 'px';
        highlightBox.style.width = rect.width + 'px';
        highlightBox.style.height = rect.height + 'px';
        highlightBox.style.opacity = '1';

        // --- SMART POSITIONING ENGINE ---
        const tooltipRect = tooltipCard.getBoundingClientRect();
        const tooltipW = tooltipRect.width;
        const tooltipH = tooltipRect.height;
        
        const vpW = window.innerWidth;
        const vpH = window.innerHeight;
        const pad = 20; // Gap between element and tooltip

        // Helper: Clamp value to keep tooltip inside viewport
        const clamp = (val, min, max) => Math.max(min, Math.min(val, max));

        // Define candidate positions
        const candidates = [
            {
                side: 'bottom',
                space: vpH - rect.bottom,
                top: rect.bottom + pad,
                left: rect.left + (rect.width / 2) - (tooltipW / 2),
                check: () => (vpH - rect.bottom) >= (tooltipH + pad)
            },
            {
                side: 'top',
                space: rect.top,
                top: rect.top - tooltipH - pad,
                left: rect.left + (rect.width / 2) - (tooltipW / 2),
                check: () => rect.top >= (tooltipH + pad)
            },
            {
                side: 'right',
                space: vpW - rect.right,
                top: rect.top + (rect.height / 2) - (tooltipH / 2),
                left: rect.right + pad,
                check: () => (vpW - rect.right) >= (tooltipW + pad)
            },
            {
                side: 'left',
                space: rect.left,
                top: rect.top + (rect.height / 2) - (tooltipH / 2),
                left: rect.left - tooltipW - pad,
                check: () => rect.left >= (tooltipW + pad)
            }
        ];

        // 1. Try to find a side that fits perfectly
        let bestPos = candidates.find(c => c.check());

        // 2. If no perfect fit, pick the side with the MOST available space
        if (!bestPos) {
            bestPos = candidates.reduce((prev, curr) => 
                (curr.space > prev.space) ? curr : prev
            );
        }

        // 3. Apply coordinates with clamping to ensure it stays on screen
        // We clamp the 'secondary' axis. 
        // E.g. If on Bottom, we clamp Left/Right. If on Right, we clamp Top/Bottom.
        
        let finalTop = bestPos.top;
        let finalLeft = bestPos.left;

        if (bestPos.side === 'bottom' || bestPos.side === 'top') {
            finalLeft = clamp(finalLeft, pad, vpW - tooltipW - pad);
        } else {
            finalTop = clamp(finalTop, pad, vpH - tooltipH - pad);
        }

        // 4. Final safety clamp (in case the primary axis was forced despite no space)
        // This might cause overlap, but keeping it on screen is priority #1 if element is huge.
        finalTop = clamp(finalTop, pad, vpH - tooltipH - pad);
        finalLeft = clamp(finalLeft, pad, vpW - tooltipW - pad);

        tooltipCard.style.top = finalTop + 'px';
        tooltipCard.style.left = finalLeft + 'px';
        tooltipCard.classList.add('active');
        
    }, 600); 
}
