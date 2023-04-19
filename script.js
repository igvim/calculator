const numKeys = document.querySelectorAll('.number');
const opKeys = document.querySelectorAll('.op');
const equalsKey = document.querySelector('.equals');
const clearKey = document.querySelector('.clear');
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
  const display = document.querySelector('.display');

  const clear = () => {
    display.innerHTML = '';
  };

  const emptyValues = () => {
    operands = [];
    operator = '';
  }
  
  const clearAll = () => {
    clear();
    emptyValues();
  }
  
  const update = (val) => {
    const displayNum = document.createElement('div');
    displayNum.classList.add('display-value');
    displayNum.textContent = val;
    display.appendChild(displayNum);
  };

  const displayEval = (val) => {
    clearAll();
    update(val);
    evalPresent = true;
    // emptyValues();
  }

  const state = () => display.textContent;

  return { update, displayEval, clearAll, state }
})();

function storeOperand() {
  const operand = parseInt(displayController.state(), 10);
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
      displayController.clear();
      togglePressedKey();
    }
    if (evalPresent) {
      displayController.clear();
      evalPresent = false;
    }
    const keyValue = e.target.textContent;
    displayController.update(keyValue);
  });
});

opKeys.forEach((opKey) => {
  opKey.addEventListener('click', (e) => {
    if (!displayController.state()) return;
    storeOperand();
    if (operator) {
      const lastEval = evaluate(operands, operator);
      displayController.displayEval(lastEval);
      if (Number.isNaN(lastEval)) return;
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