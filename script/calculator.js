const numberButtons = document.querySelectorAll(".numberButton");
const equals = document.getElementById("equals");
const clear = document.getElementById("clear");
let calculation = '';
let resultContainer = document.getElementById("result");
let resultValue = document.createElement("p");


function updateResult(newValue) {
    let parsedValue = String(newValue);
    if (parsedValue === '') {
        resultValue.innerHTML = 0;
        return resultValue
    }
    resultValue.innerHTML = parsedValue.replace("*", "&times;").replace("/", "&divide;");
    return resultValue;
}

function storeValue(value) {
    calculation += value;
    updateResult(calculation);
    resultContainer.append(resultValue);
    console.log(`${calculation}`);
}

numberButtons.forEach(button => {
    button.addEventListener("click", (e => {
        let buttonValue = e.target.value;
        storeValue(buttonValue);
    })
)});

clear.addEventListener("click", (clearCalculation => {
    calculation = "";
    updateResult(calculation);
    resultContainer.append(resultValue);
    return calculation;
}));

equals.addEventListener("click", (calculate => {
    let total = eval(calculation);
    updateResult(total);
    resultContainer.append(resultValue);
    calculation = total;
    console.log(`${total}`);
}));