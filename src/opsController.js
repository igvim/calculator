export default (function opsController() {
  let operands = [];
  let operator = '';

  const storeOperand = (val) => {
    operands.push(val);
  }

  const dumpOps = () => {
    operands = [];
  }

  const dumpAll = () => {
    dumpOps();
    operator = '';
  }

  const getOperands = () => operands;

  return { storeOperand, dumpOps, dumpAll, getOperands, 
    get operator() {
      return operator;
    },
    set operator(val) {
      operator = val;
    }
  }
})();