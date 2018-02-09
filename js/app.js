var free = 0; // свободно
var ship = 1; // занятo
var miss = 1; // промах
var hit = 2; // попал

var rows = 10;
var columns = 10;
var shipsCount = 10;
var ships1x = 4;
var ships2x = 3;
var ships3x = 2;
var ships4x = 1;
var shipType;
var playDesk;

// создаем две игровых доски (матрицы)
var player1_desk_my = matrixArray(10, 10);
var player2_desk_enemy = matrixArray(10, 10);


// функция построения игровых полей
function matrixArray(rows, columns){
  var matrix = [];
  for(var i=0; i<rows; i++){
    matrix[i] = [];
    for(var j=0; j<columns; j++){
        matrix[i][j] = free;
    }
  }
  return matrix;
}

// функция создания кораблей
function createShips (col, row, type, orientation) {
  if(shipsCount != 0) {
   // записываем в массив coordinates координаты клеток корабля в зависимости от ориентации
    var coordinates = [];
    if (orientation == "|") {
      for(var i = 0; i < type; i++) {
        coordinates.push([row, col]);
        row = row + 1;
      }
    } else {
      for(var i = 0; i < type; i++) {
        coordinates.push([row, col]);
        col = col + 1;
      }
    }
    // размещаем корабль в массиве матрицы
    placeShip(coordinates, type);
  } else {
    alert("Вы использовали все свои корабли");
  }
}

// функция размещения корабля в массиве матрицы
function placeShip(coordinates, type){
  
  var check = checkRulePlacement(coordinates, type);
  if(check) {
    return player1_desk_my;
  }
}



// функция проверки правил расположения кораблей
function checkRulePlacement(coordinates, type) {

  //высчитываем координаты корабля в массиве матрицы
  for(var dot in coordinates) {  

    var coordinate = coordinates[dot];
    var row = coordinate[0]-1;
    var col = coordinate[1]-1;
    var placesAround = [];

    //координаты проверочных полей вокруг однопалубных кораблей внутри поля
    var check1x = [[row-1, col], [row-1, col-1], [row, col-1], [row+1, col-1], [row+1, col], [row+1, col+1], [row, col+1], [row-1, col+1]];

    //координаты проверочных полей вокруг угловых однопалубных кораблей
    var check1xLeftTop = [[row, col+1], [row+1, col], [row+1, col+1]];
    var check1xRightTop = [[row, col-1], [row+1, col], [row+1, col-1]];
    var check1xLeftBottom = [[row, col+1], [row-1, col], [row-1, col+1]];
    var check1xRightBottom = [[row, col-1], [row-1, col], [row-1, col-1]];

    //координаты проверочных полей вокруг однопалубных кораблей на 1 строке
    var check1xTop = [[row, col-1], [row+1, col-1], [row+1, col], [row+1, col+1], [row, col+1]];

    //координаты проверочных полей вокруг однопалубных кораблей на 10 строке
    var check1xBottom = [[row, col-1], [row-1, col-1], [row-1, col], [row-1, col+1], [row, col+1]];

    //координаты проверочных полей вокруг однопалубных кораблей в первой колонке (А)
    var check1Left = [[row-1, col], [row-1, col+1], [row, col+1], [row+1, col+1], [row+1, col]];

    //координаты проверочных полей вокруг однопалубных кораблей в последней колонке (К)
    var check1Right = [[row-1, col], [row-1, col-1], [row, col-1], [row+1, col-1], [row+1, col]];
    

    //в зависимости от кораблей и их положения делаем проверку
    
    /* ------- однопалубные ------------*/

    if(type === "1" && row === 0 && (col === 0)){
      //Углы
      checkRuleFor(check1xLeftTop);
    } else if (type === "1" && row === 0 && (col === 9)){
      checkRuleFor(check1xRightTop);
    } else if (type === "1" && row === 9 && (col === 9)){
      checkRuleFor(check1xRightBottom);
    } else if (type === "1" && row === 9 && (col === 0)){
      checkRuleFor(check1xLeftBottom);
    } else if (type === "1" && row === 0 && (col > 0 && col < 9)){
      //Стороны
      checkRuleFor(check1xTop);
    } else if (type === "1" && row === 9 && (col > 0 && col < 9)){
      checkRuleFor(check1xBottom);
    } else if (type === "1" && (col === 0)){
      checkRuleFor(check1Left);
    } else if (type === "1" && (col === 9)){
      checkRuleFor(check1Right);
    } else if (type === "1" && (row > 0 && row < 9) && (col > 0 && col < 9)){
      //Внутри поля 
      checkRuleFor(check1x);
    } 

    /* ------- двухпалубные ------------*/
  }


  function checkRuleFor(rule) {

    //проверяем текущее местоположение корабля 
    if(player1_desk_my[row][col] === ship){
      alert("Нельзя ставить корабли друг на друга!Задайте другие координаты.")
      return false;
    }

    //проверям клетки вокруг корабля, записывая результат в массив placesAround
    for(var checkFree in rule) {
      var checkPlace = rule[checkFree];
      var checkX = checkPlace[0];
      var checkY = checkPlace[1];

      if(player1_desk_my[checkX][checkY] === free) {
        placesAround.push(true);
      } else {
        placesAround.push(false);
      }
    }

    //проверям правило касания перебирая массив placesAround
    for(var i = 0; i < placesAround.length; i++){
      if(placesAround[i] === false){
        alert("ОШИБКА!\nПри размещении корабли не могут косаться друг друга сторонами и углами. Задайте другие координаты."); 
        return false;
      } 
    }
    //считаем количество оставшихся кораблей
    var hasSheeps = checkShipsCount(type);
    if(hasSheeps) {
      //ставим кораблю в матрицу
      player1_desk_my[row][col] = ship;
    } else {
      return false;
    }
  }
}



// функция проверки количества кораблей
function checkShipsCount(shipType) {

  switch(shipType) {
    case "1": ships1x = ships1x - 1; break;
    case "2": ships2x = ships2x - 1; break;
    case "3": ships3x = ships3x - 1; break;
    case "4": ships4x = ships4x - 1; break;
  }

  if(shipsCount <= -1) {
    alert("Вы использовали все свои корабли")
    return false;
  } else if (shipType === "1" &&  ships1x <= -1) {
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
    return true;
  }
}













