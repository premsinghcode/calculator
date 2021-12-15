class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
      this.previousOperandTextElement = previousOperandTextElement;
      this.currentOperandTextElement = currentOperandTextElement;  
      this.clear();
    }
    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete(){
    this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    appendNumber(number){
        if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString()+ number.toString();
    }
    chooseOperation(operation){
        if(this.currentOperand === '') return
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
    }
    compute(){
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if(isNaN(prev) || isNaN(current))return
    switch (this.operation) {
        case "+":
            computation = prev + current;
            break;
        case "-":
            computation = prev - current;
            break;
        case "*":
            computation = prev * current;
            break;
        case "÷":
            computation = prev / current;
            break;   
        default:
            return
            break;
    }
    this.currentOperand = computation;
    this.operation= undefined;
    this.previousOperand = '';
    }
    updateDisplay(){
    this.currentOperandTextElement.textContent = this.currentOperand;
    if(this.operation!=null){
        this.previousOperandTextElement.textContent = `${this.previousOperand} ${this.operation}`;
    }
    else{this.previousOperandTextElement.innerText ="";}
    }
}

const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const equalsButton = document.querySelector(".equals");
const deleteButton = document.querySelector(".delete");
const allClearButton = document.querySelector(".clear");
const previousOperandTextElement = document.querySelector(".previous");
const currentOperandTextElement = document.querySelector(".current");

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);
numberButtons.forEach(button => {
    button.addEventListener('click', function(){
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});
operationButtons.forEach(button => {
    button.addEventListener('click', function () {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});
equalsButton.addEventListener('click',button=>{
    calculator.compute();
    calculator.updateDisplay();
});
deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});
allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});


