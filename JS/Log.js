const moveList = document.querySelector("ol");

function logMoves(logMoves, turn) {

    if (turn === 'white') {
        const whitemove = document.createElement("li");
        whitemove.innerHTML = `<span class="leftside">${logMoves.to}</span>`;
        moveList.appendChild(whitemove);
    } else {
        const MoveArray = moveList.querySelectorAll("li");
        const blackmove = MoveArray[MoveArray.length - 1];
        blackmove.innerHTML += `<span class="rightside">${logMoves.to}</span>`;
    }

}

export default logMoves;