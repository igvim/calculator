import opsController from "./opsController.js";

export default (function displayController() {
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
    opsController.dumpAll();
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