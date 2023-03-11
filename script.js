const display = document.querySelector('.display');
const numKeys = document.querySelectorAll('.number');
const opKeys = document.querySelectorAll('.op');
const equalsKey = document.querySelector('.equals');
let displayVal = [];
let operand = '';
let operands = [];
let operators = [];
let evalPresent = false;

numKeys.forEach(numKey => {
    numKey.addEventListener('click', (e) => {
        let pressedKey = getPressedKey(opKeys);
        if (pressedKey) {
            displayVal = [];
            clearDisplay();
            pressedKey.classList.toggle('pressed');
        }
        if (evalPresent) {
            clearDisplay();
            evalPresent = false;
        }
        const keyValue = e.target.textContent;
        updateDisplay(keyValue);
        displayVal.push(keyValue);
    })
})

opKeys.forEach(opKey => {
    opKey.addEventListener('click', (e) => {
        if (!displayVal.length) return;
        storeOperand(displayVal);
        opKey.classList.toggle('pressed');
        const operator = e.target.textContent;
        operators.push(operator);
    })
})

equalsKey.addEventListener('click', () => {
    storeOperand(displayVal);
    let solution = evaluate(operators, operands);
    clearDisplay();
    updateDisplay(solution);
    evalPresent = true;
    emptyValArrays();
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

function getPressedKey(opsList) {
    const opsArr = Array.from(opsList);
    return opsArr.find(op => Array.from(op.classList).includes('pressed'));
}

function storeOperand(displayVal) {
    operand = parseInt(displayVal.join(''));
    operands.push(operand);
}

function emptyValArrays() {
    displayVal = [];
    operands = [];
    operators = [];
}