//FAQ
const perguntas = document.querySelectorAll('.pergunta');
perguntas.forEach((pergunta) => {
    pergunta.addEventListener('click', function () {
        this.classList.toggle('active');
        const resposta = this.nextElementSibling;
        resposta.classList.toggle('show'); 
    });
});