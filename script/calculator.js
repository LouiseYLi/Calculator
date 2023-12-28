const numberButtons = document.querySelectorAll(".numberButton");
let calculation = '';

function storeValue(value) {
    calculation += value;
    console.log(`${calculation}`);
}

function calculate() {
    let sum = eval(calculation);
    console.log(`${sum}`);
}

numberButtons.forEach(button => {
    button.addEventListener("click", (e => {
        let buttonValue = e.target.value;
        storeValue(buttonValue);
    })
)});