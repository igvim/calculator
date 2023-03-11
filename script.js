/*
enter a number, pushing to array
when an operator or equals is clicked, store array and operator
when button is next clicked, clear display and start new display array, 
only after operator has been clicked
- how to identify operator has been clicked?
when equals is clicked, 
for however many operators, operate on two values of the operands array, and jump by two at a time
NEXT:
- need to reset display after equals is pressed
add pressed class to equals
add equals key to getpressedkey input
same logic should clear display when a number is pressed
- make multiple operands work
- make clear work
*/

const display = document.querySelector('.display');
const numKeys = document.querySelectorAll('.number');
const opKeys = document.querySelectorAll('.op');
let displayVal = [];
let operand = '';
let operands = [];
let operators = [];

numKeys.forEach(numKey => {
    numKey.addEventListener('click', (e) => {
        let pressedKey = getPressedKey(opKeys);
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
        const opKeyClasses = Array.from(opKey.classList);
        if (!displayVal.length) return;
        storeOperand(displayVal);
        if (opKeyClasses.includes('equals')) {
            let solution = evaluate(operators, operands);
            clearDisplay();
            updateDisplay(solution);
        }
        else {
            opKey.classList.toggle('pressed');
            const operator = e.target.textContent;
            operators.push(operator);
        }
    })
})
/*
equalsKey.addEventListener('click', () => {
    equalsKey.classList.toggle('pressed');
    storeOperand(displayVal);
    let solution = evaluate(operators, operands);
    clearDisplay();
    updateDisplay(solution);
})
*/
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