const numKeys = document.querySelectorAll('.number');
const opKeys = document.querySelectorAll('.op');
const equalsKey = document.querySelector('.equals');
const clearKey = document.querySelector('.clear');
let operator = '';

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

const operandController = (() => {
  let operands = [];

  const storeOperand = (val) => {
    operands.push(val);
  }

  const dumpOperands = () => {
    operands = [];
  }

  const getOperands = () => operands;

  return { storeOperand, dumpOperands, getOperands }
})();

const displayController = (() => {
  const display = document.querySelector('.display');

  let isEval = false;

  const getVals = () => parseInt(display.textContent, 10);

  const getEval = () => isEval;

  const flipEval = () => {
    isEval = !isEval;
  }

  const add = (val) => {
    const displayNum = document.createElement('div');
    displayNum.classList.add('display-value');
    displayNum.textContent = val;
    display.appendChild(displayNum);
  }

  const clearAll = () => {
    display.innerHTML = '';
    operandController.dumpOperands();
    operator = '';
  }
  
  const update = (val) => {
    display.innerHTML = '';
    add(val);
  };

  return { update, add, clearAll, getVals, getEval, flipEval }
})();

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
      displayController.update(null);
      togglePressedKey();
    }
    if (displayController.getEval()) {
      displayController.update(null);
      displayController.flipEval();
    }
    const keyValue = e.target.textContent;
    displayController.add(keyValue);
  });
});

opKeys.forEach((opKey) => {
  opKey.addEventListener('click', (e) => {
    if (!displayController.getVals()) return;
    const lastVal = displayController.getVals();
    operandController.storeOperand(lastVal);
    // if (operator) {
    const lastEval = evaluate(operandController.getOperands(), operator);
    displayController.update(lastEval);
    displayController.flipEval();
    if (Number.isNaN(lastEval)) return;
    // operandController.storeOperand(lastEval);
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
    operandController.storeOperand(displayController.getVals());
  }
  const solution = evaluate(operandController.getOperands(), operator);
  displayController.update(solution);
  displayController.flipEval();
  operandController.dumpOperands();
  operator = '';
});

clearKey.addEventListener('click', () => {
  displayController.clearAll();
  togglePressedKey();
});