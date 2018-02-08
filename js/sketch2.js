var currentPlayer;

// корабли 
var boat4x = ["*", "*", "*", "*"];
var boat3x = ["*", "*", "*"];
var boat2x = ["*", "*"];
var boat1x = ["*"];


// конструктор живого игрока
function Player(name) {
	this.name = name;
	this.createPlayDesc = function() {
		/* - создаем пустой массив 10х10 
			 - создаем корабли 
		*/
	}
	this.createMarkDesc = function() {
		/* - создаем пустой массив 10х10 для отметок 
		*/
	}

	this.makeShot = function(){
		// делаем выстрел
	}

	this.score = function(){
		// считаем очки
	}
};

// конструктор виртуального игрока
function Computer() {
	this.name = "computer";
	this.createPlayDesc = function() {
		/* - создаем пустой массив 10х10 
			 - заполняем его случайным образом кораблями 
		*/
	}
	this.createMarkDesc = function() {
		/* - создаем пустой массив 10х10 для отметок 
		*/
	}
	this.makeShot = function(){
		// делаем выстрел
	}

	this.score = function(){
		// считаем очки
	}
};

// создаем игрока
var player = new Player(prompt("Представьтесь, пожалуйста: "));
// создаем противника
var enemy = new Computer();


function update() {
	// тут будем анализировать данные и обновлять состояние игрового поля для текущего игрока
}


