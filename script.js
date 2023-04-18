const display = document.querySelector('.display');
const numKeys = document.querySelectorAll('.number');
const opKeys = document.querySelectorAll('.op');
const equalsKey = document.querySelector('.equals');
const clearKey = document.querySelector('.clear');
// let displayVal = [];
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
    // displayVal = [];
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

function storeOperand() {
  const operand = parseInt(display.textContent, 10);
  operands.push(operand);
}

function getPressedKey(opsList) {
  const opsArr = Array.from(opsList);
  return opsArr.find((op) => Array.from(op.classList).includes('pressed'));
}

function isKeyPressed() {
  const pressedKey = getPressedKey(opKeys);
  return !!pressedKey;
}

function togglePressedKey() {
  const pressedKey = getPressedKey(opKeys);
  if (pressedKey) pressedKey.classList.toggle('pressed');
}

numKeys.forEach((numKey) => {
  numKey.addEventListener('click', (e) => {
    if (isKeyPressed()) {
      // displayVal = [];
      displayController.clearDisplay();
      togglePressedKey();
    }
    if (evalPresent) {
      displayController.clearDisplay();
      evalPresent = false;
    }
    const keyValue = e.target.textContent;
    displayController.updateDisplay(keyValue);
    // displayVal.push(keyValue);
  });
});

opKeys.forEach((opKey) => {
  opKey.addEventListener('click', (e) => {
    if (!display.textContent) return;
    storeOperand();
    if (operator) {
      const lastEval = evaluate(operands, operator);
      displayController.displayEval(lastEval);
      if (Number.isNaN(lastEval)) return;
      // displayVal.push(lastEval);
      storeOperand();
    }
    opKey.classList.toggle('pressed');
    operator = e.target.textContent;
  });
});

equalsKey.addEventListener('click', () => {
  if (evalPresent) {
    togglePressedKey();
    return;
  }
  if(isKeyPressed()) {
    togglePressedKey();
  }
  else {
    storeOperand();
  }
  const solution = evaluate(operands, operator);
  displayController.displayEval(solution);
});

clearKey.addEventListener('click', () => {
  displayController.clearAll();
  togglePressedKey();
});