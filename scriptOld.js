const topOutput = document.querySelector(".top");
const bottomOutput = document.querySelector(".bottom");
const equalButton = document.getElementById("equalButton");

let result = "";
let operator = "";

let wholeOperation = {
    firstValue: "0",
    secondValue: "0",
    operation: "",
    result: "",
};

bottomOutput.innerHTML = wholeOperation.firstValue;

function addValue (value) {
    if (wholeOperation.operation == "") {
        if (wholeOperation.firstValue.length < 16) {
            wholeOperation.firstValue += value;
            bottomOutput.innerHTML = `${wholeOperation.firstValue}`;
        };
    } else {
        if (wholeOperation.secondValue.length < 16) {
            wholeOperation.secondValue += value;
            bottomOutput.innerHTML = `${wholeOperation.firstValue} ${wholeOperation.operation} ${wholeOperation.secondValue}`;
        };
    };
    
    console.log(wholeOperation);
};

function setOperator (value) {
    if (wholeOperation.firstValue.length > 0) {
        wholeOperation.operation = value;
        bottomOutput.innerHTML = `${wholeOperation.firstValue} ${wholeOperation.operation} ${wholeOperation.secondValue}`;
    }
}

function operation(first, second, operator) {
    switch (operator) {
        case "+":
            return +first + +second;
            break;
        case "-":
            return +first - +second;
            break;
        case "×":
            return +first * +second;
            break;
        case "÷":
            return +first / +second;
            break;
    }
};

equalButton.addEventListener("click", () => {
    if (wholeOperation.firstValue !== "" && wholeOperation.secondValue !== "" && wholeOperation.operation !== ""){
        wholeOperation.result = operation(wholeOperation.firstValue, wholeOperation.secondValue, wholeOperation.operation);
        console.log(wholeOperation, operation(wholeOperation.firstValue, wholeOperation.secondValue, wholeOperation.operation));
        bottomOutput.innerHTML = wholeOperation.result;
    };
});

function deleteAll () {
    wholeOperation.firstValue = "";
    wholeOperation.operation = "";
    wholeOperation.secondValue = "";
    bottomOutput.innerHTML = "&nbsp;";
    bottomOutput.innerHTML = "&nbsp;";
};