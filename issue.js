let issuebtn = document.querySelector(".issue");
let issuemsg = document.querySelector(".issuemsg");

let active = false;

issuebtn.addEventListener("click", () => {
    if (active) {
        issuemsg.classList.replace("show", "hide");
        issuebtn.innerHTML = '<i class="fa-solid fa-circle-exclamation ired"></i>';
        active = false;
    } else {
        issuemsg.classList.replace("hide", "show");
        issuebtn.innerHTML = '<i class="fa-solid fa-circle-xmark iwhite"></i>';
        active = true;
    }
});