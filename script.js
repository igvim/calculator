const display = document.querySelector('.display');
const numKeys = document.querySelectorAll('.number');
const opKeys = document.querySelectorAll('.op');
const equalsKey = document.querySelector('.equals');
const clearKey = document.querySelector('.clear');
let displayVal = [];
let operator = '';
let operands = [];
let evalPresent = false;

function evaluate(opands, opor) {

  function operate(a, b, op) {
  
    function add() {
      return a + b;
    }
    
    function subtract() {
      return a - b;
    }
    
    function multiply() {
      return a * b;
    }
    
    function divide() {
      return a / b;
    }
  
    switch (op) {
      case '+':
        return add();
      case '-':
        return subtract();
      case 'x':
        return multiply();
      case '/':
        return b === 0 ? "Don't do that!" : divide();
      default:
        return console.log('enter a real operator');
    }
  }

  const solution = opands.reduce((accum, currentVal) => operate(accum, currentVal, opor));

  return solution;
}

const displayController = (() => {
  const clearDisplay = () => {
    display.innerHTML = '';
  };
  
  const updateDisplay = (val) => {
    const displayNum = document.createElement('div');
    displayNum.classList.add('display-value');
    displayNum.textContent = val;
    display.appendChild(displayNum);
  };
  
  const emptyValues = () => {
    displayVal = [];
    operands = [];
    operator = '';
  }
  
  const clearAll = () => {
    clearDisplay();
    emptyValues();
  }

  const displayEval = (val) => {
    clearDisplay();
    updateDisplay(val);
    evalPresent = true;
    emptyValues();
  }

  return { clearDisplay, updateDisplay, displayEval, clearAll }
})();

function storeOperand(dispVal) {
  const operand = parseInt(dispVal.join(''), 10);
  operands.push(operand);
}

const opKeyState = (() => {
    const getPressedKey = (opsList) => {
      const opsArr = Array.from(opsList);
      return opsArr.find((op) => Array.from(op.classList).includes('pressed'));
    }

    const isPressed = () => {
      const pressedKey = getPressedKey(opKeys);
      return pressedKey !== 'undefined'
    }
  
    const togglePressed = () => {
      const pressedKey = getPressedKey(opKeys);
      if (pressedKey) pressedKey.classList.toggle('pressed');
    }

    return { isPressed, togglePressed }
})();

numKeys.forEach((numKey) => {
  numKey.addEventListener('click', (e) => {
    if (opKeyState.isPressed()) {
      displayVal = [];
      displayController.clearDisplay();
      opKeyState.togglePressed();
    }
    if (evalPresent) {
      displayController.clearDisplay();
      evalPresent = false;
    }
    const keyValue = e.target.textContent;
    displayController.updateDisplay(keyValue);
    displayVal.push(keyValue);
  });
});

opKeys.forEach((opKey) => {
  opKey.addEventListener('click', (e) => {
    if (!displayVal.length) return;
    storeOperand(displayVal);
    if (operator) {
      const lastEval = evaluate(operands, operator);
      displayController.displayEval(lastEval);
      if (Number.isNaN(lastEval)) return;
      displayVal.push(lastEval);
      storeOperand(displayVal);
    }
    opKey.classList.toggle('pressed');
    operator = e.target.textContent;
  });
});

equalsKey.addEventListener('click', () => {
  if (evalPresent) {
    opKeyState.togglePressed();
    return;
  }
  if(opKeyState.isPressed()) {
    opKeyState.togglePressed();
  }
  else {
    storeOperand(displayVal);
  }
  const solution = evaluate(operands, operator);
  displayController.displayEval(solution);
});

clearKey.addEventListener('click', () => {
  displayController.clearAll();
  opKeyState.togglePressed();
});
