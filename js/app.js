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
var currentDesk;

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
function createShips (col, row, type, orientation, whodesk) {
  if(shipsCount != 0) {
   // записываем в массив координаты корабля в зависимости от ориентации
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
    // размещаем корабль в матрице
    var currentDesk = placeShip(coordinates, type, whodesk);
    return currentDesk;
  } else {
    alert("Вы использовали все свои корабли");
  }
}

// функция размещения кораблей 
function placeShip(coordinates, type, whoDesk){
  
  if(checkShipsCount(type)) {
    //оределяем на чьей доске размещать корабли
    switch(whoDesk) {
      case "player1": currentDesk = player1_desk_my; break
      case "player2": currentDesk = player2_desk_enemy; break
    }

    //высчитываем координаты корабля в матрице
    for(var dot in coordinates) {  
      var coordinate = coordinates[dot];
      var row = coordinate[0]-1;
      var col = coordinate[1]-1;
      var placesAround = [];
      //высчитываем координаты полей вокруг однопалубного корабля
      var check1x = [[row-1, col], [row+1, col], [row, col-1], [row, col+1], [row-1, col-1], [row-1, col+1], [row+1, col-1], [row+1, col+1]];
      
      //если корабль однопалубный
      if(type === "1" && ships1x !== 0){
        //проверяем первую клетку
        if(currentDesk[row][col] === ship){
          alert("Нельзя ставить корабли друг на друга!\nЗадайте другие координаты.")
          return currentDesk;
        }
        //проверям клетки вокруг корабля, записывая результат в массив placesAround
        for(var checkFree in check1x) {
          var checkPlace = check1x[checkFree];
          var checkX = checkPlace[0];
          var checkY = checkPlace[1];

          if((checkX < 0 || checkY < 0) || (checkX >= 10 || checkY >= 10)){
            placesAround.push(true);
          } else if(currentDesk[checkX][checkY] === free) {
            placesAround.push(true);
          } else {
            placesAround.push(false);
          }
        }
        //проверям правило касания перебирая массив placesAround
        for(var i = 0; i < placesAround.length; i++){
          if(placesAround[i] === false){
            alert("ПРАВИЛО\nПри размещении корабли не могут косаться друг друга сторонами и углами.\nЗадайте другие координаты."); 
            return currentDesk;
          }
        }
      }
    }

    currentDesk[row][col] = ship;
    return currentDesk;
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













