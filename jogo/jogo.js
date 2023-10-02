// Seleciona todos os elementos com a classe "celula" e os armazena em uma lista.
const celulas = document.querySelectorAll(".celula");

// Inicializa a variável checarTurno como verdadeira.
let checarTurno = true;

// Inicializa a variável turno, que será usado para alternar entre "X" e "O".
let turno;

// Define constantes para representar os jogadores "X" e "O".
const JOGADOR_X = "X";
const JOGADOR_O = "O";

// Inicializa a variável jogoAcabou como falso, indicando que o jogo está em andamento.
let jogoAcabou = false;

// Adiciona um evento de clique ao documento que é acionado quando qualquer elemento é clicado.
document.addEventListener("click", (event) => {
    // Verifica se o elemento clicado possui a classe "celula" e se o jogo ainda não acabou.
    if (event.target.matches(".celula") && !jogoAcabou) {
        // Chama a função jogar, passando o ID do elemento clicado como argumento.
        jogar(event.target.id);
    }
});

// Função que representa a jogada de um jogador.
function jogar(id) {
    // Obtém o elemento com o ID correspondente ao argumento passado.
    const celula = document.getElementById(id);

    // Verifica se o conteúdo da célula está vazio, ou seja, se ainda não foi jogado.
    if (celula.textContent === "") {
        // Determina qual jogador está fazendo a jogada com base na variável checarTurno.
        turno = checarTurno ? JOGADOR_X : JOGADOR_O;

        // Inverte o valor da variável checarTurno para alternar entre os jogadores.
        checarTurno = !checarTurno;

        // Define o conteúdo da célula como o símbolo do jogador atual.
        celula.textContent = turno;

        // Adiciona a classe correspondente ao jogador atual à célula para estilização.
        celula.classList.add(turno);

        // Remove o evento de clique da célula para evitar jogadas repetidas.
        celula.removeEventListener("click", jogar);

        // Chama a função verificarVencedor para verificar se o jogador atual venceu.
        verificarVencedor(turno);
    }
}

function verificarVencedor(jogador) {
    // Definindo um array de arrays chamado combinacoesVitoria, 
    //que representa todas as combinações possíveis de vitória no jogo da velha.
    const combinacoesVitoria = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // Iterando sobre todas as combinações possíveis de vitória.
    for (const combinacao of combinacoesVitoria) {
        // Desestruturando o array de combinação em três variáveis a, b e c.
        const [a, b, c] = combinacao;

        // Verificando se as células nas posições a, b e c possuem o mesmo texto (jogador) e se sim, o jogador venceu.
        if (
            celulas[a].textContent === jogador &&
            celulas[b].textContent === jogador &&
            celulas[c].textContent === jogador
        ) {
            // Se o jogador vencer, definimos a variável jogoAcabou como true e exibimos um alerta informando o vencedor.
            jogoAcabou = true;
            alert(`O jogador ${jogador} venceu!`);
            return; // Encerra a função, pois já sabemos o vencedor.
        }
    }

    // Verificando se todas as células foram preenchidas (não estão vazias). 
    //Se todas estiverem preenchidas e nenhum jogador vencer, é um empate.
    if ([...celulas].every((celula) => celula.textContent !== "")) {
        // Se for um empate, definimos a variável jogoAcabou como true e exibimos um alerta informando o empate.
        jogoAcabou = true;
        alert("Empate!");
    }
}
