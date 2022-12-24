/*
enter a number, pushing to array
when an operator is clicked, store array and operator
when button is next clicked, clear display and start new display array, 
only after operator has been clicked
- how to identify operator has been clicked?
when equals is clicked, 
for however many operators, operate on two values of the operands array, and jump by two at a time
*/

const display = document.querySelector('.display');
const numKeys = document.querySelectorAll('.number');
const opKeys = Array.from(document.querySelectorAll('.op'));
const equalsKey = document.querySelector('.equals');
let displayVal = [];
let operand = '';
let operands = [];
let operators = [];

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
        storeOperand(displayVal);
        const operator = e.target.textContent;
        operators.push(operator);
    })
})

equalsKey.addEventListener('click', (e) => {
    storeOperand(displayVal);
    console.log(evaluate(operators, operands));
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

function evaluate(operators, operands) {
    let result = 0;
    for (let i = 0; i < operators.length; i++) {
        let j = 0;
        result = operate(operands[j], operands[j+1], operators[i]);
        j += 2;
    }
    return result;
}

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

function storeOperand(displayVal) {
    operand = displayVal.join('');
    operands.push(operand);
}