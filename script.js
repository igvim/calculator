const display = document.querySelector('.display');
const numKeys = document.querySelectorAll('.number');
const opKeys = document.querySelectorAll('.op');
let displayVal = [];
let operand = '';
let expression = [];

numKeys.forEach(numKey => {
    numKey.addEventListener('click', (e) => {
        const keyValue = e.target.textContent;
        updateDisplay(keyValue);
        displayVal.push(keyValue);
    })
})

opKeys.forEach(opKey => {
    opKey.addEventListener('click', (e) => {
        if (!displayVal.length) return;
        operand = displayVal.join('');
        const opVal = e.target.textContent;
        expression.push(operand, opVal);
        opKey.classList.toggle('pressed');
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