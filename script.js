// ==================== FUNÇÃO PARA TROCAR DE SEÇÃO ====================
function showSection(sectionId) {
    // Esconde todas as seções
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Desmarca todos os links do menu
    document.querySelectorAll('header nav a').forEach(link => {
        link.classList.remove('active');
    });

    // Mostra a seção clicada
    document.getElementById(sectionId).classList.add('active');

    // Marca o link ativo
    const linkClicado = document.querySelector(`header nav a[onclick*="${sectionId}"]`);
    if (linkClicado) {
        linkClicado.classList.add('active');
    }

    // Rola a página para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==================== AGUARDA O DOM CARREGAR ====================
document.addEventListener('DOMContentLoaded', function() {
    
    const numero = '5521990122092';
    
    // ========== 1. BOTÃO FLUTUANTE WHATSAPP: APENAS DÚVIDAS ==========
    const btnWhatsappFlutuante = document.querySelector('.whatsapp-button');
    if (btnWhatsappFlutuante) {
        const mensagemDuvida = 'Olá! Poderia me ajudar, tenho dúvidas';
        btnWhatsappFlutuante.href = `https://api.whatsapp.com/send?phone=${numero}&text=${encodeURIComponent(mensagemDuvida)}`;
    }
    
    // ========== 2. BOTÕES "QUERO ESTE PLANO" NOS CARDS ==========
    const botoesContratar = document.querySelectorAll('.btn-contratar');
    
    botoesContratar.forEach(botao => {
        botao.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const planoCard = this.closest('.plan');
            const nomePlano = planoCard.getAttribute('data-plano');
            
            const mensagem = `Olá! Quero contratar o Plano ${nomePlano}`;
            const linkWhatsApp = `https://api.whatsapp.com/send?phone=${numero}&text=${encodeURIComponent(mensagem)}`;
            
            window.open(linkWhatsApp, '_blank');
        });
    });
    
    // ========== 3. FORMULÁRIO MULTI-ETAPAS ==========
    const form = document.getElementById('multiStepForm');
    if (!form) return;
    
    const steps = document.querySelectorAll('.form-step');
    const progressFill = document.getElementById('progressFill');
    const progressSteps = document.querySelectorAll('.step');
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    const btnSubmit = document.getElementById('btnSubmit');
    
    let currentStep = 1;
    const totalSteps = steps.length;
    
    // Atualiza a visualização das etapas
    function updateStep() {
        // Esconde todas as etapas
        steps.forEach(step => step.classList.remove('active'));
        
        // Mostra etapa atual
        const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
        if (currentStepElement) {
            currentStepElement.classList.add('active');
        }
        
        // Atualiza barra de progresso
        const progress = (currentStep / totalSteps) * 100;
        progressFill.style.width = progress + '%';
        
        // Atualiza indicadores de etapa
        progressSteps.forEach((step, index) => {
            const stepNumber = index + 1;
            step.classList.remove('active', 'completed');
            
            if (stepNumber < currentStep) {
                step.classList.add('completed');
            } else if (stepNumber === currentStep) {
                step.classList.add('active');
            }
        });
        
        // Controla botões
        btnPrev.style.display = currentStep === 1 ? 'none' : 'flex';
        
        if (currentStep === totalSteps) {
            btnNext.style.display = 'none';
            btnSubmit.style.display = 'flex';
        } else {
            btnNext.style.display = 'flex';
            btnSubmit.style.display = 'none';
        }
        
        // Rola para o topo do formulário
        const formSection = document.querySelector('.form-section');
        if (formSection) {
            formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    // Valida campos da etapa atual
    function validateCurrentStep() {
        const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
        const inputs = currentStepElement.querySelectorAll('input[required], select[required], textarea[required]');
        
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#f44336';
                
                input.addEventListener('input', function() {
                    this.style.borderColor = '#e0e0e0';
                }, { once: true });
            }
        });
        
        if (!isValid) {
            alert('Por favor, preencha todos os campos obrigatórios antes de continuar.');
        }
        
        return isValid;
    }
    
    // Botão Próximo
    if (btnNext) {
        btnNext.addEventListener('click', function() {
            if (validateCurrentStep()) {
                currentStep++;
                updateStep();
            }
        });
    }
    
    // Botão Voltar
    if (btnPrev) {
        btnPrev.addEventListener('click', function() {
            currentStep--;
            updateStep();
        });
    }
    
    // Envio do formulário
    if (form) {
        form.addEventListener('submit', function(e) {
            if (!validateCurrentStep()) {
                e.preventDefault();
                return;
            }
            
            // Previne o envio padrão para mostrar mensagem
            e.preventDefault();
            
            // Aqui você pode fazer o envio real via fetch/AJAX
            // Por enquanto, vamos simular:
            
            const formSuccess = document.getElementById('formSuccess');
            if (formSuccess) {
                formSuccess.style.display = 'block';
            }
            
            // Volta para a seção de planos após 2 segundos
            setTimeout(function() {
                showSection('planos');
                form.reset();
                currentStep = 1;
                updateStep();
                if (formSuccess) {
                    formSuccess.style.display = 'none';
                }
            }, 2000);
        });
    }
    
    // Inicializa o formulário
    updateStep();
});
