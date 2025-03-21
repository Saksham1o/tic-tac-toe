let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let newbtn = document.querySelector("#new-btn");
let turnO = true;
let turnCount = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (!box.classList.contains("clicked") && !box.classList.contains("disabled")) {
            console.log("Button clicked");
            if (turnO) {
                box.innerText = "O";
                turnO = false;
            } else {
                box.innerText = "X";
                turnO = true;
            }
            box.classList.add("clicked");
            turnCount++;
            checkWinner();
        }
    });
});


const showWinner = (winner) => {
        msg.innerText = `Congratulations, Winner is ${winner}`;
        msgContainer.classList.remove("hide");
        disableAllBoxes();
}

const checkWinner = () => {
    for(let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("Winner", pos1Val);
                showWinner(pos1Val);
            } else if (turnCount == 9) {
                msg.innerText = "It's a draw!";
                msgContainer.classList.remove("hide");
            }
        }  
    }
};

const disableAllBoxes = () => {
    boxes.forEach((box) => {
        box.classList.add("disabled");
    });
}

const enableAllBoxes = () => {
    for(let box of boxes) {
        box.classList.remove("disabled");
        box.classList.remove("clicked");
        box.innerText = "";
    }
}

const resetGame = () => {
    turnO = true;
    enableAllBoxes();
    msgContainer.classList.add("hide");
    turnCount = 0;
}

reset.addEventListener("click", resetGame);
newbtn.addEventListener("click", resetGame);