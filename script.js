const display = document.querySelector('.display');
const numberKeys = document.querySelectorAll('.number');

numberKeys.forEach(key => {
    key.addEventListener('click', (e) => {
        const value = e.target.textContent;
        const displayNum = document.createElement('div');
        displayNum.classList.add('display-value');
        displayNum.textContent = value;
        display.appendChild(displayNum);
    })
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

/*
# populate display
when button is clicked
store key value as a number
create div element and set its text content to value
append element as a child to display
*/