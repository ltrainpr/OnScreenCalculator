Calculator = {
    // Do the work of converting a computation array into a number
    // Returns a number

  calculate: function (parameters) {
    var total = parseFloat(parameters.computation[0]) || 0;
    parameters.computation.forEach(function(element, index, array){
      total = Calculator.crunchNumbers(total, element, index, parameters) || total;
    });

    return total;
  },

  crunchNumbers: function(total, element, index, parameters) {
    if(Calculator.operator[element]){
      return Calculator.operator[element](total, parseFloat(parameters.computation[index+1]));
    }
  },

  operator: {
    '÷': function(num1, num2){return num1 / num2;},
    'x': function(num1, num2){return num1 * num2;},
    '+': function(num1, num2){return num1 + num2;},
    '-': function(num1, num2){return num1 - num2;},
    '%': function(num1){return num1/100;},
    '±': function(num1) {return -num1;}
  }
};

App = {

  percentOrPositiveNegative: function(operator, parameters) {
    if (parameters.input.length > 0){
      parameters.input = Calculator.operator[operator](parseFloat(parameters.input));
    }
    return parameters.input;
  },

  multipleNumbers: function(string, parameters) {
    if (string.match(/\d/)){
      parameters.input += string;
    }else{
      parameters.computation.push(parameters.input, string);
      parameters.input = '';
    }
    var result = parameters.input || parameters.computation[parameters.computation.length - 1];
    return result;
    },

  total: function(parameters) {
     // Calls Calculator.calculate with the apps current computation, returns the number.

    parameters.computation.push(parameters.input);
    var total = Calculator.calculate(parameters);
    return App.resetCalculator(total, parameters);
  },

  resetCalculator: function (resultingNumber, parameters) {
    // Resets the `input` and `computation` arrays; returns the value that should be displayed on the screen

    parameters.computation = [];
    parameters.input = '';
    return resultingNumber;
  }
};

View = {
  run: function(app, domElements, parameters) {
    // Registers all the event handlers.

    var result = domElements.find('#result');
    result.text(0);
    domElements.on('click', '.number', function(e){View.display(app.multipleNumbers(e.target.innerHTML, parameters), result);});
    domElements.on('click', '#positive-negative, #percent', function(z) { View.display(app.percentOrPositiveNegative(z.target.innerHTML, parameters), result); });
    domElements.on('click', '#equal', function() {View.display(app.total(parameters), result);});
    domElements.on('click', '.clear', function () {View.display(app.resetCalculator(0, parameters), result);});
  },

  display: function(number, resultElement) {
    resultElement.text(number);
  }
};

$(document).ready(function() {
  function Params(){}

  Params.prototype.computation = [];
  Params.prototype.input = '';
  var parameters = new Params();

  View.run(App, $('#calculator'), parameters);
});
