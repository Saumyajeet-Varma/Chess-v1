import { initGame } from "./JS/data.js";
import { initGameRender } from "./JS/render.js";
import { Globalevent } from "./JS/event.js";

const globalState = initGame()
let keysquareObject = {};

globalState.flat().forEach((square) => {
    keysquareObject[square.id] = square;
});

initGameRender(globalState);
Globalevent();

String.prototype.replaceAt = function (index, replacement) {
    return (
        this.substring(0, index) + replacement + this.substring(index + replacement.length)
    );
}

export { globalState, keysquareObject };