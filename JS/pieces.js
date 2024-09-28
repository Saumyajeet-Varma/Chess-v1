function whiteKing(currentPosition) {
    return {
        currentPosition,
        piece_name: "WHITE_KING",
        img: "Assets/images/pieces/white/king.png",
        move: false
    }
}

function whiteQueen(currentPosition) {
    return {
        currentPosition,
        piece_name: "WHITE_QUEEN",
        img: "Assets/images/pieces/white/queen.png"
    }
}

function whiteBishop(currentPosition) {
    return {
        currentPosition,
        piece_name: "WHITE_BISHOP",
        img: "Assets/images/pieces/white/bishop.png"
    }
}

function whiteKnight(currentPosition) {
    return {
        currentPosition,
        piece_name: "WHITE_KNIGHT",
        img: "Assets/images/pieces/white/knight.png"
    }
}

function whiteRook(currentPosition) {
    return {
        currentPosition,
        piece_name: "WHITE_ROOK",
        img: "Assets/images/pieces/white/rook.png",
        move: false
    }
}

function whitePawn(currentPosition) {
    return {
        currentPosition,
        piece_name: "WHITE_PAWN",
        img: "Assets/images/pieces/white/pawn.png"
    }
}

function blackKing(currentPosition) {
    return {
        currentPosition,
        piece_name: "BLACK_KING",
        img: "Assets/images/pieces/black/king.png",
        move: false
    }
}

function blackQueen(currentPosition) {
    return {
        currentPosition,
        piece_name: "BLACK_QUEEN",
        img: "Assets/images/pieces/black/queen.png"
    }
}

function blackBishop(currentPosition) {
    return {
        currentPosition,
        piece_name: "BLACK_BISHOP",
        img: "Assets/images/pieces/black/bishop.png"
    }
}

function blackKnight(currentPosition) {
    return {
        currentPosition,
        piece_name: "BLACK_KNIGHT",
        img: "Assets/images/pieces/black/knight.png"
    }
}

function blackRook(currentPosition) {
    return {
        currentPosition,
        piece_name: "BLACK_ROOK",
        img: "Assets/images/pieces/black/rook.png",
        move: false
    }
}

function blackPawn(currentPosition) {
    return {
        currentPosition,
        piece_name: "BLACK_PAWN",
        img: "Assets/images/pieces/black/pawn.png"
    }
}

export { whiteKing, whiteQueen, whiteBishop, whiteKnight, whiteRook, whitePawn, blackKing, blackQueen, blackBishop, blackKnight, blackRook, blackPawn };