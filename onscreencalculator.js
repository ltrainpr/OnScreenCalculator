function Params(){
}

Params.prototype.computation = [];
Params.prototype.input = '';
var parameters = new Params();


Calculator = {
    // Do the work of converting a computation array into a number
    // Returns a number

  calculate: function (computationArray) {
    var total = parseFloat(computationArray[0]) || 0;
    computationArray.forEach(function(element, index, array){
      total = Calculator.crunchNumbers(total, element, index) || total;
    });

    return total;
  },

  crunchNumbers: function(total, element, index) {
    var operatorLookup = {'÷': Calculator.myDivide, 'x': Calculator.myMultiply, '+': Calculator.myAdd, '-': Calculator.mySubtract};
    if(operatorLookup[element]){
      return operatorLookup[element](total, parseFloat(parameters.computation[index+1]));
    }
  },

  myAdd: function(num1, num2){
    return num1 + num2;
  },

  mySubtract: function(num1, num2){
    return num1 - num2;
  },

  myMultiply: function(num1, num2){
    return num1 * num2;
  },

  myDivide: function(num1, num2){
    return num1 / num2;
  },

  percentage: function(num1){
    return num1/100;
  },

  toggleNegativeOrPositive: function(num1) {
    return -num1;
  }
};

App = {

  percentOrPositiveNegative: function(operator) {
    var operatorLookup = {'±': Calculator.toggleNegativeOrPositive, '%': Calculator.percentage};
    if (parameters.input.length > 0){
      parameters.input = operatorLookup[operator](parseFloat(parameters.input));
    }
    return parameters.input;
  },

  multipleNumbers: function(string) {
    if (string.match(/\d/)){
      parameters.input += string;
    }else{
      parameters.computation.push(parameters.input, string);
      parameters.input = '';
    }
    var result = parameters.input || parameters.computation[parameters.computation.length - 1];
    return result;
    },

  total: function(argument) {
     // Calls Calculator.calculate with the apps current computation, returns the number.

    parameters.computation.push(parameters.input);
    var total = Calculator.calculate(parameters.computation);
    return App.resetCalculator(total);
  },

  resetCalculator: function (resultingNumber) {
    // Resets the `input` and `computation` arrays; returns the value that should be displayed on the screen

    parameters.computation = [];
    parameters.input = '';
    return resultingNumber;
  }
};

View = {
  run: function(app, domElements) {
    // Registers all the event handlers.
    View.display(0);
    $('.number').click(function (e) { View.display(app.multipleNumbers(e.target.innerHTML)); });
    $('#positive-negative, #percent').click(function (z) { View.display(app.percentOrPositiveNegative(z.target.innerHTML)); });
    $('#equal').click(function(){ View.display(app.total()); });
    $('.clear').click(function(){ View.display(app.resetCalculator(0)); });
  },

  display: function(number) {
    document.getElementById('result').innerHTML = number;
  }
};

$(document).ready(function() {
  View.run(App, $('#calculator'));
});
