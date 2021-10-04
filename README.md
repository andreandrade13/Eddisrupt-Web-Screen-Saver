# Web-Screen-Saver

**Overview**
Como parte da nossa jornada de aprendizado, o mentor William solicitou para fazer um Web Screen Saver, aplicando o conceito de Programação Orientada a Objetos e Test Driven Development.

**Descrição:**
WSS é uma aplicação que, após determinado tempo de inatividade, é iniciada. Um fundo preto com dois elementos gráficos (imagem e relógio) aparecem na tela. Os dois elementos alteram suas posições a cada x segundos, respeitando os limites do ecrã e também não se sobrepondo.

![wss gif](https://drive.google.com/file/d/1btMQzLmyg1vXB8LtF6kVHOoTm3TqUHjw/view?usp=sharing)

**Breakdown do problema**
Antes de partir para o “hard coding”, fazemos um exercício de abstração onde listamos todos os pontos pertinentes que a aplicação deve possuir/cobrir. Assim, tiramos proveito de uma grande vantagem de trabalhar com OOP, que é decompor um problema complexo em componentes menores (boa prática que facilita solução de possíveis problemas).

**Solução “Geométrica”**
Através da abstração/simplificação dos elementos e ecrã em retângulos, já podemos pensar em como solucionar a questão da sobreposição e também se está dentro dos limites do ecrã:
Colisão: Tendo um vértice como ponto de referência podemos criar uma área de colisão rectângular. E como podemos fazer isso? Com o perímetro dos dois objectos temos a área de colisão. Os seus atributos serão X de um rectângulo menos a largura do outro, e y menos a altura. Se existir colisão, os rectângulos serão reposicionados.

![grafico](https://drive.google.com/file/d/1esEeatB12yveE2qj9wkPiHA4EJDUM6HM/view?usp=sharing)

Neste ponto, já temos toda a lógica necessária para a classe Rectangle.js, que irá ser responsável pela criação dos retângulos (constructor), cálculo dos vértices TL, TR, BL e BR do objeto do construtor (setPosition Method), e detecção de possível sobreposição (colidesWith method).

Limites: Faz se necessário checar se os objetos estão “dentro” dos limites do ecrã. Sendo assim, precisamos de um gerenciador de tela para cumprir esse papel. Criamos a classe ViewportManager.js, que recebe os atributos largura e altura do ecrã e cria este objeto. Para checar se o retângulo respeita os limites, o programa deve verificar se seus vértices estão dentro desse limite, entre mínimo (0) e máximo (largura e altura) (isInBoundaries method). Essa classe também será responsável por atribuir um valor aleatório* para as coordenadas x e y dos objetos (imagem e relógio), e esse valor respeita os limites inferior (0) e superior (diferença entre largura/altura do ecrá e largura/altura do retângulo), e caso haja sobreposição, estes valores serão recalculados (arrange method).

[colisao](https://drive.google.com/file/d/1w7XHyIvioUApFQC1eDyxKfetwV7vZ3JB/view?usp=sharing)

Para atribuição e verificação dos valores aleatórios, criamos as funções utilitárias getRandomNumberInRange e IsNumberInRange, onde as mesmas podem ser utlizadas em qualquer parte código (reusabilidade) e torna o código mais limpo.

Atribuição dos elementos
Com a lógica funcional já estabelecida, podemos pensar como iremos relacionar os elementos HTML e nosso código JS. Através do DOM (Document Object Model), nós podemos alterar, adicionar e excluir estilos de eventos e elementos HTML. Sendo assim, criamos nosso index.html com três elementos:
1. h1 somente com texto para indicar quando o WSS está inativo;
1. <img> contendo a imagem utilizada no WSS
1. <h1> contendo texto que será substituído pelo 
  
 Assim criamos as classes Clock e Logo. Elas irão partir de um elemento de referência presente no DOM, que irá fazer a associação da altura e comprimento num objeto Rectangle instanciado. Para o Clock, temos previamente à chamada do Rectangle, um método para substituirmos o texto pela hora (caso contrário iria se associar a um elemento ainda inexistente na página). E para renderizarmos, através do estilo (CSS), o método irá atribuir as coordenadas X e Y do retangulo instanciado para as propriedades left e top, respectivamente.

**“Papel” do Usuário**
Como parte final dessa engrenagem, precisamos relacionar a atividade/inatividade do EndUser. Precisamos estabelecer o tempo de inatividade, um contador de tempo e um reset dele quando há detecção de movimentos por parte do EndUser. Também achei pertinente incluir um verificador para o valor passado referente aos milissegundos (se for negativo ou igual a zero, retorna uma mensagem). Assim foi criada a classe UserRole.js, que recebe em seu construtor o tempo de inatividade (faz a checagem do valor). Após a definição do mesmo, é iniciada a contagem através da função assíncrona setTimeOut, e para resetar o contador, é chamada a função clearTimeOut. O WSS é habilitado através da manipulação do estilo de opacidade (0 inativo, 1 ativo). Para detectar possíveis ações do usuário, precisamos utilizar um “listener”, onde qualquer ação do mouse/keyboard, irá desativar o WSS e reiniciar a contagem de tempo.
  
**Finalizando…**
Agora, só precisamos passar nosso código para nossa página index.html, não esquecendo que todo código JS deve estar dentro da tag <script>:
Importamos as classes criadas anteriormente;
Detectamos a largura e altura do ecrã, atribuindo a variáveis utilizando as propriedades para retornar os valores;
Criamos o objeto viewport, com a largura e altura das variáveis acima;
Criamos os objetos Logo e Clock, que possuem o Rectangle instanciado no seu construtor;
Para posicionar os elementos e renderizar logo e clock, chamamos o método arrange e o método render, aninhado no setInterval atualizando as posições a cada segundo;
Chamamos o método refreshClock que deixa o relógio real-time;
Criamos o objeto UserRole, para gerenciar as ações on/off do WSS e detecção de ação do EndUser.

**Considerações**
Apesar do projeto aparentar uma certa simplicidade com relação a suas features, o maior desafio foi a sua construção pré-código. Toda questão de quebrar o problema, pensar na sua estrutura, desenhar os testes e utilizar pseudo-código, nos mostrou como é o pensamento alto nível de um engenheiro de sistemas. E talvez seja o maior ganho que eu e meu colega de mentoria tivemos. Formular código somente em OOP, manipular DOM, escrever testes, criar HTML/CSS são skills que podemos buscar em qualquer vídeo no Youtube. Mas integrar todos estes conceitos, e aprender COMO pensar são conhecimentos onde mostram a importância da nossa mentoria.


  
