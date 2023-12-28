const buttons = document.querySelectorAll(".numberButtons");
const clear = document.getElementById("clear");
const percent = document.getElementById("percent");
const equals = document.getElementById("equals");

let calculation = '';
let resultContainer = document.getElementById("result");
let resultValue = document.createElement("p");

updateResult(calculation);
resultContainer.append(resultValue);

// --------------------------------------------- \\
// Functions to check value states.
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

function replaceOperator(newOperator) {
    let oldOperator = getLastOperator();
    let newCalculation = calculation.replace(oldOperator, newOperator);
    return newCalculation;
}

function storeValue(value) {
    let lastOperator = getLastOperator();

    if (lastOperator !== null && !isInteger(value)) {
        calculation =  replaceOperator(value);
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
    button.addEventListener("click", (e => {
        let buttonValue = e.target.value;
        storeValue(buttonValue);
    })
)});

clear.addEventListener("click", (() => {
    clearCalculation();
}));

percent.addEventListener("click", (() => {
    getPercent();
}));

equals.addEventListener("click", (() => {
    calculate();
}));