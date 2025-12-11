// ==================== FUNÇÃO PARA TROCAR DE SEÇÃO ====================
function showSection(sectionId) {
    // Esta função é chamada quando clica nos links do menu
    // Recebe como parâmetro o ID da seção que deve ser mostrada
    // Exemplo: showSection('planos') ou showSection('quem-sou-eu')
    
    // ===== PASSO 1: ESCONDER TODAS AS SEÇÕES =====
    document.querySelectorAll('.section').forEach(section => {
        // querySelectorAll pega TODOS os elementos com class="section"
        // forEach executa uma função para cada elemento encontrado
        
        section.classList.remove('active');
        // Remove a classe "active" de cada seção
        // Sem "active", o CSS faz a seção ficar escondida (display: none)
    });

    // ===== PASSO 2: DESMARCAR TODOS OS LINKS DO MENU =====
    document.querySelectorAll('header nav a').forEach(link => {
        // Pega todos os links <a> que estão dentro de <header> e <nav>
        
        link.classList.remove('active');
        // Remove a classe "active" de cada link
        // Sem "active", o sublinhado amarelo desaparece
    });

    // ===== PASSO 3: MOSTRAR A SEÇÃO CLICADA =====
    document.getElementById(sectionId).classList.add('active');
    // getElementById busca o elemento pelo ID
    // Exemplo: se sectionId = 'planos', busca <div id="planos">
    // classList.add('active') adiciona a classe "active"
    // Com "active", o CSS faz a seção aparecer (display: flex)

    // ===== PASSO 4: MARCAR O LINK ATIVO =====
    if (event.target.tagName === 'A') {
        // event.target = elemento que foi clicado
        // tagName = tipo da tag HTML
        // Verifica se o elemento clicado é um link <a>
        
        event.target.classList.add('active');
        // Adiciona "active" no link clicado
        // O CSS mostra o sublinhado amarelo
    }

    // ===== PASSO 5: ROLAR A PÁGINA PARA O TOPO =====
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // scrollTo move a página para uma posição específica
    // top: 0 = topo da página (posição 0 pixels)
    // behavior: 'smooth' = rolagem suave (animada)
    // Se fosse 'auto', pularia instantaneamente
}

// RESUMO DO FUNCIONAMENTO:
// 1. Usuário clica em "Planos" ou "Quem sou eu"
// 2. A função showSection é executada
// 3. Todas as seções ficam escondidas
// 4. Todos os links do menu perdem o destaque
// 5. A seção escolhida aparece
// 6. O link clicado ganha destaque (sublinhado amarelo)
// 7. A página rola suavemente para o topo
