$(function () {
  var newShip = $("#new_ship");
  var myDesk = $(".battlefield-my");
  var status = document.querySelector('.status');

  //добавление кораблей на поле
  newShip.click(function () {
    if (shipsCount === 0) {
      alert("Вы успешно расставили все корабли! Можно начинать играть.")
      return true;
    }
    //запрашиваем у игрока данные о корабле который хотим поставить
    var data = inputData();

    //создаем корабли на основе полученных данных
    createShips(data[0], data[1], data[2], data[3])

    function inputData() {
      regCol = /[абвгдежзик]/i;
      regRow = /[0-9]/;
      var col;
      var row;
      var orient;
      var dataArr = [];
      var orient = false;
      var colNum = false;
      var rowNum = false;
      var type = false;

      while (colNum === false) {
        colNum = inputCol();
      }
      dataArr.push(colNum);

      while (rowNum === false) {
        rowNum = inputRow();
      }
      dataArr.push(rowNum);

      while (type === false) {
        type = inputType();
      }
      dataArr.push(type);

      while (orient === false) {
        orient = inputOrientation();
      }
      dataArr.push(orient);

      function inputCol() {
        col = prompt("Введите букву колонки (А-К а-к): ");
        if (regCol.test(col) && col.length < 2) {
          switch (col) {
            case "а": col = 1; break
            case "А": col = 1; break
            case "б": col = 2; break
            case "Б": col = 2; break
            case "в": col = 3; break
            case "В": col = 3; break
            case "г": col = 4; break
            case "Г": col = 4; break
            case "д": col = 5; break
            case "Д": col = 5; break
            case "е": col = 6; break
            case "Е": col = 6; break
            case "ж": col = 7; break
            case "Ж": col = 7; break
            case "з": col = 8; break
            case "З": col = 8; break
            case "и": col = 9; break
            case "И": col = 9; break
            case "к": col = 10; break
            case "К": col = 10; break
          }
          return col;
        } else {
          alert("ОШИБКА!\n\nНекорректные координаты колонки.\nВведите русскую букву от А до К (независимо от регистра).");
          return false;
        }
      }

      function inputRow() {
        row = parseInt(prompt("Введите номер строки (1-10): "));
        if (regRow.test(row) && row <= 10) {
          return row;
        } else {
          alert("ОШИБКА!\n\nНекорректные координаты строки.\nВведите цифру от 1 до 10.");
          return false;
        }
      }

      function inputType() {
        type = prompt("Тип корабля (количество палуб).\n\nВведите цифру от 1 до 4.");
        if (type >= 1 && type <= 4) {
          return type;
        } else {
          alert("ОШИБКА!\n\nПалуб не может быть меньше одной и больше 4");
          return false;
        }
      }

      function inputOrientation() {
        if (dataArr[2] === "1") return true;
        orient = prompt("Укажите как поставить корабль\n\nв - вертикально\nг - горизонтально");
        if (orient === "г" || orient === "Г" || orient === "в" || orient === "В" || orient == "") {
          return orient;
        } else {
          alert("ОШИБКА!\n\nНекорректные данные!");
          return false;
        }
      }

      return dataArr;
    }

    //закрашиваем клетки на поле
    for (rowNumber in playerDesk) {

      var row = playerDesk[rowNumber];

      for (columnNumber in row) {
        var column = row[columnNumber]
        var cell = $(".battlefield-cell-content[data-y=" + rowNumber + "][data-x=" + columnNumber + "]", myDesk);

        if (column == ship) {
          cell.removeClass("save");
          cell.addClass("ship");
        } else if (column == "s") {
          cell.addClass("save");
          cell.removeClass("ship");
        }
      }
    }
  });
});

