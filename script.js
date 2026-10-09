// =====================================================
// RIOS EM ALERTA
// Painel de monitoramento
// =====================================================


// -----------------------------------------------------
// ELEMENTOS DO SITE
// -----------------------------------------------------

const distanciaElemento =
    document.getElementById("distancia");

const nivelElemento =
    document.getElementById("nivel");

const statusElemento =
    document.getElementById("status");

const mensagemElemento =
    document.getElementById("mensagemStatus");

const horaElemento =
    document.getElementById("hora");

const porcentagemElemento =
    document.getElementById("porcentagem");

const barraElemento =
    document.getElementById("barraProgresso");

const statusCard =
    document.getElementById("statusCard");

const statusIcone =
    document.getElementById("statusIcone");

const indicadorConexao =
    document.getElementById("indicadorConexao");

const textoConexao =
    document.getElementById("textoConexao");


// -----------------------------------------------------
// ALTURA DE REFERÊNCIA
// -----------------------------------------------------

// Altura utilizada apenas para a simulação.
// Depois vamos substituir pela calibração real.

const ALTURA_REFERENCIA = 30;


// -----------------------------------------------------
// ATUALIZAÇÃO DO PAINEL
// -----------------------------------------------------

function atualizarPainel(distancia) {

    // Calcula o nível representado

    let nivel =
        ((ALTURA_REFERENCIA - distancia)
        / ALTURA_REFERENCIA) * 100;


    // Mantém o valor entre 0 e 100

    nivel =
        Math.max(0, Math.min(100, nivel));


    // Mostra os valores

    distanciaElemento.textContent =
        distancia.toFixed(1);

    nivelElemento.textContent =
        nivel.toFixed(0);

    porcentagemElemento.textContent =
        nivel.toFixed(0) + "%";


    // Atualiza a barra

    barraElemento.style.width =
        nivel + "%";


    // Remove estados anteriores

    statusCard.classList.remove(
        "status-normal",
        "status-atencao",
        "status-alerta"
    );


    // -------------------------------------------------
    // NORMAL
    // -------------------------------------------------

    if (distancia > 20) {

        statusElemento.textContent =
            "NORMAL";

        mensagemElemento.textContent =
            "Nível baixo. Sistema em condição normal.";

        statusCard.classList.add(
            "status-normal"
        );

        statusIcone.textContent = "●";

        barraElemento.style.background =
            "#43a85c";
    }


    // -------------------------------------------------
    // ATENÇÃO
    // -------------------------------------------------

    else if (distancia > 10) {

        statusElemento.textContent =
            "ATENÇÃO";

        mensagemElemento.textContent =
            "Nível subindo. Acompanhe a situação.";

        statusCard.classList.add(
            "status-atencao"
        );

        statusIcone.textContent = "●";

        barraElemento.style.background =
            "#d6a01d";
    }


    // -------------------------------------------------
    // ALERTA
    // -------------------------------------------------

    else {

        statusElemento.textContent =
            "ALERTA";

        mensagemElemento.textContent =
            "Nível elevado. Situação de alerta.";

        statusCard.classList.add(
            "status-alerta"
        );

        statusIcone.textContent = "●";

        barraElemento.style.background =
            "#d84b4b";
    }


    // Atualiza horário

    atualizarHora();
}


// -----------------------------------------------------
// HORÁRIO
// -----------------------------------------------------

function atualizarHora() {

    const agora = new Date();

    const hora =
        agora.toLocaleTimeString(
            "pt-BR"
        );

    horaElemento.textContent =
        hora;
}


// -----------------------------------------------------
// CONEXÃO SIMULADA
// -----------------------------------------------------

function definirConexao(conectado) {

    if (conectado) {

        indicadorConexao.style.background =
            "#43a85c";

        textoConexao.textContent =
            "Sistema conectado";

    } else {

        indicadorConexao.style.background =
            "#d84b4b";

        textoConexao.textContent =
            "Sem conexão";
    }
}


// -----------------------------------------------------
// TESTE DO PAINEL
// -----------------------------------------------------

let distanciaTeste = 25;


// Simula uma leitura nova a cada 2 segundos

setInterval(() => {

    distanciaTeste -= 1;

    if (distanciaTeste < 5) {

        distanciaTeste = 25;
    }

    atualizarPainel(
        distanciaTeste
    );

}, 2000);


// Inicialização

definirConexao(true);

atualizarPainel(
    distanciaTeste
);