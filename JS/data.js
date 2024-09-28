const ROOT_DIV = document.getElementById("root");

function Square(color, id, piece) {
    return { color, id, piece };
}

function SquareRow(rowId) {
    const squareRow = [];
    const alphapos = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    if (rowId % 2 == 0) {
        alphapos.forEach((element, index) => {
            if (index % 2 == 0) {
                squareRow.push(Square("white", element + rowId, null));
            }
            else {
                squareRow.push(Square("black", element + rowId, null));
            }
        });
    }
    else {
        alphapos.forEach((element, index) => {
            if (index % 2 == 0) {
                squareRow.push(Square("black", element + rowId, null));
            }
            else {
                squareRow.push(Square("white", element + rowId, null));
            }
        });
    }

    return squareRow;
}

function initGame() {
    return [SquareRow(8), SquareRow(7), SquareRow(6), SquareRow(5), SquareRow(4), SquareRow(3), SquareRow(2), SquareRow(1)];
}

export { initGame, ROOT_DIV };