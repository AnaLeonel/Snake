window.onload = function(){
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	// variáveis
	snake = [];
	positionX = 10;
	positionY = 10;
	foodX = 15;
	foodY = 15;
	velX = 0;
	velY = 0;
	grid = 20;
	tam = 3;

	// Chamada da função jogo a cada 100 milisegundos
	setInterval(jogo, 100);

	// Controles
	document.addEventListener("keydown", function(e){
		switch(e.keyCode){
			//seta direita = 39
		case 39:
			velX = 1;
			velY = 0;
			break;
			//seta esquerda = 37
		case 37:
			velX = -1;
			velY = 0;
			break;
			//seta pra cima = 38
		case 38:
			velY = -1;
			velX = 0;
			break;
			//seta pra baixo = 40;
		case 40:
			velY = 1;
			velX = 0;
			break;							
		}
	});
}

function jogo(){
	// Configuração da tela
	ctx.fillStyle = "#CE8BFF";
	// Distância da borda horizontal, distância borda vertical, largura, altura
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// Deslocamento da cobra
	positionX += velX;
	positionY += velY;

	// Espelhamento
	if(positionX < 0){
		positionX = grid;
	}
	if(positionX > grid){
		positionX = 0;
	}
	if(positionY < 0){
		positionY = grid;
	}
	if(positionY > grid){
		positionY = 0;
	}

	// Configuração da cobra
	ctx.fillStyle = "#76D7C4";
	for(let i=0; i < snake.length; i++){
		ctx.fillRect(snake[i].x*grid, snake[i].y*grid, grid-1, grid-1);
		if(snake[i].x == positionX && snake[i].y == positionY){
			tam = 3;
		}
	}

	// Posicionando a cobra
	snake.push({x: positionX, y:positionY});
	
	// Apagando
	while(snake.length > tam){
		snake.shift();
	}

	// Configurando a comida
	ctx.fillStyle = "#48A4FF";
	ctx.fillRect(foodX*grid, foodY*grid, grid-1, grid-1);

	// Comendo a comida
	if(positionX == foodX && positionY == foodY){
		tam++;
		foodX = Math.floor(Math.random()*grid);
		foodY = Math.floor(Math.random()*grid);
	}
}