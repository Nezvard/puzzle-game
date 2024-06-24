var emptyRow = 2;
var emptyCol = 2;

var makeMoveHandler = function (tile, i, j) {
  var row = i;
  var col = j;

  return function () {
    var rowOffset = Math.abs(emptyRow - row);
    var colOffset = Math.abs(emptyCol - col);

    if (
      (rowOffset == 1 && colOffset == 0) ||
      (rowOffset == 0 && colOffset == 1)
    ) {
      tile.style.marginLeft = emptyCol * 200 + "px";
      tile.style.marginTop = emptyRow * 200 + "px";
      [row, emptyRow] = [emptyRow, row];
      [col, emptyCol] = [emptyCol, col];
    }
  };
};

var shuffle = function () {
  var rows = document.querySelectorAll(".row");
  for (let i = 0; i < 85; ++i) {
    var row = ~~(Math.random() * rows.length);
    var tiles = rows.item(row).querySelectorAll(".tile");
    var tile = ~~(Math.random() * tiles.length);
    tiles.item(tile).click();
  }
};

var initTiles = function () {
  var rows = document.querySelectorAll(".row");

  for (let i = 0; i < rows.length; ++i) {
    var row = rows.item(i);

    var tiles = row.querySelectorAll(".tile");
    for (let j = 0; j < tiles.length; ++j) {
      var tile = tiles.item(j);

      tile.addEventListener("click", makeMoveHandler(tile, i, j));

      tile.style.marginLeft = j * 200 + "px";
      tile.style.marginTop = i * 200 + "px";

      tile.style.backgroundPosition = `${600 - j * 200}px ${600 - i * 200}px`;
    }
  }
};

initTiles();
shuffle();
