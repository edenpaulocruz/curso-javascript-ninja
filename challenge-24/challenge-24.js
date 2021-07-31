(function(win, doc) {
  'use strict';
  /*
  Nossa calculadora agora está funcional! A ideia desse desafio é modularizar
  o código, conforme vimos na aula anterior. Quebrar as responsabilidades
  em funções, onde cada função faça somente uma única coisa, e faça bem feito.

  - Remova as duplicações de código;
  - agrupe os códigos que estão soltos em funções (declarações de variáveis,
  listeners de eventos, etc);
  - faça refactories para melhorar esse código, mas de forma que o mantenha com a
  mesma funcionalidade.
  */

  var display = doc.querySelector('.display__input');
  var buttonsNumbers = doc.querySelectorAll('.button-number');
  var buttonClear = doc.querySelector('.button-clear');
  var buttonsOperators = doc.querySelectorAll('.button-operator');
  var buttonEqual = doc.querySelector('.button-equal');

  function clearDisplay() {
    display.value = 0;
  }

  function handleClickNumber() {
    if (display.value !== "0") {
      display.value += this.value;
    } else {
      display.value = this.value;
    }
  }

  function handleClickOperation() {
    removeLastItemIfIsAnOperator();
    display.value += this.value;
  }

  function removeLastItemIfIsAnOperator() {
    if (isLastItemAnOperator()) {
      display.value = display.value.slice(0, -1);
    }
  }

  function isLastItemAnOperator() {
    var operators = getOperators();
    var lastItem = display.value.split('').pop();
    return operators.some(function(operator) {
      return operator === lastItem;
    });
  }

  function getOperators() {
    return Array.prototype.map.call(buttonsOperators, function (button) {
      return button.value;
    });
  }

  function handleClickEqual() {
    removeLastItemIfIsAnOperator();
    var allValues = isFirstItemMinus(display.value.match(getRegexOperators()));
    var result = parseInt(allValues[0]);
    display.value = calculator(allValues, result);
  }

  function getRegexOperators() {
    return new RegExp("(?:\\d+)|[" + getOperators().join('\\') + "]", "g");
  }

  function isFirstItemMinus(arr) {
    if (arr[0] === '-')
      arr.unshift(0);
    return arr;
  }

  function calculator(values, result) {
    var i = 1;
    var valueIn, operator;
    while (i < values.length) {
      operator = values[i];
      valueIn = parseInt(values[i + 1]);
      result = executeOperation(result, valueIn, operator);
      i += 2;
    }
    return result;
  }

  function executeOperation(value1, value2, operator) {
    switch (operator) {
      case '+':
        return value1 + value2;
      case '-':
        return value1 - value2;
      case 'x':
        return value1 * value2;
      case '÷':
        return value1 / value2;
    }
  }

  function initEvents() {
    buttonsNumbers.forEach(function(button) {
      button.addEventListener('click', handleClickNumber, false);
    });
    buttonsOperators.forEach(function(button) {
      button.addEventListener('click', handleClickOperation, false);
    });
    buttonClear.addEventListener('click', clearDisplay, false);
    buttonEqual.addEventListener('click', handleClickEqual, false);
  }

  function initialize() {
    clearDisplay();
    initEvents();
  }

  initialize();
})(window, document);
