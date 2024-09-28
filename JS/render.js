import * as pieces from "./pieces.js";
import { ROOT_DIV } from "./data.js";
import { globalState } from "../script.js";

const globalPiece = new Object()

function globalStateRender() {
    globalState.forEach(row => {
        row.forEach(element => {
            if (element.highlight) {
                const highlightSpan = document.createElement("span");
                highlightSpan.classList.add("highlight");
                document.getElementById(element.id).appendChild(highlightSpan);
            } else if (element.highlight === null) {
                const el = document.getElementById(element.id);
                const highlights = Array.from(el.getElementsByClassName("highlight"));
                highlights.forEach(element => {
                    el.removeChild(element);
                });
            }

            if (element.change != null && element.piece != null) {

                const square = element;
                const squareEl = document.getElementById(square.id)
                squareEl.innerHTML = "";

                const image = document.createElement("img");
                image.src = square.piece.img;
                image.classList.add("img-size");

                squareEl.appendChild(image);
            } else {
                const el = document.getElementById(element.id);
                const pieces = Array.from(el.getElementsByClassName("piece"));
                pieces.forEach(element => {
                    el.removeChild(element);
                });
            }
        });
    });
}

function pieceRender(data) {
    data.forEach((row) => {
        row.forEach((square) => {
            if (square.piece) {
                const squareEl = document.getElementById(square.id)

                const image = document.createElement("img");
                image.src = square.piece.img;
                image.classList.add("img-size");

                squareEl.appendChild(image);
            }
        });
    });
}

function initGameRender(data) {
    data.forEach((row) => {
        const rowEl = document.createElement("div");
        row.forEach((square) => {
            const squareDiv = document.createElement("div");
            squareDiv.classList.add("square", square.color);
            squareDiv.id = square.id;

            if (square.id == "e1") {
                square.piece = pieces.whiteKing(square.id);
                globalPiece.white_king = square.piece;
            }

            if (square.id == "d1") {
                square.piece = pieces.whiteQueen(square.id);
                globalPiece.white_queen = square.piece;
            }

            if (square.id == "c1" || square.id == "f1") {
                square.piece = pieces.whiteBishop(square.id);
                if (globalPiece.white_bishop_1) {
                    globalPiece.white_bishop_2 = square.piece;
                } else {
                    globalPiece.white_bishop_1 = square.piece;
                }
            }

            if (square.id == "b1" || square.id == "g1") {
                square.piece = pieces.whiteKnight(square.id);
                if (globalPiece.white_knight_1) {
                    globalPiece.white_knight_2 = square.piece;
                } else {
                    globalPiece.white_knight_1 = square.piece;
                }
            }

            if (square.id == "a1" || square.id == "h1") {
                square.piece = pieces.whiteRook(square.id);
                if (globalPiece.white_rook_1) {
                    globalPiece.white_rook_2 = square.piece;
                } else {
                    globalPiece.white_rook_1 = square.piece;
                }
            }

            if (square.id[1] == 2) {
                square.piece = pieces.whitePawn(square.id);
                if (globalPiece.white_pawn_7) {
                    globalPiece.white_pawn_8 = square.piece;
                } else if (globalPiece.white_pawn_6) {
                    globalPiece.white_pawn_7 = square.piece;
                } else if (globalPiece.white_pawn_5) {
                    globalPiece.white_pawn_6 = square.piece;
                } else if (globalPiece.white_pawn_4) {
                    globalPiece.white_pawn_5 = square.piece;
                } else if (globalPiece.white_pawn_3) {
                    globalPiece.white_pawn_4 = square.piece;
                } else if (globalPiece.white_pawn_2) {
                    globalPiece.white_pawn_3 = square.piece;
                } else if (globalPiece.white_pawn_1) {
                    globalPiece.white_pawn_2 = square.piece;
                } else {
                    globalPiece.white_pawn_1 = square.piece;
                }
            }

            if (square.id == "e8") {
                square.piece = pieces.blackKing(square.id);
                globalPiece.black_king = square.piece;
            }

            if (square.id == "d8") {
                square.piece = pieces.blackQueen(square.id);
                globalPiece.black_queen = square.piece;
            }

            if (square.id == "c8" || square.id == "f8") {
                square.piece = pieces.blackBishop(square.id);
                if (globalPiece.black_bishop_1) {
                    globalPiece.black_bishop_2 = square.piece;
                } else {
                    globalPiece.black_bishop_1 = square.piece;
                }
            }

            if (square.id == "b8" || square.id == "g8") {
                square.piece = pieces.blackKnight(square.id);
                if (globalPiece.black_knight_1) {
                    globalPiece.black_knight_2 = square.piece;
                } else {
                    globalPiece.black_knight_1 = square.piece;
                }
            }

            if (square.id == "a8" || square.id == "h8") {
                square.piece = pieces.blackRook(square.id);
                if (globalPiece.black_rook_1) {
                    globalPiece.black_rook_2 = square.piece;
                } else {
                    globalPiece.black_rook_1 = square.piece;
                }
            }

            if (square.id[1] == 7) {
                square.piece = pieces.blackPawn(square.id);
                if (globalPiece.black_pawn_7) {
                    globalPiece.black_pawn_8 = square.piece;
                } else if (globalPiece.black_pawn_6) {
                    globalPiece.black_pawn_7 = square.piece;
                } else if (globalPiece.black_pawn_5) {
                    globalPiece.black_pawn_6 = square.piece;
                } else if (globalPiece.black_pawn_4) {
                    globalPiece.black_pawn_5 = square.piece;
                } else if (globalPiece.black_pawn_3) {
                    globalPiece.black_pawn_4 = square.piece;
                } else if (globalPiece.black_pawn_2) {
                    globalPiece.black_pawn_3 = square.piece;
                } else if (globalPiece.black_pawn_1) {
                    globalPiece.black_pawn_2 = square.piece;
                } else {
                    globalPiece.black_pawn_1 = square.piece;
                }
            }

            rowEl.appendChild(squareDiv);
        });
        rowEl.classList.add("squareRow");
        ROOT_DIV.appendChild(rowEl);
    });
    pieceRender(data);
}

function selfHighlight(piece) {
    const currentState = globalState.flat()
    currentState.forEach(square => {
        if (piece.currentPosition == square.id) {
            document.getElementById(piece.currentPosition).classList.add(`${square.color}yellow`);
        }
    });
}

function renderHighlight(squareId) {
    const highlightSpan = document.createElement("span");
    highlightSpan.classList.add("highlight");
    document.getElementById(squareId).appendChild(highlightSpan);
}

function clearHighlight() {
    const currentState = globalState.flat();
    currentState.forEach((el) => {
        if (el.captureHighlight) {
            document.getElementById(el.id).classList.remove("capturecolor");
            el.captureHighlight = false;
        }

        if (el.highlight) {
            el.highlight = null;
        }

        globalStateRender();
    });
}

export { globalPiece, globalStateRender, initGameRender, renderHighlight, clearHighlight, selfHighlight };