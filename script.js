const numKeys = document.querySelectorAll('.number');
const opKeys = document.querySelectorAll('.op');
const equalsKey = document.querySelector('.equals');
const clearKey = document.querySelector('.clear');

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

const opsController = (() => {
  let operands = [];
  let operator = '';

  const storeOperand = (val) => {
    operands.push(val);
  }

  const dumpOps = () => {
    operands = [];
    operator = '';
  }

  const getOperands = () => operands;

  return { storeOperand, dumpOps, getOperands, 
    get operator() {
      return operator;
    },
    set operator(val) {
      operator = val;
    }
  }
})();

const displayController = (() => {
  const display = document.querySelector('.display');

  let isEval = false;

  const getVals = () => parseInt(display.textContent, 10);
  
  const add = (val) => {
    const displayNum = document.createElement('div');
    displayNum.classList.add('display-value');
    displayNum.textContent = val;
    display.appendChild(displayNum);
  }

  const clearAll = () => {
    display.innerHTML = '';
    opsController.dumpOps();
    isEval = false;
  }
  
  const update = (val) => {
    display.innerHTML = '';
    add(val);
  };

  return { update, add, clearAll, getVals,
    get isEval() {
      return isEval;
    }, 
    set isEval(val) {
      isEval = val;
    }
  }
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
    if (!displayController.isEval) {
      if (isKeyPressed()) displayController.update(null);
      togglePressedKey();
    }
    else {
      opsController.dumpOps();
      if (isKeyPressed()) opsController.storeOperand(displayController.getVals());
      displayController.update(null);
      displayController.isEval = false;
      togglePressedKey();
    }
    const keyValue = e.target.textContent;
    displayController.add(keyValue);
  });
});

opKeys.forEach((opKey) => {
  opKey.addEventListener('click', (e) => {
    if (!displayController.getVals()) return;
    const lastVal = displayController.getVals();
    opsController.storeOperand(lastVal);
    if (opsController.getOperands().length > 1) {
      const lastEval = evaluate(opsController.getOperands(), opsController.operator);
      displayController.update(lastEval);
      if (Number.isNaN(lastEval)) return;
      displayController.isEval = true;
    }
    opKey.classList.toggle('pressed');
    opsController.operator = e.target.textContent;
  });
});

equalsKey.addEventListener('click', () => {
  if (displayController.isEval) {
    togglePressedKey();
    return;
  }
  if(isKeyPressed()) {
    togglePressedKey();
  }
  else {
    opsController.storeOperand(displayController.getVals());
  }
  const solution = evaluate(opsController.getOperands(), opsController.operator);
  displayController.update(solution);
  displayController.isEval = true;
  opsController.dumpOps();
});

clearKey.addEventListener('click', () => {
  displayController.clearAll();
  togglePressedKey();
});