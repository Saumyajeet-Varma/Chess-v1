import { whiteQueen, whiteBishop, whiteKnight, whiteRook, blackQueen, blackBishop, blackKnight, blackRook } from "./pieces.js";
import { globalPiece } from "./render.js";
// globalPiece Update...

class ModalCreator {
    constructor(body) {
        if (!body) {
            throw new Error("pass the body");
        }

        this.open = false;
        this.body = body;
    }

    show() {
        this.open = true;
        document.getElementById("root").appendChild(this.body);
    }

    hide() {
        this.open = false;
        document.getElementById("root").removeChild(this.body);
    }
}

function pawnPromotion(color, callback, id) {

    const queen = document.createElement("img");
    queen.onclick = queenCallback;
    queen.src = `Assets/images/pieces/${color}/queen.png`

    const bishop = document.createElement("img");
    bishop.onclick = bishopCallback;
    bishop.src = `Assets/images/pieces/${color}/bishop.png`

    const knight = document.createElement("img");
    knight.onclick = knightCallback;
    knight.src = `Assets/images/pieces/${color}/knight.png`

    const rook = document.createElement("img");
    rook.onclick = rookCallback;
    rook.src = `Assets/images/pieces/${color}/rook.png`

    const imageContainer = document.createElement("div");
    imageContainer.appendChild(queen);
    imageContainer.appendChild(bishop);
    imageContainer.appendChild(knight);
    imageContainer.appendChild(rook);

    const msg = document.createElement("p");
    msg.textContent = "Your pawn has been promoted";

    const finalContainer = document.createElement("div");
    finalContainer.appendChild(msg);
    finalContainer.appendChild(imageContainer);
    finalContainer.classList.add("modal");

    const modal = new ModalCreator(finalContainer);
    modal.show();

    function queenCallback() {
        if (color == "white") {
            callback(whiteQueen, id);
        } else {
            callback(blackQueen, id);
        }
        modal.hide();
    };

    function bishopCallback() {
        if (color == "white") {
            callback(whiteBishop, id);
        } else {
            callback(blackBishop, id);
        }
        modal.hide();
    };

    function knightCallback() {
        if (color == "white") {
            callback(whiteKnight, id);
        } else {
            callback(blackKnight, id);
        }
        modal.hide();
    };

    function rookCallback() {
        if (color == "white") {
            callback(whiteRook, id);
        } else {
            callback(blackRook, id);
        }
        modal.hide();
    };
}

export default pawnPromotion;