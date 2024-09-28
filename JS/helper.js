import { keysquareObject } from "../script.js";

function checkOpponentPiece(id, color) {

    const element = keysquareObject[id];
    const opponentColor = color === "white" ? "BLACK" : "WHITE";

    if (!element) return false;

    if (element.piece && element.piece.piece_name.includes(opponentColor)) {
        const el = document.getElementById(id);
        el.classList.add("capturecolor");
        element.captureHighlight = true;
        return true;
    }

    return false;
}

function NoDOM_checkOpponentPiece(id, color) {

    const element = keysquareObject[id];
    const opponentColor = color === "white" ? "BLACK" : "WHITE";

    if (!element) return false;

    if (element.piece && element.piece.piece_name.includes(opponentColor)) {
        return true;
    }

    return false;
}

function checkAvailableSquareByColor(squareId) {
    const square = keysquareObject[squareId];

    if (square.piece) {
        return square;
    } else {
        return false;
    }
}

function checkAvailableSquare(array) {

    let returnArr = [];

    for (let i = 0; i < array.length; i++) {

        const squareId = array[i];
        const square = keysquareObject[squareId];

        if (square.piece) {
            break;
        }

        returnArr.push(squareId);
    }

    return returnArr;
}

function kingAvailableSquare(id, color) {

    let highlightSquareIds = kingHighlightIds(id);
    const { top, bottom, left, right, topleft, bottomleft, topright, bottomright } = highlightSquareIds;

    let returnArr = [];
    returnArr.push(checkAvailableSquare(top));
    returnArr.push(checkAvailableSquare(bottom));
    returnArr.push(checkAvailableSquare(left));
    returnArr.push(checkAvailableSquare(right));
    returnArr.push(checkAvailableSquare(topleft));
    returnArr.push(checkAvailableSquare(bottomleft));
    returnArr.push(checkAvailableSquare(topright));
    returnArr.push(checkAvailableSquare(bottomright));

    returnArr = returnArr.flat();

    returnArr.forEach(element => {
        if (element.piece && element.piece.piece_name.includes(color)) {
            returnArr.remove(element);
        }
    });

    return returnArr;
}

function kingHighlightIds(id) {

    const rookTypeMoves = rookHighlightIds(id);
    const bishopTypeMoves = bishopHighlightIds(id);

    const returnObj = {
        top: rookTypeMoves.top,
        bottom: rookTypeMoves.bottom,
        left: rookTypeMoves.left,
        right: rookTypeMoves.right,
        topleft: bishopTypeMoves.topleft,
        bottomleft: bishopTypeMoves.bottomleft,
        topright: bishopTypeMoves.topright,
        bottomright: bishopTypeMoves.bottomright
    };

    for (const key in returnObj) {
        if (Object.hasOwnProperty.call(returnObj, key)) {
            const element = returnObj[key];

            if (element.length != 0) {
                returnObj[key] = new Array(element[0]);
            }
        }
    }

    return returnObj;
}

function kingCaptureIds(id, color) {

    if (!id) {
        return [];
    }

    let returnArr = kingHighlightIds(id);
    returnArr = Object.values(returnArr).flat();

    returnArr = returnArr.filter((element) => {
        if (NoDOM_checkOpponentPiece(element, color)) {
            return true;
        }
    });

    return returnArr;
}

function queenHighlightIds(id) {

    const rookTypeMoves = rookHighlightIds(id);
    const bishopTypeMoves = bishopHighlightIds(id);

    return {
        top: rookTypeMoves.top,
        bottom: rookTypeMoves.bottom,
        left: rookTypeMoves.left,
        right: rookTypeMoves.right,
        topleft: bishopTypeMoves.topleft,
        bottomleft: bishopTypeMoves.bottomleft,
        topright: bishopTypeMoves.topright,
        bottomright: bishopTypeMoves.bottomright
    };
}

function queenCaptureIds(id, color) {

    if (!id) {
        return [];
    }

    let highlightSquareIds = queenHighlightIds(id);
    let temp = [];
    let returnArr = [];

    const { top, bottom, left, right, topleft, bottomleft, topright, bottomright } = highlightSquareIds;

    temp.push(top);
    temp.push(bottom);
    temp.push(left);
    temp.push(right);
    temp.push(topleft);
    temp.push(bottomleft);
    temp.push(topright);
    temp.push(bottomright);

    for (let i = 0; i < temp.length; i++) {
        const arr = temp[i];

        for (let j = 0; j < arr.length; j++) {
            const element = arr[j];
            const checkpiece = checkAvailableSquareByColor(element);

            if (checkpiece && checkpiece.piece.piece_name.toLowerCase().includes(color)) {
                break;
            }

            if (NoDOM_checkOpponentPiece(element, color)) {
                returnArr.push(element);
                break;
            }
        }
    }

    return returnArr;
}

function bishopHighlightIds(id) {

    function topleft() {
        let alpha = id[0];
        let num = Number(id[1]);
        let returnArr = [];

        while (alpha != 'a' && num != 8) {
            num = num + 1;
            alpha = String.fromCharCode(alpha.charCodeAt() - 1);
            returnArr.push(`${alpha}${num}`)
        }

        return returnArr;
    }

    function bottomleft() {
        let alpha = id[0];
        let num = Number(id[1]);
        let returnArr = [];

        while (alpha != 'a' && num != 1) {
            num = num - 1;
            alpha = String.fromCharCode(alpha.charCodeAt() - 1);
            returnArr.push(`${alpha}${num}`)
        }

        return returnArr;
    }

    function topright() {
        let alpha = id[0];
        let num = Number(id[1]);
        let returnArr = [];

        while (alpha != 'h' && num != 8) {
            num = num + 1;
            alpha = String.fromCharCode(alpha.charCodeAt() + 1);
            returnArr.push(`${alpha}${num}`)
        }

        return returnArr;
    }

    function bottomright() {
        let alpha = id[0];
        let num = Number(id[1]);
        let returnArr = [];

        while (alpha != 'h' && num != 1) {
            num = num - 1;
            alpha = String.fromCharCode(alpha.charCodeAt() + 1);
            returnArr.push(`${alpha}${num}`)
        }

        return returnArr;
    }

    return {
        topleft: topleft(),
        bottomleft: bottomleft(),
        topright: topright(),
        bottomright: bottomright()
    };
}

function bishopCaptureIds(id, color) {

    if (!id) {
        return [];
    }

    let highlightSquareIds = bishopHighlightIds(id);
    let temp = [];
    let returnArr = [];

    const { topleft, bottomleft, topright, bottomright } = highlightSquareIds;

    temp.push(topleft);
    temp.push(bottomleft);
    temp.push(topright);
    temp.push(bottomright);

    for (let i = 0; i < temp.length; i++) {
        const arr = temp[i];

        for (let j = 0; j < arr.length; j++) {
            const element = arr[j];
            const checkpiece = checkAvailableSquareByColor(element);

            if (checkpiece && checkpiece.piece.piece_name.toLowerCase().includes(color)) {
                break;
            }

            if (NoDOM_checkOpponentPiece(element, color)) {
                returnArr.push(element);
                break;
            }
        }
    }

    return returnArr;
}

function knightHighlightIds(id) {

    function top() {
        let alpha = id[0];
        let num = Number(id[1]);
        let tempArr = [];
        let returnArr = [];

        let temp = 0;
        while (num != 8) {

            if (temp == 2) {
                break;
            }

            num = num + 1;
            tempArr.push(`${alpha}${num}`)
            temp = temp + 1;
        }

        if (tempArr.length == 2) {
            const lastelement = tempArr[tempArr.length - 1];
            let lastelementAlpha = lastelement[0];
            let lastelementNum = Number(lastelement[1]);

            if (lastelementAlpha < 'h') {
                returnArr.push(`${String.fromCharCode(lastelementAlpha.charCodeAt(0) + 1)}${lastelementNum}`)
            }
            if (lastelementAlpha > 'a') {
                returnArr.push(`${String.fromCharCode(lastelementAlpha.charCodeAt(0) - 1)}${lastelementNum}`)
            }

            return returnArr;

        } else {
            return [];
        }
    }

    function bottom() {
        let alpha = id[0];
        let num = Number(id[1]);
        let tempArr = [];
        let returnArr = [];

        let temp = 0;
        while (num != 1) {

            if (temp == 2) {
                break;
            }

            num = num - 1;
            tempArr.push(`${alpha}${num}`)
            temp = temp + 1;
        }

        if (tempArr.length == 2) {
            const lastelement = tempArr[tempArr.length - 1];
            let lastelementAlpha = lastelement[0];
            let lastelementNum = Number(lastelement[1]);

            if (lastelementAlpha < 'h') {
                returnArr.push(`${String.fromCharCode(lastelementAlpha.charCodeAt(0) + 1)}${lastelementNum}`)
            }
            if (lastelementAlpha > 'a') {
                returnArr.push(`${String.fromCharCode(lastelementAlpha.charCodeAt(0) - 1)}${lastelementNum}`)
            }

            return returnArr;

        } else {
            return [];
        }
    }

    function left() {
        let alpha = id[0];
        let num = Number(id[1]);
        let tempArr = [];
        let returnArr = [];

        let temp = 0;
        while (alpha != 'a') {

            if (temp == 2) {
                break;
            }

            alpha = String.fromCharCode(alpha.charCodeAt(0) - 1);
            tempArr.push(`${alpha}${num}`)
            temp = temp + 1;
        }

        if (tempArr.length == 2) {
            const lastelement = tempArr[tempArr.length - 1];
            let lastelementAlpha = lastelement[0];
            let lastelementNum = Number(lastelement[1]);

            if (lastelementNum < 8) {
                returnArr.push(`${lastelementAlpha}${lastelementNum + 1}`)
            }
            if (lastelementNum > 1) {
                returnArr.push(`${lastelementAlpha}${lastelementNum - 1}`)
            }

            return returnArr;

        } else {
            return [];
        }
    }

    function right() {
        let alpha = id[0];
        let num = Number(id[1]);
        let tempArr = [];
        let returnArr = [];

        let temp = 0;
        while (alpha != 'h') {

            if (temp == 2) {
                break;
            }

            alpha = String.fromCharCode(alpha.charCodeAt(0) + 1);
            tempArr.push(`${alpha}${num}`)
            temp = temp + 1;
        }

        if (tempArr.length == 2) {
            const lastelement = tempArr[tempArr.length - 1];
            let lastelementAlpha = lastelement[0];
            let lastelementNum = Number(lastelement[1]);

            if (lastelementNum < 8) {
                returnArr.push(`${lastelementAlpha}${lastelementNum + 1}`)
            }
            if (lastelementNum > 1) {
                returnArr.push(`${lastelementAlpha}${lastelementNum - 1}`)
            }

            return returnArr;

        } else {
            return [];
        }
    }

    return [...top(), ...bottom(), ...left(), ...right()];
}

function knightCaptureIds(id, color) {

    if (!id) {
        return [];
    }

    let returnArr = knightHighlightIds(id);

    returnArr = returnArr.filter((element) => {
        if (NoDOM_checkOpponentPiece(element, color)) {
            return true;
        }
    });

    return returnArr;
}

function rookHighlightIds(id) {

    function top(id) {
        let alpha = id[0];
        let num = Number(id[1]);
        let returnArr = [];

        while (num != 8) {
            num = num + 1;
            returnArr.push(`${alpha}${num}`)
        }

        return returnArr;
    }


    function bottom(id) {
        let alpha = id[0];
        let num = Number(id[1]);
        let returnArr = [];

        while (num != 1) {
            num = num - 1;
            returnArr.push(`${alpha}${num}`)
        }

        return returnArr;
    }

    function left(id) {
        let alpha = id[0];
        let num = Number(id[1]);
        let returnArr = [];

        while (alpha != 'a') {
            alpha = String.fromCharCode(alpha.charCodeAt() - 1);
            returnArr.push(`${alpha}${num}`)
        }

        return returnArr;
    }

    function right(id) {
        let alpha = id[0];
        let num = Number(id[1]);
        let returnArr = [];

        while (alpha != 'h') {
            alpha = String.fromCharCode(alpha.charCodeAt() + 1);
            returnArr.push(`${alpha}${num}`)
        }

        return returnArr;
    }

    return {
        top: top(id),
        bottom: bottom(id),
        left: left(id),
        right: right(id)
    };
}

function rookCaptureIds(id, color) {

    if (!id) {
        return [];
    }

    let highlightSquareIds = rookHighlightIds(id);
    let temp = [];
    let returnArr = [];

    const { top, bottom, left, right } = highlightSquareIds;

    temp.push(top);
    temp.push(bottom);
    temp.push(left);
    temp.push(right);

    for (let i = 0; i < temp.length; i++) {
        const arr = temp[i];

        for (let j = 0; j < arr.length; j++) {
            const element = arr[j];
            const checkpiece = checkAvailableSquareByColor(element);

            if (checkpiece && checkpiece.piece.piece_name.toLowerCase().includes(color)) {
                break;
            }

            if (NoDOM_checkOpponentPiece(element, color)) {
                returnArr.push(element);
                break;
            }
        }
    }

    return returnArr;
}

function pawnCaptureIds(id, color) {

    if (!id) {
        return [];
    }

    let returnArr = [];
    let alpha = id[0];
    let num = id[1];

    if (color == "white") {
        if (num < 8) {
            if (alpha == 'a') {
                const capture1 = `${String.fromCharCode(alpha.charCodeAt() + 1)}${Number(num) + 1}`;
                returnArr.push(capture1);
            } else if (alpha == 'h') {
                const capture1 = `${String.fromCharCode(alpha.charCodeAt() - 1)}${Number(num) + 1}`;
                returnArr.push(capture1);
            } else {
                const capture1 = `${String.fromCharCode(alpha.charCodeAt() + 1)}${Number(num) + 1}`;
                const capture2 = `${String.fromCharCode(alpha.charCodeAt() - 1)}${Number(num) + 1}`;
                returnArr.push(capture1);
                returnArr.push(capture2);
            }
        }
    } else {
        if (num > 1) {
            if (alpha == 'a') {
                const capture1 = `${String.fromCharCode(alpha.charCodeAt() + 1)}${Number(num) - 1}`;
                returnArr.push(capture1);
            } else if (alpha == 'h') {
                const capture1 = `${String.fromCharCode(alpha.charCodeAt() - 1)}${Number(num) - 1}`;
                returnArr.push(capture1);
            } else {
                const capture1 = `${String.fromCharCode(alpha.charCodeAt() + 1)}${Number(num) - 1}`;
                const capture2 = `${String.fromCharCode(alpha.charCodeAt() - 1)}${Number(num) - 1}`;
                returnArr.push(capture1);
                returnArr.push(capture2);
            }
        }
    }

    return returnArr;
}

function isSubset(arr1, arr2) {
    let res = arr2.every(function (val) {
        return arr1.indexOf(val) >= 0;
    });

    return res;
}

export { checkOpponentPiece, checkAvailableSquareByColor, checkAvailableSquare, kingAvailableSquare, kingHighlightIds, kingCaptureIds, queenHighlightIds, queenCaptureIds, bishopHighlightIds, bishopCaptureIds, knightHighlightIds, knightCaptureIds, rookHighlightIds, rookCaptureIds, pawnCaptureIds, isSubset };