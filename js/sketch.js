
// Игровое поле

var playDesk = [ [10], [10], [10], [10], [10], [10], [10], [10], [10], [10] ];

/*
["", "", "", "", "", "", "", "", "", ""],
["", "", "", "", "", "", "", "", "", ""],
["", "", "", "", "", "", "", "", "", ""],
["", "", "", "", "", "", "", "", "", ""],
["", "", "", "", "", "", "", "", "", ""],
["", "", "", "", "", "", "", "", "", ""],
["", "", "", "", "", "", "", "", "", ""],
["", "", "", "", "", "", "", "", "", ""],
["", "", "", "", "", "", "", "", "", ""],
["", "", "", "", "", "", "", "", "", ""],
*/


// Корабли 

var boat4x = [4];
var boat3x = [3];
var boat2x = [2];
var boat1x = [1];

// Игра

function Game(playersCount) {

	if(playersCount == 2) {
		var player1 = new Player(prompt("Имя первого игрока: ")); 
		var player1 = new Player(prompt("Имя второго игрока: ")); 
	} else {
		var player2 = new Computer("Computer"); 
	}
	return [player1, player2]
}


// Живые игроки

function Player(name) {

	this.name = name;
	this.createDesk = function(descSize){ /* возвращает пустой массив 10х10 */ };
	this.createMarkDesk = function (descSize){ /* возвращает пустой массив 10х10 */ };
	this.score = function() { /* получить статистику выйгрышей */ }
	this.setupDesk = function() { /* расставить корабли */ }
	this.makeShot = function() { /* сделать выстрел */ }
	this.markShot = function() { /* отметить выстрел */ }
}

// Компьютер 

function Computer(name) {

	this.name = name;
	this.createDesk = function(descSize){ /* возвращает пустой массив 10х10 */ };
	this.createMarkDesk = function (descSize){ /* возвращает пустой массив 10х10 */ };
	this.score = function() { /* получить статистику выйгрышей */ }
	this.setupDesk = function() { /* расставить корабли */ }
	this.makeShot = function() { /* сделать выстрел */ }
	this.markShot = function() { /* отметить выстрел */ }
}


function PlayStart() {

	//настраиваем игровые поля для каждого игрока

	var DescPl1 = player1.createDesk(); // создаем игровое поле и заполняем его кораблями
	var markDescPl1 = player1.createMarkDesk(); // создаем игровое поле для отметок


	var DescPl2 = player2.createDesk(); 
	var markDescPl2 = player2.createMarkDesk();


	// определяем кому достанется первый ход
	var first = true;
	var currentPlayer;


	while(!endGame) {

		// отображаем на экране две доски того игрока кому достался первый ход
		if( first ) {
			var curDesc = DescPl1; 
			var curMarkDesc = markDescPl1; 
			currentPlayer = player1;
			} else {
			var curDesc = DescPl2;
			var curMarkDesc = markDescPl2;
			currentPlayer = player2;
		}
	
		showDescs(curDesc, curMarkDesc); 

		//спрашиваем куда стрелять
		var x = prompt("Число");
		var y = prompt("Буква");

	 
		/* делаем выстрел и проверяем было ли попадание или промах 
	  (что находится по этим координатам в ячейках массива DescPl2 противника)
	  // тут же проверям сколько всего у него осталось непотопленных кораблей
	  если корабли еще есть --> записываем текущие значения в переменные DescPl2 и markDescPl2
	  если нет, возвращаем endGame = true */
		currentPlayer.makeShot(x, y);

		// если промах (var first = false) ставим точку на своем curMarkDesc в координатaх x и y
		// если попадание ставим крестик на curMarkDesc в координатaх x и y 
		currentPlayer.markShot(x, y)
}




