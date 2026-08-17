function atualizarTamanho() {

    const tamanho =
        document.getElementById("tamanho").value;

    document.getElementById("valorTamanho").textContent =
        tamanho;
}


function gerarSenha() {

    const tamanho = Number(
        document.getElementById("tamanho").value
    );

    const maiusculas =
        document.getElementById("maiusculas").checked;

    const minusculas =
        document.getElementById("minusculas").checked;

    const numeros =
        document.getElementById("numeros").checked;

    const simbolos =
        document.getElementById("simbolos").checked;


    let caracteres = "";


    if (maiusculas) {
        caracteres += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    if (minusculas) {
        caracteres += "abcdefghijklmnopqrstuvwxyz";
    }

    if (numeros) {
        caracteres += "0123456789";
    }

    if (simbolos) {
        caracteres += "!@#$%&*()-_=+[]{}<>?";
    }


    if (caracteres.length === 0) {

        alert("Selecione pelo menos uma opção.");

        return;
    }


    let senha = "";

    const valores =
        new Uint32Array(tamanho);

    crypto.getRandomValues(valores);


    for (let i = 0; i < tamanho; i++) {

        senha += caracteres[
            valores[i] % caracteres.length
        ];

    }


    document.getElementById("senhaGerada").value =
        senha;

    testarSenhaComValor(senha);
}


function copiarSenha() {

    const campo =
        document.getElementById("senhaGerada");

    if (!campo.value) {

        alert("Gere uma senha primeiro.");

        return;
    }


    navigator.clipboard.writeText(
        campo.value
    );


    const botao =
        document.querySelector(".btn-copiar");


    botao.textContent = "Copiado!";


    setTimeout(() => {

        botao.textContent = "Copiar";

    }, 1500);
}


function testarSenha() {

    const senha =
        document.getElementById("senhaTeste").value;

    testarSenhaComValor(senha);
}


function testarSenhaComValor(senha) {

    const tamanho =
        senha.length >= 8;

    const maiuscula =
        /[A-Z]/.test(senha);

    const minuscula =
        /[a-z]/.test(senha);

    const numero =
        /[0-9]/.test(senha);

    const simbolo =
        /[^A-Za-z0-9]/.test(senha);


    atualizarCriterio(
        "criterioTamanho",
        tamanho
    );

    atualizarCriterio(
        "criterioMaiuscula",
        maiuscula
    );

    atualizarCriterio(
        "criterioMinuscula",
        minuscula
    );

    atualizarCriterio(
        "criterioNumero",
        numero
    );

    atualizarCriterio(
        "criterioSimbolo",
        simbolo
    );


    let pontos = 0;

    if (tamanho) pontos++;
    if (maiuscula) pontos++;
    if (minuscula) pontos++;
    if (numero) pontos++;
    if (simbolo) pontos++;


    const porcentagem =
        pontos * 20;


    document.getElementById(
        "barraForca"
    ).style.width =
        porcentagem + "%";


    const nivel =
        document.getElementById("nivel");

    const dica =
        document.getElementById("dica");


    if (!senha) {

        nivel.textContent = "—";

        dica.textContent =
            "Digite uma senha para começar o teste.";

        document.getElementById(
            "barraForca"
        ).style.width = "0%";

        return;
    }


    if (pontos <= 1) {

        nivel.textContent = "Muito fraca";

        dica.textContent =
            "Use uma senha maior e misture letras, números e símbolos.";

    }

    else if (pontos === 2) {

        nivel.textContent = "Fraca";

        dica.textContent =
            "Aumente o tamanho e adicione mais tipos de caracteres.";

    }

    else if (pontos === 3) {

        nivel.textContent = "Média";

        dica.textContent =
            "Está melhor, mas uma senha maior seria mais segura.";

    }

    else if (pontos === 4) {

        nivel.textContent = "Forte";

        dica.textContent =
            "Boa senha. Evite reutilizá-la em outros sites.";

    }

    else {

        nivel.textContent = "Muito forte";

        dica.textContent =
            "Excelente. Prefira senhas únicas para cada serviço.";

    }
}


function atualizarCriterio(id, passou) {

    const elemento =
        document.getElementById(id);


    if (passou) {

        elemento.classList.add("ok");

    } else {

        elemento.classList.remove("ok");

    }
}


/*
 * Gera uma senha assim que
 * o site é aberto.
 */

gerarSenha();