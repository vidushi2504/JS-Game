function init()
{
	canvas=document.getElementById("canvas1");
	console.log(canvas);

	pen=canvas.getContext('2d');

	W=700;
	H=400;
	canvas.width=W;
	canvas.height=H;

	score=0;
	game_over=false;

	virus1={
		x: 150,
		y: 50,
		w: 60,
		h: 60,
		speed:20,
	}
	virus2={
		x: 300,
		y: 150,
		w: 60,
		h: 60,
		speed:30,
	}
	virus3={
		x: 450,
		y: 20,
		w: 60,
		h: 60,
		speed:40,
	}
	viruses=[virus1, virus2, virus3];

	player={
		x:20,
		y:H/2,
		w:60,
		h:60,
		speed:20,
		moving:"false",
	}

	gem={
		x:W-100,
		y:H/2,
		w:60,
		h:60,
	}

	canvas.addEventListener('mousedown', function(){
		player.moving=true;
	});
	canvas.addEventListener('mouseup', function(){
		player.moving=false;
	});
}

function Collision(b1, b2){
	if(Math.abs(b1.x - b2.x)<=30 && Math.abs(b1.y - b2.y)<=30)
	{
		return true;
	}
	return false;
}

function load_images(){
	virus_image=new Image;
	virus_image.src="D:/Projects/Game/Virus.png";
	player_image=new Image;
	player_image.src="D:/Projects/Game/superhero.png";
	gem_image=new Image;
	gem_image.src="D:/Projects/Game/gem.png";
}

function draw(){
	pen.clearRect(0,0,W,H);
	pen.fillStyle="red";
	pen.drawImage(player_image, player.x, player.y, player.w, player.h);
	pen.drawImage(gem_image, gem.x, gem.y, gem.w, gem.h);
	for(let i=0;i<viruses.length;i++)
	{
		pen.drawImage(virus_image, viruses[i].x, viruses[i].y, viruses[i].w, viruses[i].h);
	}
	pen.fillStyle="white";
	pen.fillText("Score " +score, 10, 10);
}

function update(){
	if(player.moving==true)
	{
		player.x+=player.speed;
		score+=20;
	}
	for(let i=0;i<viruses.length;i++)
	{
		if(Collision(viruses[i], player))
		{
			score-=100;
			if(score<0)
			{
				game_over=true;
				alert("Game Over!");
			}
		}
	}
	if(Collision(gem,player)==true)
	{
		game_over=true;
		alert("Your Score is "+score);
	}
	for(let i=0;i<viruses.length;i++)
	{
		viruses[i].y+=viruses[i].speed;
		if(viruses[i].y<0 || viruses[i].y>(H-viruses[i].h))
		{
			viruses[i].speed*=-1;
		}
	}
}

function gameloop(){
	draw();
	update();
	if(game_over==true)
		clearInterval(f);
}

load_images();
init();
var f= setInterval(gameloop, 100);
