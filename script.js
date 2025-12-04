const secondaryOutput = document.getElementById("secondary");
const mainOutput = document.getElementById("main");
const toggleSignButton = document.getElementById("toggleSignButton");
const equalButton = document.getElementById("equalButton");
const deleteAllButton = document.getElementById("deleteAllButton");
const backspaceButton = document.getElementById("backspaceButton");

const inputsWrapper = document.querySelector(".inputs-wrapper");
const numberButtons = document.querySelectorAll(".number-button");
const operatorButtons = document.querySelectorAll(".operator-button");

let currentValue = "";
let previousValue = "";
let result = 0;
let operator = "";

render();

function render () {
    mainOutput.textContent = currentValue;
    secondaryOutput.textContent = `${previousValue} ${operator}`;
}

function toggleSign () {
    if (currentValue.replaceAll(".", "") == "") return;
    currentValue = (currentValue * -1).toString();
    render();
};

toggleSignButton.addEventListener("click", toggleSign);

function addValue (value) {
    if (value == "." && currentValue.includes(".")) return;
    if (value == "0" && currentValue == "0") return;
    if (currentValue.replaceAll(".", "").length >= 16) return;

    currentValue += value;
    render();
};

inputsWrapper.addEventListener("pointerdown", (e) => {
    if (e.target.classList.contains("number-button")) {
        addValue(e.target.dataset.value);
    } else if (e.target.classList.contains("operator-button")) {
        setOperator(e.target.dataset.operator)
    }
});

function setOperator (value) {
    // added replaceAll(".", "") so it checkes if the user wantes to make an operation on a single dot, which is an invalid operation
    if (currentValue.replaceAll(".", "") !== "" && previousValue == "") {
        operator = value;
        previousValue = currentValue;
        currentValue = "";
        render();
    } else if (previousValue !== "") {
        operator = value;
        render();
    };
};

function operation(first, second, operator) {
    switch (operator) {
        case "+":
            return (+first + +second).toString();
            break;
        case "-":
            return (+first - +second).toString();
            break;
        case "×":
            return (+first * +second).toString();
            break;
        case "÷":
            return (+first / +second).toString();
            break;
    };
};

equalButton.addEventListener("click", calculate);

function calculate () {
    if(currentValue !== "" && previousValue !== "" && operator !== ""){
        result = operation(previousValue, currentValue, operator);
        currentValue = result;
        previousValue = "";
        operator = "";
        render();
    };
};

function deleteAll () {
    currentValue = "";
    previousValue = "";
    result = "";
    operator = "";
    render();
};

deleteAllButton.addEventListener("click", deleteAll);

function backspace () {
    currentValue = currentValue.slice(0, -1);
    render();
};

backspaceButton.addEventListener("click", backspace);