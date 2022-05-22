class Calculator {

    constructor(previousOperandTextElement, currentOperandTexElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTexElement = currentOperandTexElement;
        this.clear();
    }
    
    clear() {
        this.previousOperand = "";
        this.currentOperand = "";
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === "") return;
        if (this.previousOperand !== "") {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(curr)) return;
        switch(this.operation) {
            case "+" :
                computation = prev + curr;
                break;
            case "-" :
                computation = prev - curr;
                break;
            case "*" :
                computation = prev * curr;
                break;
            case "÷" :
                computation = prev / curr;
                break
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = "";
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];
        const floatNumber = parseFloat(number);
        let integerDisplay;
        if (isNaN(integerDigits)) {
            return "";
        } else {
            integerDisplay = integerDigits.toLocaleString("en",  {maximumFractionDigits: 0});
        }
        if (decimalDigits != null) {
            return `${integerDigits}.${decimalDigits}`;
        } else {
            return integerDigits;
        }
    }

    updateDisplay() {
        this.currentOperandTexElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = "";
        }
    }
}


const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTexElement = document.querySelector("[data-current-operand]");

const calculator = new Calculator(previousOperandTextElement, currentOperandTexElement);

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});

operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
});

equalsButton.addEventListener("click", button => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener("click", button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener("click", button => {
    calculator.delete();
    calculator.updateDisplay();
})