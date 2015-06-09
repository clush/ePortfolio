//Einbinden des Canvas-Tags

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


var width = document.getElementById("canvas").width; //750
var height = document.getElementById("canvas").height; //450
var cellWidth = 15;

var direction;
var score;
var food;
var snake;
var headPointer;


//Spiel starten

init();

function init(){
	score = 0;
	direction = "rechts";
	headPointer = 4;
	create_food();
	create_snake();	
	
	if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(paint, 100);
	
}

function create_food(){
	var x = Math.round(Math.random()*(width-cellWidth)/cellWidth) ;
	var y = Math.round(Math.random()*(height-cellWidth)/cellWidth);
	
	food = new cell(x,y);
}

function create_snake(){
	var length = 5;
	snake = [];
	for(var i = 0; i < length;i++)
	{
		snake[i]= new cell(i,0);		
	}
	
}

function paint(){
	//Hintergrund zeichen
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, width, height);
	
	
	//Bewegung der Schlange
	
	//Zwischenspeichern der Koordinaten des Kopfes
	var headX = snake[headPointer].x;
	var headY = snake[headPointer].y;
	
	//Berechnung der neuen Kopfvariablen
	if(direction == "rechts") headX++;
	else if(direction == "links") headX--;
	else if(direction == "runter") headY++;
	else if(direction == "hoch") headY--;
	
	//Kollision aufgetreten?
	if(headX == -1 || headX == width/cellWidth || headY == -1 || headY == height/cellWidth || collision(headX,headY))
		{
			if(confirm('Sie haben '+ score+ ' Punkte gesammelt!\n Erneut speilen?'))
			{
				//Neustart
				init();
			}
			else
			{
				window.location.replace("http://www.google.de");
			}
			return;
			
		}
	
	//Futter gefunden
	if(headX==food.x && headY==food.y){
		score++;		
		//Hänge neues Glied als Kopf an
		snake[snake.length]=new cell(headX,headY);
		//Neues Futter generieren
		create_food();		
	}	
	
	//Rotiere Headpointer so, dass er auf das letzte Glied der Schlange zeigt
	if (headPointer < snake.length-1) headPointer++;
	else headPointer=0;
	//Übergebe neue Kopf-Koordinaten -> letzes Gleid wird zu Kopf
	snake[headPointer].x = headX;
	snake[headPointer].y = headY;
	
	
	
	//Schlange zeichnen
	for(var i=0; i < snake.length; i++){
		snake[i].paint("blue");	
	}
	
	//Fressen zeichnen
	food.paint("red");
	
	//Score zeichnen
	var score_text = "Score: " + score;
	ctx.fillStyle="blue";
	ctx.font="15px Arial";
	ctx.fillText(score_text, 5, height-5);
}

//Benutzereingaben abfangen

	addEventListener("keydown", function (event) {
    var key = event.which;
		
		if(key == "37" && direction != "rechts") direction = "links";
		else if(key == "38" && direction != "runter") direction = "hoch";
		else if(key == "39" && direction != "links") direction = "rechts";
		else if(key == "40" && direction != "hoch") direction = "runter";
		
}, false)


//Kollision der Schlange mit sich selbst prüfen

	function collision(x,y)
	{
		for(var i=0; i < snake.length; i++)
		{
			if(snake[i].x == x && snake[i].y == y) return true;
		}
		return false;
	}






