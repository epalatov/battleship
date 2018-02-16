var free = 0; // свободно
var ship = 1; // занятo
var miss = 2; // промах
var hit = 3; // попал

var rows = 10;
var columns = 10;
var shipsCount = 10;
var ships1x = 4;
var ships2x = 3;
var ships3x = 2;
var ships4x = 1;
var shipType;

//создаем игровое поле (матрицу)
var playerDesk = matrixArray(10, 10);

var player = new Game();
var computer = new Game();
var playerField = player.createPlayingField(10, 10);
var enemy = computer.createPlayingField(10, 10);

function Game() {
  this.ships = 10;
  this.ships1x = 4;
  this.ships2x = 3;
  this.ships3x = 2;
  this.ships4x = 1;
  this.score = 0;
  this.createPlayingField = function (rows, columns) {
    var matrix = [];
    for (var i = 0; i < rows; i++) {
      matrix[i] = [];
      for (var j = 0; j < columns; j++) {
        matrix[i][j] = free;
      }
    }
    return matrix;
  }
  this.makeShoot = function () { };
}

//функция построения игровых полей
function matrixArray(rows, columns) {
  var matrix = [];
  for (var i = 0; i < rows; i++) {
    matrix[i] = [];
    for (var j = 0; j < columns; j++) {
      matrix[i][j] = free;
    }
  }
  return matrix;
}

//функция создания кораблей
function createShips(col, row, type, orientation) {

  // записываем в массив coordinates координаты клеток корабля в зависимости от ориентации
  var coordinates = [];
  if (orientation == "в" || orientation == "В") {
    for (var i = 0; i < type; i++) {
      coordinates.push([row - 1, col - 1]);
      row = row + 1;
    }
  } else if (orientation == "г" || orientation == "Г") {
    for (var i = 0; i < type; i++) {
      coordinates.push([row - 1, col - 1]);
      col = col + 1;
    }
  } else {
    coordinates.push([row - 1, col - 1]);
  }

  var rowStart = coordinates[0][0];
  var colStart = coordinates[0][1];

  //проверяем правильность расположения корабля
  var check = checkRulePlacement(rowStart, colStart, type, orientation);

  //если проверка пройдена и корабли не кончились, ставим корабль
  if (check) {
    if (typeShipsCount(type) === false) {
      return playerDesk;
    } else {
      for (var i = 0; i <= coordinates.length - 1; i++) {
        playerDesk[coordinates[i][0]][coordinates[i][1]] = ship;
      }
      return playerDesk;
    }
  }
}

//конструктор защитных полей
function TouchRules(x, y) {
  this.x = x;
  this.y = y;

  this.corners = function (type, orientation) {
    var checkType;
    // 1x
    var topLeft = [[this.x, this.y + 1], [this.x + 1, this.y], [this.x + 1, this.y + 1]];
    var topRight = [[this.x, this.y - 1], [this.x + 1, this.y], [this.x + 1, this.y - 1]];
    var bottomLeft = [[this.x, this.y + 1], [this.x - 1, this.y], [this.x - 1, this.y + 1]];
    var bottomRight = [[this.x, this.y - 1], [this.x - 1, this.y], [this.x - 1, this.y - 1]];
    // 2x
    var topLeft2vert = [[this.x, this.y + 1], [this.x + 1, this.y + 1], [this.x + 2, this.y], [this.x + 2, this.y + 1]];
    var topLeft2hor = [[this.x + 1, this.y], [this.x + 1, this.y + 1], [this.x + 1, this.y + 2], [this.x, this.y + 2]];
    var topRight2vert = [[this.x, this.y - 1], [this.x + 1, this.y - 1], [this.x + 2, this.y - 1], [this.x + 2, this.y]];
    var topRight2hor = [[this.x + 1, this.y], [this.x + 1, this.y - 1], [this.x + 1, this.y - 2], [this.x, this.y - 2]];
    var botLeft2vert = [[this.x - 1, this.y], [this.x - 1, this.y + 1], [this.x, this.y + 1], [this.x + 1, this.y + 1]];
    var botLeft2hor = [[this.x - 1, this.y], [this.x - 1, this.y + 1], [this.x - 1, this.y + 2], [this.x, this.y + 2]];
    var botRight2vert = [[this.x - 1, this.y], [this.x - 1, this.y - 1], [this.x, this.y - 1], [this.x + 1, this.y - 1]];
    var botRight2hor = [[this.x, this.y - 1], [this.x - 1, this.y - 1], [this.x - 1, this.y], [this.x - 1, this.y + 1]];

    //3x
    var topLeft3vert = [[this.x, this.y + 1], [this.x + 1, this.y + 1], [this.x + 2, this.y + 1], [this.x + 3, this.y + 1], [this.x + 3, this.y]];
    var topLeft3hor = [[this.x + 1, this.y], [this.x + 1, this.y + 1], [this.x + 1, this.y + 2], [this.x + 1, this.y + 3], [this.x, this.y + 3]];
    var topRight3vert = [[this.x, this.y - 1], [this.x + 1, this.y - 1], [this.x + 2, this.y - 1], [this.x + 3, this.y - 1], [this.x + 3, this.y]];
    var topRight3hor = [[this.x, this.y - 1], [this.x + 1, this.y - 1], [this.x + 1, this.y], [this.x + 1, this.y + 1], [this.x + 1, this.y + 2]];
    var botLeft3vert = [[this.x - 1, this.y], [this.x - 1, this.y + 1], [this.x, this.y + 1], [this.x + 1, this.y + 1], [this.x + 2, this.y + 1]];
    var botLeft3hor = [[this.x - 1, this.y], [this.x - 1, this.y + 1], [this.x - 1, this.y + 2], [this.x - 1, this.y + 3], [this.x, this.y + 3]];
    var botRight3vert = [[this.x - 1, this.y], [this.x - 1, this.y - 1], [this.x, this.y - 1], [this.x + 1, this.y - 1], [this.x + 2, this.y - 1]];
    var botRight3hor = [[this.x, this.y - 1], [this.x - 1, this.y - 1], [this.x - 1, this.y], [this.x - 1, this.y + 1], [this.x - 1, this.y + 2]];

    // 4x
    var topLeft4vert = [[this.x, this.y + 1], [this.x + 1, this.y + 1], [this.x + 2, this.y + 1], [this.x + 3, this.y + 1], [this.x + 4, this.y + 1], [this.x + 4, this.y]];
    var topLeft4hor = [[this.x + 1, this.y], [this.x + 1, this.y + 1], [this.x + 1, this.y + 2], [this.x + 1, this.y + 3], [this.x + 1, this.y + 4], [this.x, this.y + 4]];
    var topRight4vert = [[this.x, this.y - 1], [this.x + 1, this.y - 1], [this.x + 2, this.y - 1], [this.x + 3, this.y - 1], [this.x + 4, this.y - 1], [this.x + 4, this.y]];
    var topRight4hor = [[this.x, this.y - 1], [this.x + 1, this.y - 1], [this.x + 1, this.y], [this.x + 1, this.y + 1], [this.x + 1, this.y + 2], [this.x + 1, this.y + 3]];
    var botLeft4vert = [[this.x - 1, this.y], [this.x - 1, this.y + 1], [this.x, this.y + 1], [this.x + 1, this.y + 1], [this.x + 2, this.y + 1], [this.x + 3, this.y + 1]];
    var botLeft4hor = [[this.x - 1, this.y], [this.x - 1, this.y + 1], [this.x - 1, this.y + 2], [this.x - 1, this.y + 3], [this.x - 1, this.y + 4], [this.x, this.y + 4]];
    var botRight4vert = [[this.x - 1, this.y], [this.x - 1, this.y - 1], [this.x, this.y - 1], [this.x + 1, this.y - 1], [this.x + 2, this.y - 1], [this.x + 3, this.y - 1]];
    var botRight4hor = [[this.x, this.y - 1], [this.x - 1, this.y - 1], [this.x - 1, this.y], [this.x - 1, this.y + 1], [this.x - 1, this.y + 2], [this.x - 1, this.y + 3]];

    if (type === "1" && this.x === 0 && this.y === 0) {
      return checkAround(topLeft);
    } else if (type === "1" && this.x === 0 && this.y === 9) {
      return checkAround(topRight);
    } else if (type === "1" && this.x === 9 && this.y === 0) {
      return checkAround(bottomLeft);
    } else if (type === "1" && this.x === 9 && this.y === 9) {
      return checkAround(bottomRight);
    }

    if (type === "2" && this.x === 0 && this.y === 0) {
      orientation === "в" ? checkType = topLeft2vert : checkType = topLeft2hor;
      return checkAround(checkType);
    } else if (type === "2" && this.x === 0 && this.y === 9) {
      orientation === "в" ? checkType = topRight2vert : checkType = topRight2hor;
      return checkAround(checkType);
    } else if (type === "2" && this.x === 9 && this.y === 0) {
      orientation === "в" ? checkType = botLeft2vert : checkType = botLeft2hor;
      return checkAround(checkType);
    } else if (type === "2" && this.x === 9 && this.y === 9) {
      orientation === "в" ? checkType = botRight2vert : checkType = botRight2hor;
      return checkAround(checkType);
    }

    if (type === "3" && this.x === 0 && this.y === 0) {
      orientation === "в" ? checkType = topLeft3vert : checkType = topLeft3hor;
      return checkAround(checkType);
    } else if (type === "3" && this.x === 0 && this.y === 9) {
      orientation === "в" ? checkType = topRight3vert : checkType = topRight3hor;
      return checkAround(checkType);
    } else if (type === "3" && this.x === 9 && this.y === 0) {
      orientation === "в" ? checkType = botLeft3vert : checkType = botLeft3hor;
      return checkAround(checkType);
    } else if (type === "3" && this.x === 9 && this.y === 9) {
      orientation === "в" ? checkType = botRight3vert : checkType = botRight3hor;
      return checkAround(checkType);
    }

    if (type === "4" && this.x === 0 && this.y === 0) {
      orientation === "в" ? checkType = topLeft4vert : checkType = topLeft4hor;
      return checkAround(checkType);
    } else if (type === "4" && this.x === 0 && this.y === 9) {
      orientation === "в" ? checkType = topRight4vert : checkType = topRight4hor;
      return checkAround(checkType);
    } else if (type === "4" && this.x === 9 && this.y === 0) {
      orientation === "в" ? checkType = botLeft4vert : checkType = botLeft4hor;
      return checkAround(checkType);
    } else if (type === "4" && this.x === 9 && this.y === 9) {
      orientation === "в" ? checkType = botRight4vert : checkType = botRight4hor;
      return checkAround(checkType);
    }
  }

  this.sides = function (type, orientation) {
    var topSide = [[this.x, this.y - 1], [this.x + 1, this.y - 1], [this.x + 1, this.y], [this.x + 1, this.y + 1], [this.x, this.y + 1]];

    var bottomSide = [[this.x, this.y - 1], [this.x - 1, this.y - 1], [this.x - 1, this.y], [this.x - 1, this.y + 1], [this.x, this.y + 1]];

    var leftSide = [[this.x - 1, this.y], [this.x - 1, this.y + 1], [this.x, this.y + 1], [this.x + 1, this.y + 1], [this.x + 1, this.y]];

    var rightSide = [[this.x - 1, this.y], [this.x - 1, this.y - 1], [this.x, this.y - 1], [this.x + 1, this.y - 1], [this.x + 1, this.y]];
    //2x
    var topSide2vert = [[this.x, this.y - 1], [this.x + 1, this.y - 1], [this.x + 2, this.y - 1], [this.x + 2, this.y], [this.x + 2, this.y + 1], [this.x + 1, this.y + 1], [this.x, this.y + 1]];

    var topSide2hor = [[this.x, this.y - 1], [this.x + 1, this.y - 1], [this.x + 1, this.y], [this.x + 1, this.y + 1], [this.x + 1, this.y + 2], [this.x, this.y + 2]];

    var botSide2vert = [[this.x + 1, this.y - 1], [this.x, this.y - 1], [this.x - 1, this.y - 1], [this.x - 1, this.y], [this.x - 1, this.y + 1], [this.x, this.y + 1], [this.x + 1, this.y + 1]];

    var botSide2hor = [[this.x, this.y - 1], [this.x - 1, this.y - 1], [this.x - 1, this.y], [this.x - 1, this.y + 1], [this.x - 1, this.y + 2], [this.x, this.y + 2]];

    var leftSide2vert = [[this.x - 1, this.y], [this.x - 1, this.y + 1], [this.x, this.y + 1], [this.x + 1, this.y + 1], [this.x + 2, this.y + 1], [this.x + 2, this.y]];

    var leftSide2hor = [[this.x - 1, this.y], [this.x - 1, this.y + 1], [this.x - 1, this.y + 2], [this.x, this.y + 2], [this.x + 1, this.y + 2], [this.x + 1, this.y + 1], [this.x + 1, this.y]];

    var rightSide2vert = [[this.x - 1, this.y], [this.x - 1, this.y - 1], [this.x, this.y - 1], [this.x + 1, this.y - 1], [this.x + 2, this.y - 1], [this.x + 2, this.y]];

    var rightSide2hor = [[this.x - 1, this.y + 1], [this.x - 1, this.y], [this.x - 1, this.y - 1], [this.x, this.y - 1], [this.x + 1, this.y - 1], [this.x + 1, this.y], [this.x + 1, this.y + 1]];
    //3x
    var topSide3vert = [[this.x, this.y - 1], [this.x + 1, this.y - 1], [this.x + 2, this.y - 1], [this.x + 3, this.y - 1], [this.x + 3, this.y], [this.x + 3, this.y + 1], [this.x + 2, this.y + 1], [this.x + 1, this.y + 1], [this.x, this.y + 1]];

    var topSide3hor = [[this.x, this.y - 1], [this.x + 1, this.y - 1], [this.x + 1, this.y], [this.x + 1, this.y + 1], [this.x + 1, this.y + 2], [this.x + 1, this.y + 3], [this.x, this.y + 3]];

    var botSide3vert = [[this.x + 2, this.y - 1], [this.x + 1, this.y - 1], [this.x, this.y - 1], [this.x - 1, this.y - 1], [this.x - 1, this.y], [this.x - 1, this.y + 1], [this.x, this.y + 1], [this.x + 1, this.y + 1], [this.x + 2, this.y + 1]];

    var botSide3hor = [[this.x, this.y - 1], [this.x - 1, this.y - 1], [this.x - 1, this.y], [this.x - 1, this.y + 1], [this.x - 1, this.y + 2], [this.x - 1, this.y + 3], [this.x, this.y + 3]];

    var leftSide3vert = [[this.x - 1, this.y], [this.x - 1, this.y + 1], [this.x, this.y + 1], [this.x + 1, this.y + 1], [this.x + 2, this.y + 1], [this.x + 3, this.y + 1], [this.x + 3, this.y]];

    var leftSide3hor = [[this.x - 1, this.y], [this.x - 1, this.y + 1], [this.x - 1, this.y + 2], [this.x - 1, this.y + 3], [this.x, this.y + 3], [this.x + 1, this.y + 3], [this.x + 1, this.y + 2], [this.x + 1, this.y + 1], [this.x + 1, this.y]];

    var rightSide3vert = [[this.x - 1, this.y], [this.x - 1, this.y - 1], [this.x, this.y - 1], [this.x + 1, this.y - 1], [this.x + 2, this.y - 1], [this.x + 3, this.y - 1], [this.x + 3, this.y]];

    var rightSide3hor = [[this.x - 1, this.y + 2], [this.x - 1, this.y + 1], [this.x - 1, this.y], [this.x - 1, this.y - 1], [this.x, this.y - 1], [this.x + 1, this.y - 1], [this.x + 1, this.y], [this.x + 1, this.y + 1], [this.x + 1, this.y + 2]];
    //4x
    var topSide4vert = [[this.x, this.y - 1], [this.x + 1, this.y - 1], [this.x + 2, this.y - 1], [this.x + 3, this.y - 1], [this.x + 4, this.y - 1], [this.x + 4, this.y], [this.x + 4, this.y + 1], [this.x + 3, this.y + 1], [this.x + 2, this.y + 1], [this.x + 1, this.y + 1], [this.x, this.y + 1]];

    var topSide4hor = [[this.x, this.y - 1], [this.x + 1, this.y - 1], [this.x + 1, this.y], [this.x + 1, this.y + 1], [this.x + 1, this.y + 2], [this.x + 1, this.y + 3], [this.x + 1, this.y + 4], [this.x, this.y + 4]];

    var botSide4vert = [[this.x + 3, this.y - 1], [this.x + 2, this.y - 1], [this.x + 1, this.y - 1], [this.x, this.y - 1], [this.x - 1, this.y - 1], [this.x - 1, this.y], [this.x - 1, this.y + 1], [this.x, this.y + 1], [this.x + 1, this.y + 1], [this.x + 2, this.y + 1], [this.x + 3, this.y + 1]];

    var botSide4hor = [[this.x, this.y - 1], [this.x - 1, this.y - 1], [this.x - 1, this.y], [this.x - 1, this.y + 1], [this.x - 1, this.y + 2], [this.x - 1, this.y + 3], [this.x - 1, this.y + 4], [this.x, this.y + 4]];

    var leftSide4vert = [[this.x - 1, this.y], [this.x - 1, this.y + 1], [this.x, this.y + 1], [this.x + 1, this.y + 1], [this.x + 2, this.y + 1], [this.x + 3, this.y + 1], [this.x + 4, this.y + 1], [this.x + 4, this.y]];

    var leftSide4hor = [[this.x - 1, this.y], [this.x - 1, this.y + 1], [this.x - 1, this.y + 2], [this.x - 1, this.y + 3], [this.x - 1, this.y + 4], [this.x, this.y + 4], [this.x + 1, this.y + 4], [this.x + 1, this.y + 3], [this.x + 1, this.y + 2], [this.x + 1, this.y + 1], [this.x + 1, this.y]];

    var rightSide4vert = [[this.x - 1, this.y], [this.x - 1, this.y - 1], [this.x, this.y - 1], [this.x + 1, this.y - 1], [this.x + 2, this.y - 1], [this.x + 3, this.y - 1], [this.x + 4, this.y - 1], [this.x + 4, this.y]];

    var rightSide4hor = [[this.x - 1, this.y + 3], [this.x - 1, this.y + 2], [this.x - 1, this.y + 1], [this.x - 1, this.y], [this.x - 1, this.y - 1], [this.x, this.y - 1], [this.x + 1, this.y - 1], [this.x + 1, this.y], [this.x + 1, this.y + 1], [this.x + 1, this.y + 2], [this.x + 1, this.y + 3]];

    if (type === "1" && this.x === 0 && (this.y > 0 && this.y < 9)) {
      return checkAround(topSide);
    } else if (type === "1" && this.x === 9 && (this.y > 0 && this.y < 9)) {
      return checkAround(bottomSide);
    } else if (type === "1" && (this.y === 0)) {
      return checkAround(leftSide);
    } else if (type === "1" && (this.y === 9)) {
      return checkAround(rightSide);
    }

    if (type === "2" && this.x === 0) {
      orientation === "в" ? checkType = topSide2vert : checkType = topSide2hor;
      return checkAround(checkType);
    } else if (type === "2" && this.x === 8) {
      checkType = botSide2vert;
      return checkAround(checkType);
    } else if (type === "2" && this.x === 9) {
      checkType = botSide2hor;
      return checkAround(checkType);
    } else if (type === "2" && (this.y === 0)) {
      orientation === "в" ? checkType = leftSide2vert : checkType = leftSide2hor;
      return checkAround(checkType);
    } else if (type === "2" && (this.y === 8)) {
      checkType = rightSide2hor;
      return checkAround(checkType);
    } else if (type === "2" && (this.y === 9)) {
      checkType = rightSide2vert;
      return checkAround(checkType);
    }

    if (type === "3" && this.x === 0) {
      orientation === "в" ? checkType = topSide3vert : checkType = topSide3hor;
      return checkAround(checkType);
    } else if (type === "3" && this.x === 7) {
      checkType = botSide3vert;
      return checkAround(checkType);
    } else if (type === "3" && this.x === 9) {
      checkType = botSide3hor;
      return checkAround(checkType);
    } else if (type === "3" && (this.y === 0)) {
      orientation === "в" ? checkType = leftSide3vert : checkType = leftSide3hor;
      return checkAround(checkType);
    } else if (type === "3" && (this.y === 7)) {
      checkType = rightSide3hor;
      return checkAround(checkType);
    } else if (type === "3" && (this.y === 9)) {
      checkType = rightSide3vert;
      return checkAround(checkType);
    }

    if (type === "4" && this.x === 0) {
      orientation === "в" ? checkType = topSide4vert : checkType = topSide4hor;
      return checkAround(checkType);
    } else if (type === "4" && this.x === 6) {
      checkType = botSide4vert;
      return checkAround(checkType);
    } else if (type === "4" && this.x === 9) {
      checkType = botSide4hor;
      return checkAround(checkType);
    } else if (type === "4" && (this.y === 0)) {
      orientation === "в" ? checkType = leftSide4vert : checkType = leftSide4hor;
      return checkAround(checkType);
    } else if (type === "4" && (this.y === 6)) {
      checkType = rightSide4hor;
      return checkAround(checkType);
    } else if (type === "4" && (this.y === 9)) {
      checkType = rightSide4vert;
      return checkAround(checkType);
    }

  }

  this.inside = function (type, orientation) {
    var inside = [[this.x - 1, this.y], [this.x - 1, this.y - 1], [this.x, this.y - 1], [this.x + 1, this.y - 1], [this.x + 1, this.y], [this.x + 1, this.y + 1], [this.x, this.y + 1], [this.x - 1, this.y + 1]];

    var inside2vert = [[this.x - 1, this.y], [this.x - 1, this.y - 1], [this.x, this.y - 1], [this.x + 1, this.y - 1], [this.x + 2, this.y - 1], [this.x + 2, this.y], [this.x + 2, this.y + 1], [this.x + 1, this.y + 1], [this.x, this.y + 1], [this.x - 1, this.y + 1]];

    var inside2hor = [[this.x - 1, this.y], [this.x - 1, this.y - 1], [this.x, this.y - 1], [this.x + 1, this.y - 1], [this.x + 1, this.y], [this.x + 1, this.y + 1], [this.x + 1, this.y + 2], [this.x, this.y + 2], [this.x - 1, this.y + 2], [this.x - 1, this.y + 1]];

    var inside3vert = [[this.x - 1, this.y], [this.x - 1, this.y - 1], [this.x, this.y - 1], [this.x + 1, this.y - 1], [this.x + 2, this.y - 1], [this.x + 3, this.y - 1], [this.x + 3, this.y], [this.x + 3, this.y + 1], [this.x + 2, this.y + 1], [this.x + 1, this.y + 1], [this.x, this.y + 1], [this.x - 1, this.y + 1]];

    var inside3hor = [[this.x - 1, this.y], [this.x - 1, this.y - 1], [this.x, this.y - 1], [this.x + 1, this.y - 1], [this.x + 1, this.y], [this.x + 1, this.y + 1], [this.x + 1, this.y + 2], [this.x + 1, this.y + 3], [this.x, this.y + 3], [this.x - 1, this.y + 3], [this.x - 1, this.y + 2], [this.x - 1, this.y + 1]];

    var inside4vert = [[this.x - 1, this.y], [this.x - 1, this.y - 1], [this.x, this.y - 1], [this.x + 1, this.y - 1], [this.x + 2, this.y - 1], [this.x + 3, this.y - 1], [this.x + 4, this.y - 1], [this.x + 4, this.y], [this.x + 4, this.y + 1], [this.x + 3, this.y + 1], [this.x + 2, this.y + 1], [this.x + 1, this.y + 1], [this.x, this.y + 1], [this.x - 1, this.y + 1], [this.x, this.y + 1]];

    var inside4hor = [[this.x - 1, this.y], [this.x - 1, this.y - 1], [this.x, this.y - 1], [this.x + 1, this.y - 1], [this.x + 1, this.y], [this.x + 1, this.y + 1], [this.x + 1, this.y + 2], [this.x + 1, this.y + 3], [this.x + 1, this.y + 4], [this.x, this.y + 4], [this.x - 1, this.y + 4], [this.x - 1, this.y + 3], [this.x - 1, this.y + 2], [this.x - 1, this.y + 1]];

    if (type === "1" && (this.x > 0 && this.x < 9) && (this.y > 0 && this.y < 9)) {
      return checkAround(inside);
    } else if (type === "2" && (this.x > 0 && this.x < 9) && (this.y > 0 && this.y < 9)) {
      orientation === "в" ? checkType = inside2vert : checkType = inside2hor;
      return checkAround(checkType);
    } else if (type === "3" && (this.x > 0 && this.x < 9) && (this.y > 0 && this.y < 9)) {
      orientation === "в" ? checkType = inside3vert : checkType = inside3hor;
      return checkAround(checkType);
    } else if (type === "4" && (this.x > 0 && this.x < 9) && (this.y > 0 && this.y < 9)) {
      orientation === "в" ? checkType = inside4vert : checkType = inside4hor;
      return checkAround(checkType);
    }
  }
}

//функция проверки правильного расположения кораблей
function checkRulePlacement(x, y, type, orientation) {
  var checkCorners;
  var checkSides;
  var checkInside;
  var checkResult;
  var touch;

  if (playerDesk[x][y] === ship) {
    alert("Нарушение правил!\n\nНельзя ставить корабли друг на друга!")
    return false;
  }
  //проверка на выход за границы поля
  if (type === "2" && (orientation === "г" || orientation === "Г") && y === 9) {
    alert("Некорректные координаты!\n\nВсе " + type + " палубы должны уместиться на поле")
    return false;
  } else if (type === "3" && (orientation === "г" || orientation === "Г") && y >= 8) {
    alert("Некорректные координаты!\n\nВсе " + type + " палубы должны уместиться на поле")
    return false;
  } else if (type === "4" && (orientation === "г" || orientation === "Г") && y >= 7) {
    alert("Некорректные координаты!\n\nВсе " + type + " палубы должны уместиться на поле")
    return false;
  }

  if (type === "2" && (orientation === "в" || orientation === "В") && x === 9) {
    alert("Некорректные координаты!\n\nВсе " + type + " палубы должны уместиться на поле")
    return false;
  } else if (type === "3" && (orientation === "в" || orientation === "В") && x >= 8) {
    alert("Некорректные координаты!\n\nВсе " + type + " палубы должны уместиться на поле")
    return false;
  } else if (type === "4" && (orientation === "в" || orientation === "В") && x >= 7) {
    alert("Некорректные координаты!\n\nВсе " + type + " палубы должны уместиться на поле")
    return false;
  }

  touch = new TouchRules(x, y);

  //проверка на близость уголовых кораблей
  checkCorners = touch.corners(type, orientation);
  if (checkCorners) {
    return checkResult = true;
  }
  //проверка на близость кораблей расположенных по сторонам поля
  checkSides = touch.sides(type, orientation);
  if (checkSides) {
    return checkResult = true;
  }
  //проверка на близость кораблей расположенных внутри поля
  checkInside = touch.inside(type, orientation);
  if (checkInside) {
    return checkResult = true;
  }

  return false;
}

//функция проверки защитного поля вокруг корабля
function checkAround(rule) {
  var placesAround = [];
  for (var check in rule) {
    var startPoint = rule[check];
    var row = startPoint[0];
    var col = startPoint[1];
    if (playerDesk[row][col] == 1) {
      placesAround.push(false);
    } else {
      //playerDesk[row][col] = "s";
      placesAround.push(true);
    }
  }
  //console.log(rule);
  //console.log(placesAround);

  for (var i = 0; i < placesAround.length; i++) {
    if (placesAround[i] === false) {
      alert("ОШИБКА!\n\nПри размещении корабли не могут косаться друг друга сторонами и углами. Задайте другие координаты.");
      return false;
    }
  }
  return true;
}

//функция проверки количества кораблей
function typeShipsCount(shipType) {
  switch (shipType) {
    case "1": ships1x = ships1x - 1; break;
    case "2": ships2x = ships2x - 1; break;
    case "3": ships3x = ships3x - 1; break;
    case "4": ships4x = ships4x - 1; break;
  }

  if (shipType === "1" && ships1x <= -1) {
    alert("Вы использовали все однопалубные корабли");
    return false;
  } else if (shipType === "2" && ships2x <= -1) {
    alert("Вы использовали все двухпалубные корабли");
    return false;
  } else if (shipType === "3" && ships3x <= -1) {
    alert("Вы использовали все трехпалубные корабли");
    return false;
  } else if (shipType === "4" && ships4x <= -1) {
    alert("Вы использовали единственный четырехпалубный корабль");
    return false;
  } else {
    shipsCount = shipsCount - 1;
    return true;
  }
}













