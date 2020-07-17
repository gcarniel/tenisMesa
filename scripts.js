window.onload = function () {
    setInterval(principal, 1000 / 60);
}

var folhaDesenho = document.getElementById("folha");
var areaDesenho = folhaDesenho.getContext("2d");

var larguraCampo = 600;
var alturaCampo = 500;
var larguraRaquete = 10;
var larguraRede = 5;
var alturaRaquete = 70;
var tamanhoBola = 10;

var pontuacaoJogador1 = pontuacaoJogador2 = 0;
var posicaoJogador1 = posicaoJogador2 = alturaCampo/2;
var posicaoBolaX = posicaoBolaY = 5;

var efeitoRaquete = 0.3;
var velocidadeJogador2 = 5;
var velocidadeBolaPosX = velocidadeBolaPosY = 10;

var desejaJogar = confirm("Deseja jogar?");

if(desejaJogar){
    folhaDesenho.addEventListener('mousemove', function (e) {
        posicaoJogador1 = e.clientY - alturaRaquete / 2;
    });
}

function principal() {
    desenhar();
    calcular();
}

function desenhar(){
    //fillRect(X, Y, largura, altura);

    //campo
    areaDesenho.fillStyle = '#286047';
    areaDesenho.fillRect(0, 0, larguraCampo, alturaCampo);

    //definindo a cor para branco
    areaDesenho.fillStyle = '#ffffff';

    //linha do meio do campo
    areaDesenho.fillRect((larguraCampo / 2) - (larguraRede / 2), 0, larguraRede, alturaCampo);

    //raquete esquerda
    areaDesenho.fillRect(0, posicaoJogador1, larguraRaquete, alturaRaquete);

    //raquete direita
    areaDesenho.fillRect(larguraCampo - larguraRaquete, posicaoJogador2, larguraRaquete, alturaRaquete);

    //bola 
    areaDesenho.fillRect(posicaoBolaX - (tamanhoBola / 2), posicaoBolaY - (tamanhoBola / 2), tamanhoBola, tamanhoBola);

    areaDesenho.fillText("Humano - " + pontuacaoJogador1 + " pontos.", 100, 100);
    areaDesenho.fillText("Computador - " + pontuacaoJogador2 + " pontos.", larguraCampo - 200, 100);
}

function sacar() {
    //bola ao centro
    posicaoBolaX = larguraCampo / 2;
    posicaoBolaY = larguraCampo / 2;
    velocidadeBolaPosX = -velocidadeBolaPosX;
    velocidadeBolaPosY = 3;
}

function calcular() {
    posicaoBolaX = posicaoBolaX + velocidadeBolaPosX;
    posicaoBolaY = posicaoBolaY + velocidadeBolaPosY;


    //validando parte superior
    if(posicaoBolaY < 0 && velocidadeBolaPosY < 0){
        velocidadeBolaPosY = -velocidadeBolaPosY;
    }

    //validando parte inferior
    if(posicaoBolaY > alturaCampo && velocidadeBolaPosY > 0){
        velocidadeBolaPosY = -velocidadeBolaPosY;
    }

    //validando parte esquerda
    if(posicaoBolaX < 0){
        if (posicaoBolaY > posicaoJogador1 && posicaoBolaY < (posicaoJogador1 + alturaRaquete)){
            //rebatendo a bola
            // console.log(posicaoBolaY, posicaoJogador1, (posicaoJogador1 + alturaRaquete));
            velocidadeBolaPosX = -velocidadeBolaPosX;

            var diferencaY = posicaoBolaY - (posicaoJogador1 + alturaRaquete / 2);
            velocidadeBolaPosY = diferencaY * efeitoRaquete;
        }else{
            //errou a bola, entao jogador2 pontua
            pontuacaoJogador2 ++;

            //bola ao centro
            sacar();
        }
    }

    //validando parte direita
    if (posicaoBolaX > larguraCampo) {
        if (posicaoBolaY > posicaoJogador2 && posicaoBolaY < (posicaoJogador2 + alturaRaquete)) {
            //rebatendo a bola
            // console.log(posicaoBolaY, posicaoJogador2, (posicaoJogador2 + alturaRaquete));
            velocidadeBolaPosX = -velocidadeBolaPosX;

            var diferencaY = posicaoBolaY - (posicaoJogador2 + alturaRaquete / 2);
            velocidadeBolaPosY = diferencaY * efeitoRaquete;
        } else {
            //errou a bola, entao jogador1 pontua
            pontuacaoJogador1++;

            //bola ao centro
            sacar();
        }
    }

    if (posicaoJogador2 + alturaRaquete / 2 < posicaoBolaY) {
        posicaoJogador2 = posicaoJogador2 + velocidadeJogador2;
    } else {
        posicaoJogador2 = posicaoJogador2 - velocidadeJogador2;
    }

    //se clicar em cancelar entao o computador vai jogar por mim
    if(!desejaJogar){
        velocidadeJogador2 = Math.random() * 10;
        if (posicaoJogador1 + alturaRaquete / 2 < posicaoBolaY) {
            posicaoJogador1 = posicaoJogador1 + velocidadeJogador2;
        } else {
            posicaoJogador1 = posicaoJogador1 - velocidadeJogador2;
        }
    }
}
