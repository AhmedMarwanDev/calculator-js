const secondaryOutput = document.getElementById("secondary");
const mainOutput = document.getElementById("main");
const toggleSignButton = document.getElementById("toggleSignButton");
const equalButton = document.getElementById("equalButton");
const deleteAllButton = document.getElementById("deleteAllButton");
const backspaceButton = document.getElementById("backspaceButton");
const inputsWrapper = document.querySelector(".inputs-wrapper");

let currentValue = "";
let previousValue = "";
let result = 0;
let operator = "";
const maxSafeResult = 999_999_999_999_999_999;
let overflow = false;

function addValue (value) {
    if (overflow) {
        currentValue = "";
        overflow = false;
    }
    if (value == "." && currentValue.includes(".")) return;
    if (value == "0" && currentValue == "0") return;
    if (currentValue.replaceAll(".", "").length >= 9) return;

    currentValue += value;
    render();
};

function setOperator (value) {
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

function toggleSign () {
    if (currentValue.replaceAll(".", "") == "") return;
    currentValue = (-currentValue).toString();
    render();
};

function operation(first, second, operator) {
    switch (operator) {
        case "+":
            return (+first + +second);
            break;
        case "-":
            return (+first - +second);
            break;
        case "×":
            return (+first * +second);
            break;
        case "÷":
            return (+first / +second);
            break;
    };
}; 

function renderOverflow() {
    mainOutput.textContent = "Too large";
    secondaryOutput.textContent = "";
}

function calculate () {
    if (currentValue == "" || previousValue == "" || operator == "") return;
    if (parseFloat(currentValue) == 0 && operator == "÷") return;

    result = operation(previousValue, currentValue, operator);
    result = !Number.isInteger(result) ? Math.round(result * 1e+10) / 1e+10 : result;
    
    if (Math.abs(result) > maxSafeResult) {
        overflow = true;
        currentValue = "";
        previousValue = "";
        operator = "";
        renderOverflow();
        return;
    }

    currentValue = result.toString();
    previousValue = "";
    operator = "";
    render();
};

function deleteAll () {
    currentValue = "";
    previousValue = "";
    result = 0;
    operator = "";
    render();
};

function backspace () {
    if (overflow) return;

    currentValue = currentValue.slice(0, -1);
    render();
};

function render () {
    const formatedCurrentValue = currentValue == "" ? "" : (+currentValue).toLocaleString("en-US");
    const formatedPreviousValue = previousValue == "" ? "" : (+previousValue).toLocaleString("en-US");
    mainOutput.textContent = formatedCurrentValue;
    secondaryOutput.textContent = `${formatedPreviousValue} ${operator}`;
};

render();

inputsWrapper.addEventListener("pointerdown", (e) => {
    if (e.target.classList.contains("number-button")) {
        addValue(e.target.dataset.value);
    } else if (e.target.classList.contains("operator-button")) {
        setOperator(e.target.dataset.operator)
    }
});
toggleSignButton.addEventListener("pointerdown", toggleSign);
equalButton.addEventListener("pointerdown", calculate);
deleteAllButton.addEventListener("pointerdown", deleteAll);
backspaceButton.addEventListener("pointerdown", backspace);

document.addEventListener("keydown", (e) => {
    const key = e.key;

    if(/^[0-9.,]$/.test(key)){
        e.preventDefault();
        const value = key == "," ? "." : key;
        addValue(value);
        return;
    };
    
    const operatorMap = {
        "+": "+",
        "-": "-",
        "*": "×",
        "×": "×",
        "x": "×",
        "X": "×",
        "÷": "÷",
        "/": "÷",
        "\\": "÷",
    };

    if (operatorMap[key]) {
        e.preventDefault();
        setOperator(operatorMap[key]);
        return;
    };

    const actionKeys = {
        "Backspace": "backspace",
        "c": "deleteAll",
        "C": "deleteAll",
        "Delete": "deleteAll",
        "Escape": "deleteAll",
        "Enter": "calculate",
        "=": "calculate",
    };

    if (actionKeys[key]) {
        e.preventDefault();
        switch (actionKeys[key]){
            case "backspace":
                backspace();
                break;
            case "deleteAll":
                deleteAll();
                break;
            case "calculate":
                calculate();
                break;
        };
        return;
    };
});