const numKeys = document.querySelectorAll('.number');
const opKeys = document.querySelectorAll('.op');
const equalsKey = document.querySelector('.equals');
const clearKey = document.querySelector('.clear');
let operator = '';
let operands = [];

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

  let isEval = false;

  const state = () => display.textContent;

  const getEval = () => isEval;

  const flipEval = () => {
    isEval = !isEval;
  }

  const emptyValues = () => {
    operands = [];
    operator = '';
  }

  const add = (val) => {
    const displayNum = document.createElement('div');
    displayNum.classList.add('display-value');
    displayNum.textContent = val;
    display.appendChild(displayNum);
  }

  const clearAll = () => {
    add(null);
    emptyValues();
  }
  
  const update = (val) => {
    clearAll();
    flipEval();
    add(val);
  };

  return { update, add, clearAll, state, getEval, flipEval }
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
      displayController.add(null);
      togglePressedKey();
    }
    if (displayController.getEval()) {
      displayController.add(null);
      displayController.flipEval();
    }
    const keyValue = e.target.textContent;
    displayController.add(keyValue);
  });
});

opKeys.forEach((opKey) => {
  opKey.addEventListener('click', (e) => {
    if (!displayController.state()) return;
    storeOperand();
    // if (operator) {
    const lastEval = evaluate(operands, operator);
    displayController.update(lastEval)
    if (Number.isNaN(lastEval)) return;
    storeOperand();
    // }
    opKey.classList.toggle('pressed');
    operator = e.target.textContent;
  });
});

equalsKey.addEventListener('click', () => {
  if (displayController.getEval()) {
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
  displayController.update(solution)
});

clearKey.addEventListener('click', () => {
  displayController.clearAll();
  togglePressedKey();
});