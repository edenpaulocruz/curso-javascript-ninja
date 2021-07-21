(function(win, doc) {
  'use sctrict';
  /*
  Vamos desenvolver mais um projeto. A ideia é fazer uma mini-calculadora.
  As regras são:

  - Deve ter somente 1 input, mas não deve ser possível entrar dados nesse input
  diretamente;
  - O input deve iniciar com valor zero;
  - Deve haver 10 botões para os números de 0 a 9. Cada botão deve ser um número;
  - Deve haver 4 botões para as operações principais: soma (+), subtração(-),
  multiplicação(x) e divisão(÷);
  - Deve haver um botão de "igual" (=) que irá calcular os valores e um botão "CE"
  que irá limpar o input, deixando-o com valor 0;
  - A cada número pressionado, o input deve atualizar concatenando cada valor
  digitado, como em uma calculadora real;
  - Ao pressionar um botão com uma das 4 operações, deve aparecer o símbolo da
  operação no input. Se o último caractere no input já for um símbolo de alguma
  operação, esse caractere deve ser substituído pelo último pressionado.
  Exemplo:
  - Se o input tem os valores: "1+2+", e for pressionado o botão de
  multiplicação (x), então no input deve aparecer "1+2x".
  - Ao pressionar o botão de igual, o resultado do cálculo deve ser mostrado no
  input;
  - Ao pressionar o botão "CE", o input deve ficar zerado.
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
    var operations = ['+', '-', 'x', '÷'];
    var lastItem = display.value.split('').pop();

    return operations.some(function(item) {
      return item === lastItem;
    });
  }

  function handleClickEqual() {
    removeLastItemIfIsAnOperator();
    var allValues = display.value.match(/(?:\d+)|[+x÷-]/g);
    var result = parseInt(allValues[0]);
    var i = 1;
    var valueIn, operator;
    while (i < allValues.length) {
      operator = allValues[i];
      valueIn = parseInt(allValues[i + 1]);
      result = calculator(result, valueIn, operator);
      i += 2;
    }
    display.value = result;
  }

  function calculator(value1, value2, operator) {
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

  clearDisplay();

  buttonsNumbers.forEach(function(button) {
    button.addEventListener('click', handleClickNumber, false);
  });

  buttonsOperators.forEach(function(button) {
    button.addEventListener('click', handleClickOperation, false);
  });

  buttonClear.addEventListener('click', clearDisplay, false);

  buttonEqual.addEventListener('click', handleClickEqual, false);

})(window, document);
