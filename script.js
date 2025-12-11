function showSection(sectionId) {
    // Remove active de todas as seções
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Remove active de todos os links do menu
    document.querySelectorAll('header nav a').forEach(link => {
        link.classList.remove('active');
    });

    // Adiciona active na seção clicada
    document.getElementById(sectionId).classList.add('active');

    // Adiciona active no link clicado
    if (event.target.tagName === 'A') {
        event.target.classList.add('active');
    }

    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
