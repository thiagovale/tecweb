function novoElemento(tagName, className) {
  const elemento = document.createElement(tagName);
  elemento.className = className;
  return elemento;
}

function Parede() {
  this.elemento = novoElemento("div", "parede");
  const corpo = novoElemento("div", "corpo");
  this.elemento.appendChild(corpo);
  this.setTamanho = (tamanho) => (corpo.style.width = `${tamanho}px`);
}

function ParDeParedes(largura, abertura, posicaoNaTela, valor) {
  this.elemento = novoElemento("div", "par-de-paredes");
  this.latEsquerda = new Parede();
  this.latDireita = new Parede();

  this.elemento.appendChild(this.latEsquerda.elemento);
  this.elemento.appendChild(this.latDireita.elemento);

  this.variacaoAbertura = () => valor || 0.5;
  this.abertura = () => {
    const larguraEsquerda = this.variacaoAbertura() * (largura - abertura); //valorSimbolico para debugar e testar a funcao de abertura
    const larguraDireita = largura - abertura - larguraEsquerda;
    this.latEsquerda.setTamanho(larguraEsquerda);
    this.latDireita.setTamanho(larguraDireita);
  };

  this.getY = () => parseInt(this.elemento.style.bottom.split("px")[0]);
  this.setY = (posicaoNaTela) =>
    (this.elemento.style.bottom = `${posicaoNaTela}px`);
  this.getAltura = () => this.elemento.clientHeight;

  this.abertura();
  this.setY(posicaoNaTela);
}

// const p = new ParDeParedes(1000, 40, 700, 0.5);
// document.querySelector("[wm-flappy]").appendChild(p.elemento);

function Paredes(altura, largura, abertura, espaco, notificarPonto) {
  const direto = [
    new ParDeParedes(largura, abertura, altura),
    new ParDeParedes(largura, abertura, altura + espaco),
    new ParDeParedes(largura, abertura, altura + espaco * 2),
    new ParDeParedes(largura, abertura, altura + espaco * 3),
    new ParDeParedes(largura, abertura, altura + espaco * 4),
    new ParDeParedes(largura, abertura, altura + espaco * 5),
    new ParDeParedes(largura, abertura, altura + espaco * 6),
    new ParDeParedes(largura, abertura, altura + espaco * 7),
    new ParDeParedes(largura, abertura, altura + espaco * 8),
    new ParDeParedes(largura, abertura, altura + espaco * 9),
    new ParDeParedes(largura, abertura, altura + espaco * 10),
  ];

  const direita = [
    new ParDeParedes(largura, abertura, altura + espaco * 11, 0.48),
    new ParDeParedes(largura, abertura, altura + espaco * 11, 0.46),
    new ParDeParedes(largura, abertura, altura + espaco * 12, 0.44),
    new ParDeParedes(largura, abertura, altura + espaco * 13, 0.42),
    new ParDeParedes(largura, abertura, altura + espaco * 14, 0.4),
    new ParDeParedes(largura, abertura, altura + espaco * 15, 0.38),
    new ParDeParedes(largura, abertura, altura + espaco * 16, 0.36),
    new ParDeParedes(largura, abertura, altura + espaco * 17, 0.34),
    new ParDeParedes(largura, abertura, altura + espaco * 18, 0.3),
    new ParDeParedes(largura, abertura, altura + espaco * 19, 0.28),
    new ParDeParedes(largura, abertura, altura + espaco * 20, 0.28),
  ];

  const esquerda = [
    new ParDeParedes(largura, abertura, altura + espaco * 21, 0.3),
    new ParDeParedes(largura, abertura, altura + espaco * 22, 0.32),
    new ParDeParedes(largura, abertura, altura + espaco * 23, 0.34),
    new ParDeParedes(largura, abertura, altura + espaco * 24, 0.36),
    new ParDeParedes(largura, abertura, altura + espaco * 25, 0.38),
    new ParDeParedes(largura, abertura, altura + espaco * 26, 0.4),
    new ParDeParedes(largura, abertura, altura + espaco * 27, 0.42),
    new ParDeParedes(largura, abertura, altura + espaco * 28, 0.44),
    new ParDeParedes(largura, abertura, altura + espaco * 29, 0.46),
    new ParDeParedes(largura, abertura, altura + espaco * 30, 0.48),
    new ParDeParedes(largura, abertura, altura + espaco * 31, 0.48),
  ];

  const ziguezague = [
    new ParDeParedes(largura, abertura, altura + espaco * 31, 0.5),
    new ParDeParedes(largura, abertura, altura + espaco * 32, 0.52),
    new ParDeParedes(largura, abertura, altura + espaco * 33, 0.54),
    new ParDeParedes(largura, abertura, altura + espaco * 34, 0.52),
    new ParDeParedes(largura, abertura, altura + espaco * 35, 0.5),
    new ParDeParedes(largura, abertura, altura + espaco * 36, 0.48),
    new ParDeParedes(largura, abertura, altura + espaco * 37, 0.46),
    new ParDeParedes(largura, abertura, altura + espaco * 38, 0.48),
    new ParDeParedes(largura, abertura, altura + espaco * 39, 0.5),
    new ParDeParedes(largura, abertura, altura + espaco * 40, 0.52),
    new ParDeParedes(largura, abertura, altura + espaco * 41, 0.54),
  ];

  this.pares = [...direto, ...direita, ...esquerda, ...ziguezague];

  const deslocamento = 10;

  this.animar = () => {
    this.pares.forEach((par) => {
      par.setY(par.getY() - deslocamento);

      if (par.getY() < -800) {
        this.pares.shift();
        // par.setY(700);
        // par.abertura();
      }
    });
  };
}

// const paredes = new Paredes(690, 1190, 200, 140);
// const areaDoJogo = document.querySelector("[wm-flappy]");

// paredes.pares.forEach((par) => areaDoJogo.appendChild(par.elemento));

// setInterval(() => {
//   paredes.animar();
//   passaro.animar();
// }, 20);

function Passaro(larguraJogo) {
  let voando = false;

  this.elemento = novoElemento("img", "passaro");
  this.elemento.src = "img/passaro.png";

  this.getX = () => parseInt(this.elemento.style.left.split("px")[0]);
  this.setX = (x) => (this.elemento.style.left = `${x}px`);

  window.onkeydown = (e) => (voando = true);
  window.onkeyup = (e) => (voando = false);

  this.animar = () => {
    const novoX = this.getX() + (voando ? 8 : -5);
    const larguraMaxima = larguraJogo - this.elemento.clientWidth;

    if (novoX <= 0) {
      this.setX(0);
    } else if (novoX >= larguraMaxima) {
      this.setX(larguraMaxima);
    } else {
      this.setX(novoX);
    }
  };
  this.setX(larguraJogo / 2);
}

// const barreiras = new Barreiras(700, 400, 200, 400)
// const passaro = new Passaro(1200)

// const areaDoJogo = document.querySelector('[wm-flappy]')

// areaDoJogo.appendChild(passaro.elemento)
// barreiras.pares.forEach( par => areaDoJogo.appendChild(par.elemento))

// setInterval(() => {
//       barreiras.animar()
//       passaro.animar()
// },20)

function Progresso() {
  this.elemento = novoElemento("span", "progresso");
  this.atualizarPontos = (pontos) => {
    this.elemento.innerHTML = pontos;
  };
  this.atualizarPontos(0);
}

// const barreiras = new Barreiras(700, 400, 200, 400)
// const passaro = new Passaro(1200)

// const areaDoJogo = document.querySelector('[wm-flappy]')

// areaDoJogo.appendChild(passaro.elemento)
// barreiras.pares.forEach( par => areaDoJogo.appendChild(par.elemento))

function estaoSobrepostos(elementoA, elementoB) {
  //nao acho q preciso mexer aqui
  const a = elementoA.getBoundingClientRect();
  const b = elementoB.getBoundingClientRect();
  const horizontal = a.left + a.width >= b.left && b.left + b.width >= a.left;
  const vertical = a.top + a.height >= b.top && b.top + b.height >= a.top;

  return horizontal && vertical;
}

function colidiu(passaro, barreiras) {
  //nao acho q preciso mexer aqui
  let colidiu = false;

  barreiras.pares.forEach((parDeBarreiras) => {
    if (!colidiu) {
      const esquerda = parDeBarreiras.latEsquerda.elemento;
      const direita = parDeBarreiras.latDireita.elemento;
      colidiu =
        estaoSobrepostos(passaro.elemento, esquerda) ||
        estaoSobrepostos(passaro.elemento, direita);
    }
  });
  return colidiu;
}

function FlappyBird() {
  //muito provavelmente vou ter q mexer aqui
  let pontos = 0;
  const areaDoJogo = document.querySelector("[wm-flappy]");
  const altura = areaDoJogo.clientHeight;
  const largura = areaDoJogo.clientWidth;

  const progresso = new Progresso();
  const paredes = new Paredes(altura, largura, 200, 140, () =>
    progresso.atualizarPontos(++pontos)
  );

  const passaro = new Passaro(altura);

  areaDoJogo.appendChild(progresso.elemento);
  areaDoJogo.appendChild(passaro.elemento);
  paredes.pares.forEach((par) => areaDoJogo.appendChild(par.elemento));

  this.start = () => {
    const temporizador = setInterval(() => {
      paredes.animar();
      passaro.animar();

      //condicao para acabar o jogo \/
      if (colidiu(passaro, paredes)) {
        clearInterval(temporizador);
      }
    }, 50); //velocidade que o tempo passa dentro do jogo
  };
}

new FlappyBird().start();
