const display = document.querySelector('.display');
const numKeys = document.querySelectorAll('.number');
const opKeys = document.querySelectorAll('.op');
const equalsKey = document.querySelector('.equals');
const clearKey = document.querySelector('.clear');
let displayVal = [];
let operator = '';
let operands = [];
let evalPresent = false;

numKeys.forEach(numKey => {
    numKey.addEventListener('click', (e) => {
        if (isKeyPressed()) {
            displayVal = [];
            clearDisplay();
            togglePressedKey();
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
        if (operator) {
            const lastEval = evaluate(operands, operator);
            displayVal.push(lastEval);
            storeOperand(displayVal);
        }
        opKey.classList.toggle('pressed');
        operator = e.target.textContent;
    })
})

equalsKey.addEventListener('click', () => {
    if (evalPresent) {
        togglePressedKey;
        return;
    }
    isKeyPressed() ? togglePressedKey() : storeOperand(displayVal);
    evaluate(operands, operator);
})

clearKey.addEventListener('click', () => {
    clearAll();
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

function evaluate(operands, operator) {
   let solution = operands.reduce((accum, currentVal) => {
    return operate(accum,currentVal,operator);
   });
   clearDisplay();
   updateDisplay(solution);
   evalPresent = true;
   emptyValues();
   return solution;
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
    const operand = parseInt(displayVal.join(''));
    operands.push(operand);
}

function emptyValues() {
    displayVal = [];
    operands = [];
    operator = '';
}

function clearAll() {
    clearDisplay();
    emptyValues();
}

function isKeyPressed() {
    let pressedKey = getPressedKey(opKeys);
    return pressedKey ? true : false;
}

function togglePressedKey() {
    getPressedKey(opKeys).classList.toggle('pressed');
}