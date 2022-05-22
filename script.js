const display = document.querySelector("#display");
const result = document.querySelector("#result");
const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");
const ops = ['+', '-', '*', '/'];
let stuffInDisplay = 0;

numbers.forEach(number => {
    number.addEventListener("click", () => {
        display.textContent += number.textContent;
        stuffInDisplay++;
    })
});

operations.forEach((operation) => {
    operation.addEventListener("click", () => {
        if (stuffInDisplay >= 3) {
            result.textContent = eval(display.textContent);
            display.textContent = result.textContent + operation.textContent;
            stuffInDisplay = 0;
        } else {
            if (!(display.textContent[0] in ops)) {
                display.textContent += operation.textContent;
                stuffInDisplay++;
            }
        }
    })
})

const input = prompt();
console.log(input);

function clean(input) {
    return input.split(" ");
}

function evaluate(a, b, operator) {
    a = parseInt(a);
    b = parseInt(b);
    switch (operator) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/" :
            return a / b;
        default:
            return null;
    }
}