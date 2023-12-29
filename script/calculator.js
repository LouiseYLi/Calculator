const buttons = document.querySelectorAll(".numberButtons");
const brackets = document.querySelectorAll(".brackets");
const clear = document.getElementById("clear");
const percent = document.getElementById("percent");
const equals = document.getElementById("equals");

let calculation = "";
let resultContainer = document.getElementById("result");
let resultValue = document.createElement("p");
let openBrackets;
let closedBrackets;
let lastIndexValue;

updateResult(calculation);
resultContainer.append(resultValue);

// --------------------------------------------- \\
// Functions to manage value states.
// --------------------------------------------- \\

function isInteger(str) {
    return !isNaN(str);
}

function isOperator(char) {
    const operators = ['+', '-', '/', '*', '='];
    return operators.includes(char);
}

// --------------------------------------------- \\
// Functions to retrieve values.
// --------------------------------------------- \\

function getLastOperator() {
    for (let i = calculation.length - 1; i >= 0; i--) {
        if (isOperator(calculation.charAt(i))) {
            return calculation.substring(i, i + 1);
        } else if (isInteger(calculation.substring(i, i + 1))) {
            return null;
        }
    }
    return null;
}

function getLastValue() {
    let lastIndexValue = "";
    
    if (typeof calculation === "string" && calculation.length > 0) {
        lastIndexValue = String(calculation.substring(calculation.length - 1, calculation.length));
    }

    return lastIndexValue;
}

function getOpenBracketsCount() {
    openBrackets = 0;
    closedBrackets = 0;
    for (let i = 0; i < calculation.length; i++) {
        if (calculation.substring(i, i + 1).includes("(")) {
            openBrackets++;
        } else if (calculation.substring(i, i + 1).includes(")")) {
            closedBrackets++;
        }
    }
    return openBrackets - closedBrackets;
}

// --------------------------------------------- \\
// Updates UI for the calculation result.
// --------------------------------------------- \\

function updateResult(newValue) {
    let parsedValue = String(newValue);
    if (parsedValue === '') {
        resultValue.innerHTML = 0;
        return resultValue
    }
    resultValue.innerHTML = parsedValue.replace("*", "&times;").replace("/", "&divide;");
    return resultValue;
}

// --------------------------------------------- \\
// Functions that manage storing calculation values.
// --------------------------------------------- \\

function buttonClickHandler(e) {
    let buttonValue = e.target.value;
    storeValue(buttonValue);
}

function replaceOperator(newOperator) {
    if (newOperator == '(' || newOperator == ')') return calculation + newOperator;
    let oldOperator = getLastOperator();
    let newCalculation = calculation.replace(oldOperator, newOperator);
    return newCalculation;
}

function storeValue(value) {
    let lastOperator = getLastOperator();
    let lastValue = getLastValue();
    
    if (lastOperator !== null && !isInteger(value)) {
        calculation =  replaceOperator(value);
    } else if (isInteger(lastValue) && value.startsWith("(")) {
        calculation += '*' + value;
    } else {
        calculation += value;
    }

    updateResult(calculation);
    resultContainer.append(resultValue);
    return console.log(`${calculation}`);
}

// --------------------------------------------- \\
// Updates calculation values.
// --------------------------------------------- \\

function calculate() {
    while (getOpenBracketsCount() > 0) {
        calculation += ")";
        closedBrackets--;
    }

    let total = eval(calculation);
    console.log(`total: ${total}`);
    updateResult(total);
    resultContainer.append(resultValue);
    calculation = total;
    console.log(`${total}`);
    return calculation;
}

function clearCalculation() {
    calculation = "";
    updateResult(calculation);
    resultContainer.append(resultValue);
    return calculation;
}

function getPercent() {
    calculate();
    let percentage = calculation / 100;
    updateResult(percentage);
    resultContainer.append(resultValue);
    console.log(`${percentage}`);
}

// --------------------------------------------- \\
// Button event listeners.
// --------------------------------------------- \\

buttons.forEach(button => {
    button.addEventListener("click", buttonClickHandler)
});

brackets.forEach(bracket => {
    bracket.addEventListener("click", buttonClickHandler)
});

clear.addEventListener("click", (() => {
    clearCalculation();
}));

percent.addEventListener("click", (() => {
    getPercent();
}));

equals.addEventListener("click", (() => {
    calculate();
}));