import { ROOT_DIV } from "./data.js";
import { globalState, keysquareObject } from "../script.js";
import { globalPiece, globalStateRender, clearHighlight, selfHighlight } from "./render.js";
import { checkOpponentPiece, checkAvailableSquareByColor, checkAvailableSquare, kingAvailableSquare, kingHighlightIds, kingCaptureIds, queenHighlightIds, queenCaptureIds, bishopHighlightIds, bishopCaptureIds, knightHighlightIds, knightCaptureIds, rookHighlightIds, rookCaptureIds, pawnCaptureIds, isSubset } from "./helper.js";
import logMoves from "./Log.js";
import pawnPromotion from "./promotion.js";

let turn = "white";
let colorInCheck = null;
let highlight_state = false;
let selfHighlight_state = null;
let moveState = null;

function changeTurn() {
    turn = turn === "white" ? "black" : "white";
}

function clearHighlightLocal() {
    clearHighlight();
    highlight_state = false;
}

function movePiecefromXtoY(from, to) {
    to.piece = from.piece;
    from.piece = null;
    globalStateRender();
}

function clearPrevSelfHighlight(piece) {
    if (piece) {
        document.getElementById(piece.currentPosition).classList.remove("whiteyellow", "blackyellow");
        selfHighlight_state = null;
    }
}


// function isCheck() {

//     if (turn == "black") {

//         const whiteKingCurrentPosition = globalPiece.white_king.currentPosition;

//         const king = globalPiece.black_king.currentPosition;
//         const queen = globalPiece.black_queen.currentPosition;
//         const bishop1 = globalPiece.black_bishop_1.currentPosition;
//         const bishop2 = globalPiece.black_bishop_2.currentPosition;
//         const knight1 = globalPiece.black_knight_1.currentPosition;
//         const knight2 = globalPiece.black_knight_2.currentPosition;
//         const rook1 = globalPiece.black_rook_1.currentPosition;
//         const rook2 = globalPiece.black_rook_2.currentPosition;

//         let checkList = [];

//         checkList.push(knightCaptureIds(king, turn));
//         checkList.push(queenCaptureIds(queen, turn));
//         checkList.push(bishopCaptureIds(bishop1, turn));
//         checkList.push(bishopCaptureIds(bishop2, turn));
//         checkList.push(knightCaptureIds(knight1, turn));
//         checkList.push(knightCaptureIds(knight2, turn));
//         checkList.push(rookCaptureIds(rook1, turn));
//         checkList.push(rookCaptureIds(rook2, turn));

//         checkList = checkList.flat();

//         const CheckOrNot = checkList.find((element) => element === whiteKingCurrentPosition);

//         // NOT SURE
//         if (CheckOrNot) {
//             colorInCheck = "white";
//         } else {
//             colorInCheck = null;
//         }

//     } else {

//         const blackKingCurrentPosition = globalPiece.black_king.currentPosition;

//         const king = globalPiece.white_king.currentPosition;
//         const queen = globalPiece.white_queen.currentPosition;
//         const bishop1 = globalPiece.white_bishop_1.currentPosition;
//         const bishop2 = globalPiece.white_bishop_2.currentPosition;
//         const knight1 = globalPiece.white_knight_1.currentPosition;
//         const knight2 = globalPiece.white_knight_2.currentPosition;
//         const rook1 = globalPiece.white_rook_1.currentPosition;
//         const rook2 = globalPiece.white_rook_2.currentPosition;

//         let checkList = [];

//         checkList.push(knightCaptureIds(king, turn));
//         checkList.push(queenCaptureIds(queen, turn));
//         checkList.push(bishopCaptureIds(bishop1, turn));
//         checkList.push(bishopCaptureIds(bishop2, turn));
//         checkList.push(knightCaptureIds(knight1, turn));
//         checkList.push(knightCaptureIds(knight2, turn));
//         checkList.push(rookCaptureIds(rook1, turn));
//         checkList.push(rookCaptureIds(rook2, turn));

//         checkList = checkList.flat();

//         const CheckOrNot = checkList.find((element) => element === blackKingCurrentPosition);

//         // NOT SURE
//         if (CheckOrNot) {
//             colorInCheck = "black";
//         } else {
//             colorInCheck = null;
//         }

//     }
// }

// NOT SURE
function isCheck() {

    const whiteKingCurrentPosition = globalPiece.white_king.currentPosition;
    const blackKingCurrentPosition = globalPiece.black_king.currentPosition;

    const blackking = globalPiece.black_king.currentPosition;
    const blackqueen = globalPiece.black_queen.currentPosition;
    const blackbishop1 = globalPiece.black_bishop_1.currentPosition;
    const blackbishop2 = globalPiece.black_bishop_2.currentPosition;
    const blackknight1 = globalPiece.black_knight_1.currentPosition;
    const blackknight2 = globalPiece.black_knight_2.currentPosition;
    const blackrook1 = globalPiece.black_rook_1.currentPosition;
    const blackrook2 = globalPiece.black_rook_2.currentPosition;
    const blackpawn1 = globalPiece.black_pawn_1.currentPosition;
    const blackpawn2 = globalPiece.black_pawn_2.currentPosition;
    const blackpawn3 = globalPiece.black_pawn_3.currentPosition;
    const blackpawn4 = globalPiece.black_pawn_4.currentPosition;
    const blackpawn5 = globalPiece.black_pawn_5.currentPosition;
    const blackpawn6 = globalPiece.black_pawn_6.currentPosition;
    const blackpawn7 = globalPiece.black_pawn_7.currentPosition;
    const blackpawn8 = globalPiece.black_pawn_8.currentPosition;

    const whiteking = globalPiece.white_king.currentPosition;
    const whitequeen = globalPiece.white_queen.currentPosition;
    const whitebishop1 = globalPiece.white_bishop_1.currentPosition;
    const whitebishop2 = globalPiece.white_bishop_2.currentPosition;
    const whiteknight1 = globalPiece.white_knight_1.currentPosition;
    const whiteknight2 = globalPiece.white_knight_2.currentPosition;
    const whiterook1 = globalPiece.white_rook_1.currentPosition;
    const whiterook2 = globalPiece.white_rook_2.currentPosition;
    const whitepawn1 = globalPiece.white_pawn_1.currentPosition;
    const whitepawn2 = globalPiece.white_pawn_2.currentPosition;
    const whitepawn3 = globalPiece.white_pawn_3.currentPosition;
    const whitepawn4 = globalPiece.white_pawn_4.currentPosition;
    const whitepawn5 = globalPiece.white_pawn_5.currentPosition;
    const whitepawn6 = globalPiece.white_pawn_6.currentPosition;
    const whitepawn7 = globalPiece.white_pawn_7.currentPosition;
    const whitepawn8 = globalPiece.white_pawn_8.currentPosition;

    let blackcheckList = [];
    let whitecheckList = [];

    blackcheckList.push(kingCaptureIds(blackking, "black"));
    blackcheckList.push(queenCaptureIds(blackqueen, "black"));
    blackcheckList.push(bishopCaptureIds(blackbishop1, "black"));
    blackcheckList.push(bishopCaptureIds(blackbishop2, "black"));
    blackcheckList.push(knightCaptureIds(blackknight1, "black"));
    blackcheckList.push(knightCaptureIds(blackknight2, "black"));
    blackcheckList.push(rookCaptureIds(blackrook1, "black"));
    blackcheckList.push(rookCaptureIds(blackrook2, "black"));
    blackcheckList.push(pawnCaptureIds(blackpawn1, "black"));
    blackcheckList.push(pawnCaptureIds(blackpawn2, "black"));
    blackcheckList.push(pawnCaptureIds(blackpawn3, "black"));
    blackcheckList.push(pawnCaptureIds(blackpawn4, "black"));
    blackcheckList.push(pawnCaptureIds(blackpawn5, "black"));
    blackcheckList.push(pawnCaptureIds(blackpawn6, "black"));
    blackcheckList.push(pawnCaptureIds(blackpawn7, "black"));
    blackcheckList.push(pawnCaptureIds(blackpawn8, "black"));

    whitecheckList.push(kingCaptureIds(whiteking, "white"));
    whitecheckList.push(queenCaptureIds(whitequeen, "white"));
    whitecheckList.push(bishopCaptureIds(whitebishop1, "white"));
    whitecheckList.push(bishopCaptureIds(whitebishop2, "white"));
    whitecheckList.push(knightCaptureIds(whiteknight1, "white"));
    whitecheckList.push(knightCaptureIds(whiteknight2, "white"));
    whitecheckList.push(rookCaptureIds(whiterook1, "white"));
    whitecheckList.push(rookCaptureIds(whiterook2, "white"));
    whitecheckList.push(pawnCaptureIds(whitepawn1, "white"));
    whitecheckList.push(pawnCaptureIds(whitepawn2, "white"));
    whitecheckList.push(pawnCaptureIds(whitepawn3, "white"));
    whitecheckList.push(pawnCaptureIds(whitepawn4, "white"));
    whitecheckList.push(pawnCaptureIds(whitepawn5, "white"));
    whitecheckList.push(pawnCaptureIds(whitepawn6, "white"));
    whitecheckList.push(pawnCaptureIds(whitepawn7, "white"));
    whitecheckList.push(pawnCaptureIds(whitepawn8, "white"));

    blackcheckList = blackcheckList.flat();
    whitecheckList = whitecheckList.flat();

    const whiteCheckOrNot = blackcheckList.find((element) => element === whiteKingCurrentPosition);
    const blackCheckOrNot = whitecheckList.find((element) => element === blackKingCurrentPosition);

    if (blackCheckOrNot) {
        colorInCheck = "black";
    } else if (whiteCheckOrNot) {
        colorInCheck = "white";
    } else {
        colorInCheck = null;
    }

    // NEED TO CHECK ALL HIGHLIGHTS, THIS ONE SHOULD BE UPDATED
    if (isSubset(blackcheckList, kingAvailableSquare(whiteKingCurrentPosition, "WHITE"))) {
        console.log("checkmate");
    } else {
        console.log("no")
    }
}

// NOT SURE
function highlightOfCheck() {

    const whiteKingCurrentPosition = globalPiece.white_king.currentPosition;
    const blackKingCurrentPosition = globalPiece.black_king.currentPosition;

    if (colorInCheck === "white") {
        document.getElementById(whiteKingCurrentPosition).classList.add("check");
    } else {
        document.getElementById(whiteKingCurrentPosition).classList.remove("check");
        globalState.flat().forEach(square => {
            if (!square.piece) {
                document.getElementById(square.id).classList?.remove("check")
            }
        });
    }

    if (colorInCheck === "black") {
        document.getElementById(blackKingCurrentPosition).classList.add("check");
    } else {
        document.getElementById(blackKingCurrentPosition).classList.remove("check");
        globalState.flat().forEach(square => {
            if (!square.piece) {
                document.getElementById(square.id).classList?.remove("check")
            }
        });
    }

}

function checkPawnPromotion(piece, id) {

    if (turn === "white") {
        if (piece?.piece_name?.toLowerCase()?.includes('pawn') && id?.includes('8')) {
            return true;
        } else {
            return false;
        }
    } else {
        if (piece?.piece_name?.toLowerCase()?.includes('pawn') && id?.includes('1')) {
            return true;
        } else {
            return false;
        }
    }

}

function callbackPawnPromotion(piece, id) {
    const realPiece = piece(id)
    const currentSquare = keysquareObject[id];
    piece.currentPosition = id;
    currentSquare.piece = realPiece;
    const image = document.createElement("img");
    image.src = realPiece.img;
    image.classList.add("img-size");

    const currentHTML = document.getElementById(id);
    currentHTML.innerHTML = "";
    currentHTML.append(image);
}

function moveElement(piece, id) {

    const promotion = checkPawnPromotion(piece, id);

    if (promotion) {
        pawnPromotion(turn, callbackPawnPromotion, id);
    }

    if (piece.piece_name.includes("KING") || piece.piece_name.includes("ROOK")) {
        piece.move = true;

        if (piece.piece_name == "WHITE_KING" && keysquareObject["a1"].piece.piece_name == "WHITE_ROOK") {
            if (id === "c1") {
                let rook = keysquareObject["a1"];
                moveElement(rook.piece, "d1");
                changeTurn();
            }
        }

        if (piece.piece_name == "WHITE_KING" && keysquareObject["h1"].piece.piece_name == "WHITE_ROOK") {
            if (id === "g1") {
                let rook = keysquareObject["h1"];
                moveElement(rook.piece, "f1");
                changeTurn();
            }
        }

        if (piece.piece_name == "BLACK_KING" && keysquareObject["a8"].piece.piece_name == "BLACK_ROOK") {
            if (id === "c8") {
                let rook = keysquareObject["a8"];
                moveElement(rook.piece, "d8");
                changeTurn();
            }
        }

        if (piece.piece_name == "BLACK_KING" && keysquareObject["h8"].piece.piece_name == "BLACK_ROOK") {
            if (id === "g8") {
                let rook = keysquareObject["h8"];
                moveElement(rook.piece, "f8");
                changeTurn();
            }
        }
    }

    console.log(keysquareObject["h8"].piece.piece_name)
    logMoves({ from: piece.currentPosition, to: id, piece: piece.piece_name }, turn);

    const currentState = globalState.flat();

    currentState.forEach(el => {
        if (el.id == piece.currentPosition) {
            delete el.piece;
        }
        if (el.id == id) {
            if (el.piece) {
                el.piece.currentPosition = null;
            }
            el.piece = piece;
        }
    });

    clearHighlight();

    const prevPiece = document.getElementById(piece.currentPosition);
    prevPiece.classList.remove("whiteyellow");
    prevPiece.classList.remove("blackyellow");

    const currentPiece = document.getElementById(id);
    currentPiece.innerHTML = prevPiece?.innerHTML;

    if (prevPiece) prevPiece.innerHTML = '';
    piece.currentPosition = id;

    isCheck();
    highlightOfCheck();       // NOT SURE
    changeTurn();

}

function captureInTurn(square) {
    const piece = square.piece;

    if (piece == selfHighlight_state) {
        clearPrevSelfHighlight(selfHighlight_state);
        clearHighlightLocal();
        return;
    }

    if (square.captureHighlight) {
        moveElement(selfHighlight_state, piece.currentPosition);
        clearPrevSelfHighlight(selfHighlight_state);
        clearHighlightLocal();
        return;
    }

    return;
}

function whiteKingClicked(square) {

    const piece = square.piece;

    if (piece == selfHighlight_state) {
        clearPrevSelfHighlight(selfHighlight_state);
        clearHighlightLocal();
        return;
    }

    if (square.captureHighlight) {
        moveElement(selfHighlight_state, piece.currentPosition);
        clearPrevSelfHighlight(selfHighlight_state);
        clearHighlightLocal();
        return;
    }

    clearPrevSelfHighlight(selfHighlight_state);
    clearHighlightLocal();

    selfHighlight(piece);
    highlight_state = true;
    selfHighlight_state = piece;

    moveState = piece;

    const curr_pos = piece.currentPosition;

    let highlightSquareIds = kingHighlightIds(curr_pos);

    const { top, bottom, left, right, topleft, bottomleft, topright, bottomright } = highlightSquareIds;

    let result = [];

    if (!piece.move) {

        const rook1 = globalPiece.white_rook_1;
        const rook2 = globalPiece.white_rook_2;

        if (!rook1.move) {
            const b1 = keysquareObject["b1"];
            const c1 = keysquareObject["c1"];
            const d1 = keysquareObject["d1"];

            if (!b1.piece && !c1.piece && !d1.piece) {
                result.push("c1");
            }
        }

        if (!rook2.move) {
            const f1 = keysquareObject["f1"];
            const g1 = keysquareObject["g1"];

            if (!f1.piece && !g1.piece) {
                result.push("g1");
            }
        }
    }

    result.push(checkAvailableSquare(top));
    result.push(checkAvailableSquare(bottom));
    result.push(checkAvailableSquare(left));
    result.push(checkAvailableSquare(right));
    result.push(checkAvailableSquare(topleft));
    result.push(checkAvailableSquare(bottomleft));
    result.push(checkAvailableSquare(topright));
    result.push(checkAvailableSquare(bottomright));

    let temp = [];
    temp.push(top);
    temp.push(bottom);
    temp.push(left);
    temp.push(right);
    temp.push(topleft);
    temp.push(bottomleft);
    temp.push(topright);
    temp.push(bottomright);

    highlightSquareIds = result.flat();

    highlightSquareIds.forEach(highlight => {

        const element = keysquareObject[highlight];
        element.highlight = true;

    });

    for (let i = 0; i < temp.length; i++) {
        const arr = temp[i];

        for (let j = 0; j < arr.length; j++) {
            const element = arr[j];
            const checkpiece = checkAvailableSquareByColor(element);

            if (checkpiece && checkpiece.piece.piece_name.includes("WHITE")) {
                break;
            }

            if (checkOpponentPiece(element, "white")) {
                break;
            }
        }
    }

    globalStateRender();
}

function whiteQueenClicked(square) {

    const piece = square.piece;

    if (piece == selfHighlight_state) {
        clearPrevSelfHighlight(selfHighlight_state);
        clearHighlightLocal();
        return;
    }

    if (square.captureHighlight) {
        moveElement(selfHighlight_state, piece.currentPosition);
        clearPrevSelfHighlight(selfHighlight_state);
        clearHighlightLocal();
        return;
    }

    clearPrevSelfHighlight(selfHighlight_state);
    clearHighlightLocal();

    selfHighlight(piece);
    highlight_state = true;
    selfHighlight_state = piece;

    moveState = piece;

    const curr_pos = piece.currentPosition;

    let highlightSquareIds = queenHighlightIds(curr_pos);

    const { top, bottom, left, right, topleft, bottomleft, topright, bottomright } = highlightSquareIds;

    let result = [];
    result.push(checkAvailableSquare(top));
    result.push(checkAvailableSquare(bottom));
    result.push(checkAvailableSquare(left));
    result.push(checkAvailableSquare(right));
    result.push(checkAvailableSquare(topleft));
    result.push(checkAvailableSquare(bottomleft));
    result.push(checkAvailableSquare(topright));
    result.push(checkAvailableSquare(bottomright));

    let temp = [];
    temp.push(top);
    temp.push(bottom);
    temp.push(left);
    temp.push(right);
    temp.push(topleft);
    temp.push(bottomleft);
    temp.push(topright);
    temp.push(bottomright);

    highlightSquareIds = result.flat();

    highlightSquareIds.forEach(highlight => {

        const element = keysquareObject[highlight];
        element.highlight = true;

    });

    for (let i = 0; i < temp.length; i++) {
        const arr = temp[i];

        for (let j = 0; j < arr.length; j++) {
            const element = arr[j];
            const checkpiece = checkAvailableSquareByColor(element);

            if (checkpiece && checkpiece.piece.piece_name.includes("WHITE")) {
                break;
            }

            if (checkOpponentPiece(element, "white")) {
                break;
            }
        }
    }

    globalStateRender();
}

function whiteBishopClicked(square) {

    const piece = square.piece;

    if (piece == selfHighlight_state) {
        clearPrevSelfHighlight(selfHighlight_state);
        clearHighlightLocal();
        return;
    }

    if (square.captureHighlight) {
        moveElement(selfHighlight_state, piece.currentPosition);
        clearPrevSelfHighlight(selfHighlight_state);
        clearHighlightLocal();
        return;
    }

    clearPrevSelfHighlight(selfHighlight_state);
    clearHighlightLocal();

    selfHighlight(piece);
    highlight_state = true;
    selfHighlight_state = piece;

    moveState = piece;

    const curr_pos = piece.currentPosition;

    let highlightSquareIds = bishopHighlightIds(curr_pos);

    const { topleft, bottomleft, topright, bottomright } = highlightSquareIds;

    let result = [];
    result.push(checkAvailableSquare(topleft));
    result.push(checkAvailableSquare(bottomleft));
    result.push(checkAvailableSquare(topright));
    result.push(checkAvailableSquare(bottomright));

    let temp = [];
    temp.push(topleft);
    temp.push(bottomleft);
    temp.push(topright);
    temp.push(bottomright);

    highlightSquareIds = result.flat();

    highlightSquareIds.forEach(highlight => {

        const element = keysquareObject[highlight];
        element.highlight = true;

    });

    for (let i = 0; i < temp.length; i++) {
        const arr = temp[i];

        for (let j = 0; j < arr.length; j++) {
            const element = arr[j];
            const checkpiece = checkAvailableSquareByColor(element);

            if (checkpiece && checkpiece.piece.piece_name.includes("WHITE")) {
                break;
            }

            if (checkOpponentPiece(element, "white")) {
                break;
            }
        }
    }

    globalStateRender();
}

function whiteKnightClicked(square) {

    const piece = square.piece;

    if (piece == selfHighlight_state) {
        clearPrevSelfHighlight(selfHighlight_state);
        clearHighlightLocal();
        return;
    }

    if (square.captureHighlight) {
        moveElement(selfHighlight_state, piece.currentPosition);
        clearPrevSelfHighlight(selfHighlight_state);
        clearHighlightLocal();
        return;
    }

    clearPrevSelfHighlight(selfHighlight_state);
    clearHighlightLocal();

    selfHighlight(piece);
    highlight_state = true;
    selfHighlight_state = piece;

    moveState = piece;

    const curr_pos = piece.currentPosition;

    let highlightSquareIds = knightHighlightIds(curr_pos);

    highlightSquareIds.forEach(highlight => {

        const element = keysquareObject[highlight];
        element.highlight = true;

    });

    highlightSquareIds.forEach(element => {
        checkOpponentPiece(element, "white")
    });

    globalStateRender();
}

function whiteRookClicked(square) {

    const piece = square.piece;

    if (piece == selfHighlight_state) {
        clearPrevSelfHighlight(selfHighlight_state);
        clearHighlightLocal();
        return;
    }

    if (square.captureHighlight) {
        moveElement(selfHighlight_state, piece.currentPosition);
        clearPrevSelfHighlight(selfHighlight_state);
        clearHighlightLocal();
        return;
    }

    clearPrevSelfHighlight(selfHighlight_state);
    clearHighlightLocal();

    selfHighlight(piece);
    highlight_state = true;
    selfHighlight_state = piece;

    moveState = piece;

    const curr_pos = piece.currentPosition;

    let highlightSquareIds = rookHighlightIds(curr_pos);

    const { top, bottom, left, right } = highlightSquareIds;

    let result = [];
    result.push(checkAvailableSquare(top));
    result.push(checkAvailableSquare(bottom));
    result.push(checkAvailableSquare(left));
    result.push(checkAvailableSquare(right));

    let temp = [];
    temp.push(top);
    temp.push(bottom);
    temp.push(left);
    temp.push(right);

    highlightSquareIds = result.flat();

    highlightSquareIds.forEach(highlight => {

        const element = keysquareObject[highlight];
        element.highlight = true;

    });

    let captureIds = [];

    for (let i = 0; i < temp.length; i++) {
        const arr = temp[i];

        for (let j = 0; j < arr.length; j++) {
            const element = arr[j];
            const checkpiece = checkAvailableSquareByColor(element);

            if (checkpiece && checkpiece.piece.piece_name.includes("WHITE")) {
                break;
            }

            if (checkOpponentPiece(element, "white")) {
                break;
            }
        }
    }

    globalStateRender();
}

function whitePawnClicked(square) {

    const piece = square.piece;

    if (piece == selfHighlight_state) {
        clearPrevSelfHighlight(selfHighlight_state);
        clearHighlightLocal();
        return;
    }

    if (square.captureHighlight) {
        moveElement(selfHighlight_state, piece.currentPosition);
        clearPrevSelfHighlight(selfHighlight_state);
        clearHighlightLocal();
        return;
    }

    clearPrevSelfHighlight(selfHighlight_state);
    clearHighlightLocal();

    selfHighlight(piece);
    highlight_state = true;
    selfHighlight_state = piece;

    moveState = piece;

    const curr_pos = piece.currentPosition;

    let highlightSquareIds = [];

    if (curr_pos[1] == '2') {
        highlightSquareIds = [`${curr_pos[0]}${Number(curr_pos[1]) + 1}`, `${curr_pos[0]}${Number(curr_pos[1]) + 2}`];
    } else {
        highlightSquareIds = [`${curr_pos[0]}${Number(curr_pos[1]) + 1}`];
    }

    highlightSquareIds = checkAvailableSquare(highlightSquareIds);

    highlightSquareIds.forEach(highlight => {

        const element = keysquareObject[highlight];
        element.highlight = true;

    });

    const capture1 = `${String.fromCharCode(curr_pos[0].charCodeAt() - 1)}${Number(curr_pos[1]) + 1}`;
    const capture2 = `${String.fromCharCode(curr_pos[0].charCodeAt() + 1)}${Number(curr_pos[1]) + 1}`;

    let captureIds = [capture1, capture2];

    captureIds.forEach(element => {
        checkOpponentPiece(element, "white")
    });

    globalStateRender();
}

function blackKingClicked(square) {

    const piece = square.piece;

    if (piece == selfHighlight_state) {
        clearPrevSelfHighlight(selfHighlight_state);
        clearHighlightLocal();
        return;
    }

    if (square.captureHighlight) {
        moveElement(selfHighlight_state, piece.currentPosition);
        clearPrevSelfHighlight(selfHighlight_state);
        clearHighlightLocal();
        return;
    }

    clearPrevSelfHighlight(selfHighlight_state);
    clearHighlightLocal();

    selfHighlight(piece);
    highlight_state = true;
    selfHighlight_state = piece;

    moveState = piece;

    const curr_pos = piece.currentPosition;

    let highlightSquareIds = kingHighlightIds(curr_pos);

    const { top, bottom, left, right, topleft, bottomleft, topright, bottomright } = highlightSquareIds;

    let result = [];

    if (!piece.move) {

        const rook1 = globalPiece.black_rook_1;
        const rook2 = globalPiece.black_rook_2;

        if (!rook1.move) {
            const b8 = keysquareObject["b8"];
            const c8 = keysquareObject["c8"];
            const d8 = keysquareObject["d8"];

            if (!b8.piece && !c8.piece && !d8.piece) {
                result.push("c8");
            }
        }

        if (!rook2.move) {
            const f8 = keysquareObject["f8"];
            const g8 = keysquareObject["g8"];

            if (!f8.piece && !g8.piece) {
                result.push("g8");
            }
        }
    }

    result.push(checkAvailableSquare(top));
    result.push(checkAvailableSquare(bottom));
    result.push(checkAvailableSquare(left));
    result.push(checkAvailableSquare(right));
    result.push(checkAvailableSquare(topleft));
    result.push(checkAvailableSquare(bottomleft));
    result.push(checkAvailableSquare(topright));
    result.push(checkAvailableSquare(bottomright));

    let temp = [];
    temp.push(top);
    temp.push(bottom);
    temp.push(left);
    temp.push(right);
    temp.push(topleft);
    temp.push(bottomleft);
    temp.push(topright);
    temp.push(bottomright);

    highlightSquareIds = result.flat();

    highlightSquareIds.forEach(highlight => {

        const element = keysquareObject[highlight];
        element.highlight = true;

    });

    for (let i = 0; i < temp.length; i++) {
        const arr = temp[i];

        for (let j = 0; j < arr.length; j++) {
            const element = arr[j];
            const checkpiece = checkAvailableSquareByColor(element);

            if (checkpiece && checkpiece.piece.piece_name.includes("BLACK")) {
                break;
            }

            if (checkOpponentPiece(element, "black")) {
                break;
            }
        }
    }

    globalStateRender();
}

function blackQueenClicked(square) {

    const piece = square.piece;

    if (piece == selfHighlight_state) {
        clearPrevSelfHighlight(selfHighlight_state);
        clearHighlightLocal();
        return;
    }

    if (square.captureHighlight) {
        moveElement(selfHighlight_state, piece.currentPosition);
        clearPrevSelfHighlight(selfHighlight_state);
        clearHighlightLocal();
        return;
    }

    clearPrevSelfHighlight(selfHighlight_state);
    clearHighlightLocal();

    selfHighlight(piece);
    highlight_state = true;
    selfHighlight_state = piece;

    moveState = piece;

    const curr_pos = piece.currentPosition;

    let highlightSquareIds = queenHighlightIds(curr_pos);

    const { top, bottom, left, right, topleft, bottomleft, topright, bottomright } = highlightSquareIds;

    let result = [];
    result.push(checkAvailableSquare(top));
    result.push(checkAvailableSquare(bottom));
    result.push(checkAvailableSquare(left));
    result.push(checkAvailableSquare(right));
    result.push(checkAvailableSquare(topleft));
    result.push(checkAvailableSquare(bottomleft));
    result.push(checkAvailableSquare(topright));
    result.push(checkAvailableSquare(bottomright));

    let temp = [];
    temp.push(top);
    temp.push(bottom);
    temp.push(left);
    temp.push(right);
    temp.push(topleft);
    temp.push(bottomleft);
    temp.push(topright);
    temp.push(bottomright);

    highlightSquareIds = result.flat();

    highlightSquareIds.forEach(highlight => {

        const element = keysquareObject[highlight];
        element.highlight = true;

    });

    for (let i = 0; i < temp.length; i++) {
        const arr = temp[i];

        for (let j = 0; j < arr.length; j++) {
            const element = arr[j];
            const checkpiece = checkAvailableSquareByColor(element);

            if (checkpiece && checkpiece.piece.piece_name.includes("BLACK")) {
                break;
            }

            if (checkOpponentPiece(element, "black")) {
                break;
            }
        }
    }

    globalStateRender();
}

function blackBishopClicked(square) {

    const piece = square.piece;

    if (piece == selfHighlight_state) {
        clearPrevSelfHighlight(selfHighlight_state);
        clearHighlightLocal();
        return;
    }

    if (square.captureHighlight) {
        moveElement(selfHighlight_state, piece.currentPosition);
        clearPrevSelfHighlight(selfHighlight_state);
        clearHighlightLocal();
        return;
    }

    clearPrevSelfHighlight(selfHighlight_state);
    clearHighlightLocal();

    selfHighlight(piece);
    highlight_state = true;
    selfHighlight_state = piece;

    moveState = piece;

    const curr_pos = piece.currentPosition;
    let highlightSquareIds = bishopHighlightIds(curr_pos);

    const { topleft, bottomleft, topright, bottomright } = highlightSquareIds;

    let result = [];
    result.push(checkAvailableSquare(topleft));
    result.push(checkAvailableSquare(bottomleft));
    result.push(checkAvailableSquare(topright));
    result.push(checkAvailableSquare(bottomright));

    let temp = [];
    temp.push(topleft);
    temp.push(bottomleft);
    temp.push(topright);
    temp.push(bottomright);

    highlightSquareIds = result.flat();

    highlightSquareIds.forEach(highlight => {

        const element = keysquareObject[highlight];
        element.highlight = true;

    });

    for (let i = 0; i < temp.length; i++) {
        const arr = temp[i];

        for (let j = 0; j < arr.length; j++) {
            const element = arr[j];
            const checkpiece = checkAvailableSquareByColor(element);

            if (checkpiece && checkpiece.piece.piece_name.includes("BLACK")) {
                break;
            }

            if (checkOpponentPiece(element, "black")) {
                break;
            }
        }
    }

    globalStateRender();
}

function blackKnightClicked(square) {

    const piece = square.piece;

    if (piece == selfHighlight_state) {
        clearPrevSelfHighlight(selfHighlight_state);
        clearHighlightLocal();
        return;
    }

    if (square.captureHighlight) {
        moveElement(selfHighlight_state, piece.currentPosition);
        clearPrevSelfHighlight(selfHighlight_state);
        clearHighlightLocal();
        return;
    }

    clearPrevSelfHighlight(selfHighlight_state);
    clearHighlightLocal();

    selfHighlight(piece);
    highlight_state = true;
    selfHighlight_state = piece;

    moveState = piece;

    const curr_pos = piece.currentPosition;

    let highlightSquareIds = knightHighlightIds(curr_pos);

    highlightSquareIds.forEach(highlight => {

        const element = keysquareObject[highlight];
        element.highlight = true;

    });

    highlightSquareIds.forEach(element => {
        checkOpponentPiece(element, "black")
    });

    globalStateRender();
}

function blackRookClicked(square) {

    const piece = square.piece;

    if (piece == selfHighlight_state) {
        clearPrevSelfHighlight(selfHighlight_state);
        clearHighlightLocal();
        return;
    }

    if (square.captureHighlight) {
        moveElement(selfHighlight_state, piece.currentPosition);
        clearPrevSelfHighlight(selfHighlight_state);
        clearHighlightLocal();
        return;
    }

    clearPrevSelfHighlight(selfHighlight_state);
    clearHighlightLocal();

    selfHighlight(piece);
    highlight_state = true;
    selfHighlight_state = piece;

    moveState = piece;

    const curr_pos = piece.currentPosition;

    let highlightSquareIds = rookHighlightIds(curr_pos);

    const { top, bottom, left, right } = highlightSquareIds;

    let result = [];
    result.push(checkAvailableSquare(top));
    result.push(checkAvailableSquare(bottom));
    result.push(checkAvailableSquare(left));
    result.push(checkAvailableSquare(right));

    let temp = [];
    temp.push(top);
    temp.push(bottom);
    temp.push(left);
    temp.push(right);

    highlightSquareIds = result.flat();

    highlightSquareIds.forEach(highlight => {

        const element = keysquareObject[highlight];
        element.highlight = true;

    });


    for (let i = 0; i < temp.length; i++) {
        const arr = temp[i];

        for (let j = 0; j < arr.length; j++) {
            const element = arr[j];
            const checkpiece = checkAvailableSquareByColor(element);

            if (checkpiece && checkpiece.piece.piece_name.includes("BLACK")) {
                break;
            }

            if (checkOpponentPiece(element, "black")) {
                break;
            }
        }
    }

    globalStateRender();
}

function blackPawnClicked(square) {

    const piece = square.piece;

    if (piece == selfHighlight_state) {
        clearPrevSelfHighlight(selfHighlight_state);
        clearHighlightLocal();
        return;
    }

    if (square.captureHighlight) {
        moveElement(selfHighlight_state, piece.currentPosition);
        clearPrevSelfHighlight(selfHighlight_state);
        clearHighlightLocal();
        return;
    }

    clearPrevSelfHighlight(selfHighlight_state);
    clearHighlightLocal();

    selfHighlight(piece);
    highlight_state = true;
    selfHighlight_state = piece;

    moveState = piece;

    const curr_pos = piece.currentPosition;

    let highlightSquareIds = [];

    if (curr_pos[1] == '7') {
        highlightSquareIds = [`${curr_pos[0]}${Number(curr_pos[1]) - 1}`, `${curr_pos[0]}${Number(curr_pos[1]) - 2}`];
    } else {
        highlightSquareIds = [`${curr_pos[0]}${Number(curr_pos[1]) - 1}`];
    }

    highlightSquareIds = checkAvailableSquare(highlightSquareIds);

    highlightSquareIds.forEach(highlight => {

        const element = keysquareObject[highlight];
        element.highlight = true;

    });

    const capture1 = `${String.fromCharCode(curr_pos[0].charCodeAt() - 1)}${Number(curr_pos[1]) - 1}`;
    const capture2 = `${String.fromCharCode(curr_pos[0].charCodeAt() + 1)}${Number(curr_pos[1]) - 1}`;

    let captureIds = [capture1, capture2];

    captureIds.forEach(element => {
        checkOpponentPiece(element, "black")
    });

    globalStateRender();
}

function Globalevent() {
    ROOT_DIV.addEventListener("click", (event) => {
        if (event.target.localName === "img") {
            const clickedSquareId = event.target.parentNode.id;
            const clickedSquareState = keysquareObject[clickedSquareId];

            if ((clickedSquareState?.piece.piece_name.includes("WHITE") && turn == "black") || (clickedSquareState?.piece.piece_name.includes("BLACK") && turn == "white")) {
                captureInTurn(clickedSquareState);
                return;
            }

            if (clickedSquareState?.piece.piece_name == "WHITE_PAWN") {
                if (turn == "white")
                    whitePawnClicked(clickedSquareState);
            } else if (clickedSquareState?.piece.piece_name == "BLACK_PAWN") {
                if (turn == "black")
                    blackPawnClicked(clickedSquareState);
            } else if (clickedSquareState?.piece.piece_name == "WHITE_BISHOP") {
                if (turn == "white")
                    whiteBishopClicked(clickedSquareState);
            } else if (clickedSquareState?.piece.piece_name == "BLACK_BISHOP") {
                if (turn == "black")
                    blackBishopClicked(clickedSquareState);
            } else if (clickedSquareState?.piece.piece_name == "WHITE_ROOK") {
                if (turn == "white")
                    whiteRookClicked(clickedSquareState);
            } else if (clickedSquareState?.piece.piece_name == "BLACK_ROOK") {
                if (turn == "black")
                    blackRookClicked(clickedSquareState);
            } else if (clickedSquareState?.piece.piece_name == "WHITE_KNIGHT") {
                if (turn == "white")
                    whiteKnightClicked(clickedSquareState);
            } else if (clickedSquareState?.piece.piece_name == "BLACK_KNIGHT") {
                if (turn == "black")
                    blackKnightClicked(clickedSquareState);
            } else if (clickedSquareState?.piece.piece_name == "WHITE_QUEEN") {
                if (turn == "white")
                    whiteQueenClicked(clickedSquareState);
            } else if (clickedSquareState?.piece.piece_name == "BLACK_QUEEN") {
                if (turn == "black")
                    blackQueenClicked(clickedSquareState);
            } else if (clickedSquareState?.piece.piece_name == "WHITE_KING") {
                if (turn == "white")
                    whiteKingClicked(clickedSquareState);
            } else if (clickedSquareState?.piece.piece_name == "BLACK_KING") {
                if (turn == "black")
                    blackKingClicked(clickedSquareState);
            }

        }
        else {
            const childElementsofClickedEl = Array.from(event.target.childNodes);

            if (childElementsofClickedEl.length == 1 || event.target.localName == "span") {
                if (event.target.localName == "span") {
                    clearPrevSelfHighlight(selfHighlight_state);
                    selfHighlight_state = null;
                    const id = event.target.parentNode.id;
                    moveElement(moveState, id);
                    moveState = null;
                }
                else {
                    clearPrevSelfHighlight(selfHighlight_state);
                    selfHighlight_state = null;
                    const id = event.target.id;
                    moveElement(moveState, id);
                    moveState = null;
                }
            }
            else {
                clearHighlightLocal();
                clearPrevSelfHighlight(selfHighlight_state);
            }
        }
    })
}

export { Globalevent, movePiecefromXtoY };