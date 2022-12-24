/*
enter a number, pushing to array
when an operator is clicked, store array and operator
when button is next clicked, clear display and start new display array, 
only after operator has been clicked
- how to identify operator has been clicked?
*/

const display = document.querySelector('.display');
const numKeys = document.querySelectorAll('.number');
const opKeys = Array.from(document.querySelectorAll('.op'));
let displayVal = [];
let operand = '';
let expression = [];

numKeys.forEach(numKey => {
    numKey.addEventListener('click', (e) => {
        const pressedKey = getPressedKey(opKeys);
        if (pressedKey) {
            displayVal = [];
            clearDisplay();
            pressedKey.classList.toggle('pressed');
        }
        const keyValue = e.target.textContent;
        updateDisplay(keyValue);
        displayVal.push(keyValue);
    })
})

opKeys.forEach(opKey => {
    opKey.addEventListener('click', (e) => {
        opKey.classList.toggle('pressed');
        if (!displayVal.length) return;
        operand = displayVal.join('');
        expression.push(operand);
        const operator = e.target.textContent;
        expression.push(operator);
    })
})

function add(a,b) {
    return a + b;
};
  
function subtract(a,b) {
    return a - b;
};

function multiply(a,b) {
    return a * b;
};

function divide(a,b) {
    return a/b;
};

function operate(a,b,op) {
    switch (op) {
        case '+':
            return add(a,b);
        case '-':
            return subtract(a,b);
        case 'x':
            return multiply(a,b);
        case '/':
            return divide(a,b);
        default:
            console.log('enter a real operator');
            break;
    }
};

function updateDisplay(val) {
    const displayNum = document.createElement('div');
    displayNum.classList.add('display-value');
    displayNum.textContent = val;
    display.appendChild(displayNum);
}

function clearDisplay() {
    while (display.firstChild) display.removeChild(display.firstChild);
}

function getPressedKey(keysArr) {
    return keysArr.find(key => key.classList.length > 2);
}