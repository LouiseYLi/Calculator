let calculation = '';
function calculate() {
    let sum = eval(calculation);
    console.log(`${sum}`);
}

function storeValue(value) {
    calculation += value;
    console.log(`${calculation}`);
}