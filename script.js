var jogadores = [];
var numerosSorteados = [];
var interval;
var numeroAtual = 0;
var vencedorEncontrado = false;

function gerarNumerosAleatorios(quantidade, min, max) {
    if (quantidade > (max - min)) {
        console.log("Intervalo insuficiente ...");
        return;
    }

    var numeros = [];

    while (numeros.length < quantidade) {
        var aleatorio = Math.floor(Math.random() * (max - min + 1)) + min;

        if (!numeros.includes(aleatorio)) {
            numeros.push(aleatorio);
        }
    }

    return numeros;
}

function gerarCartela() {
    var nomeJogador = prompt('Digite o nome do jogador');

    var cartela = [
        gerarNumerosAleatorios(5, 1, 15),
        gerarNumerosAleatorios(5, 16, 30),
        gerarNumerosAleatorios(5, 31, 45),
        gerarNumerosAleatorios(5, 46, 60),
        gerarNumerosAleatorios(5, 61, 75)
    ];

    jogadores.push({
        nomeJogador: nomeJogador,
        cartela: cartela
    });

    desenharCartela(nomeJogador, cartela);
}

function reiniciarJogo() {
    jogadores = [];
    numerosSorteados = [];
    numeroAtual = 0;
    vencedorEncontrado = false;
    document.getElementById('espaco_cartelas').innerHTML = '';
    document.getElementById('numeros_sorteados').innerHTML = '';
    clearInterval(interval);
    var numerosCartela = document.getElementsByClassName('bingo-cell');

    for (var i = 0; i < numerosCartela.length; i++) {
        numerosCartela[i].classList.remove('sorteado');
    }
}

function desenharCartela(nome, cartela) {
    var div = document.getElementById('espaco_cartelas');

    var tabela = document.createElement('table');
    tabela.classList.add('bingo-card');

    var caption = document.createElement('caption');
    caption.innerText = nome;

    var thead = document.createElement('thead');
    var thB = document.createElement('th');
    var thI = document.createElement('th');
    var thN = document.createElement('th');
    var thG = document.createElement('th');
    var thO = document.createElement('th');

    thead.appendChild(thB);
    thead.appendChild(thI);
    thead.appendChild(thN);
    thead.appendChild(thG);
    thead.appendChild(thO);

    tabela.appendChild(caption);
    tabela.appendChild(thead);

    for (var i = 0; i < 5; i++) {
        var tr = document.createElement('tr');

        for (var j = 0; j < 5; j++) {
            var td = document.createElement('td');

            if (i === 2 && j === 2) {
                td.classList.add('center-cell');
                td.innerText = 'x';
            } else {
                td.classList.add('bingo-cell');
                td.innerText = cartela[i][j];
            }

            tr.appendChild(td);
        }

        tabela.appendChild(tr);
    }

    div.appendChild(tabela);
}

function iniciarSorteioAutomatico() {
    if (numerosSorteados.length === 75) {
        alert('Todos os números já foram sorteados!');
        return;
    }

    interval = setInterval(sortearNumeroAutomatico, 100);
}

function sortearNumeroAutomatico() {
    if (numerosSorteados.length === 75 || vencedorEncontrado) {
        clearInterval(interval);
        alert('Pelo menos uma cartela foi completa, veja quem foi o vencedor!');
        return;
    }

    var numeroSorteado;
    do {
        numeroSorteado = Math.floor(Math.random() * 75) + 1;
    } while (numerosSorteados.includes(numeroSorteado));

    numerosSorteados.push(numeroSorteado);
    numeroAtual++;

    var numerosSorteadosElement = document.getElementById('numeros_sorteados');
    var numeroSorteadoElement = document.createElement('li');
    numeroSorteadoElement.textContent = numeroSorteado;
    numerosSorteadosElement.appendChild(numeroSorteadoElement);

    marcarNumeroSorteado(numeroSorteado);
    verificarVencedor();
}

function marcarNumeroSorteado(numeroSorteado) {
    var cartelas = document.getElementsByClassName('bingo-card');

    for (var i = 0; i < cartelas.length; i++) {
        var numerosCartela = cartelas[i].getElementsByClassName('bingo-cell');

        for (var j = 0; j < numerosCartela.length; j++) {
            if (numerosCartela[j].textContent == numeroSorteado) {
                numerosCartela[j].classList.add('sorteado');
                break;
            }
        }
    }
}

function verificarCartelaCompleta(cartela) {
    for (var i = 0; i < cartela.length; i++) {
        var linha = cartela[i];
        for (var j = 0; j < linha.length; j++) {
            var numero = linha[j];
            if (!numerosSorteados.includes(numero)) {
                return false;
            }
        }
    }
    return true;
}

function verificarVencedor() {
    for (var i = 0; i < jogadores.length; i++) {
        var jogador = jogadores[i];
        var cartela = jogador.cartela;

        if (verificarCartelaCompleta(cartela)) {
            vencedorEncontrado = true;
            alert('Vai sair a pedra decisiva!');
            break;
        }
    }
}
