const display1 = document.querySelector(".num-display-1");
const display2 = document.querySelector(".num-display-2");
const tempResult = document.querySelector(".temp-result");
const equal = document.querySelector(".equal");
const clearAll = document.querySelector(".all-clear");
const clearLast = document.querySelector(".last-entity-clear");

const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");

let dis1Num = "";
let dis2Num = "";
let result = null;
let lastOperation = "";
let haveDot = false;

numbers.forEach((number) => {
  number.addEventListener("click", (i) => {
    if (i.target.innerText === "." && !haveDot) {
      haveDot = true;
    } else if (i.target.innerText === "." && haveDot) {
      return;
    }
    dis2Num += i.target.innerText;
    display2.innerText = dis2Num;
  });
});

operations.forEach((operation) => {
  operation.addEventListener("click", (i) => {
    if (!dis2Num) return;
    haveDot = false;
    const operationName = i.target.innerText;
    if (dis1Num && dis2Num && lastOperation) {
      mathOperation();
    } else {
      result = parseFloat(dis2Num);
    }
    clearVar(operationName);
    lastOperation = operationName;
    console.log(result);
  });
});

function clearVar(name = "") {
  dis1Num += dis2Num + " " + name + " ";
  display1.innerText = dis1Num;
  display2.innerText = "";
  dis2Num = "";
  tempResult.innerText = result;
}

function mathOperation() {
  if (lastOperation === "x") {
    result = parseFloat(result) * parseFloat(dis2Num);
  } else if (lastOperation === "+") {
    result = parseFloat(result) + parseFloat(dis2Num);
  } else if (lastOperation === "-") {
    result = parseFloat(result) - parseFloat(dis2Num);
  } else if (lastOperation === "/") {
    result = parseFloat(result) / parseFloat(dis2Num);
  } else if (lastOperation === "%") {
    result = parseFloat(result) % parseFloat(dis2Num);
  }
}

equal.addEventListener("click", () => {
  if (!dis2Num || !dis1Num) return;
  haveDot = false;
  mathOperation();
  clearVar();
  display2.innerText = result;
  tempResult.innerText = "";
  dis2Num = result;
  dis1Num = "";
});

clearLast.addEventListener("click", () => {
    display2.innerText = "";
    dis2Num = "";
  });

clearAll.addEventListener("click", () => {
  dis1Num = "";
  dis2Num = "";
  display1.innerText = "";
  display2.innerText = "";
  result = "";
  tempResult.innerText = "";
});

window.addEventListener("keydown", (i) => {
  if ( i.key === "0" || i.key === "1" || i.key === "2" || i.key === "3" || i.key === "4" || i.key === "5" || i.key === "6" ||i.key === "7" || i.key === "8" ||i.key === "9" || i.key === ".") {
    clickButton(i.key);
  } else if (i.key === "+" || i.key === "-" || i.key === "/" || i.key === "%") {
    clickOperation(i.key);
  } else if (i.key === "*") {
    clickOperation("x");
  } else if (i.key == "Enter" || i.key === "=") {
    clickEqual();
  } else if (i.key == "Backspace") {
    clickclearLast();
  }
});

function clickButton(key) {
  numbers.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}

function clickOperation(key) {
  operations.forEach((operation) => {
    if (operation.innerText === key) {
      operation.click();
    }
  });
}

function clickEqual() {
  equal.click();
}

function clickclearLast() {
  clearLast.click();
}