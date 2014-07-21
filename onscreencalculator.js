function Params(value){
  this.value = value;
}

var parameters = new Params();
parameters.prototype.computation = [];
parameters.prototype.input = '';


Calculator = {
    // Do the work of converting a computation array into a number
    // Returns a number

  calculate: function (computationArray) {
    var total = parseFloat(computationArray[0]) || 0;
    computationArray.forEach(function(element, index, array){
      total = Calculator.crunchNumbers(total, element, index) || total;
    });
  },

  crunchNumbers: function(total, element, index) {
    var operatorLookup = {'÷': myDivide, 'x': myMultiply, '+': myAdd, '-': mySubtract};
    if(operatorLookup[element]){
      return operatorLookup[element](total, parseFloat(computationArray[index+1]));
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
  handleInput: function(inputtedKey) {
    // Modify the `input` value/`computation` based on what button the user pressed on the calculator.
    // Returns the value that should be displayed on the screen.

  },

  percentOrPositiveNegative: function(operator) {
    var operatorLookup = {'±': toggleNegativeOrPositive, '%': percentage};
    if (parameters.input.length > 0){
      parameters.input = Calculator['' + operatorLookup[operator]](parseFloat(parameters.input));
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
    View.display(parameters.input || parameters.computation[parameters.computation.length - 1]);
  },

  total: function(argument) {
     // Calls Calculator.calculate with the apps current computation, returns the number.

    parameters.computation.push(parameters.input);
    var total = parseFloat(parameters.computation[0]) || 0;
    parameters.computation.forEach(function(element, index, array){
      total = crunchNumbers(total, element, index) || total;
    });
    App.resetCalculator(total);
  },

  resetCalculator: function (resultingNumber) {
    // Resets the `input` and `computation` arrays; returns the value that should be displayed on the screen

    parameters.computation = [];
    parameters.input = '';
    View.display(resultingNumber);
  }
};

View = {
  run: function(app, domElements) {
    // Registers all the event handlers.
    var number;
    $('.number').click(function (e) { number = app.multipleNumbers(e.target.innerHTML); });
    $('#positive-negative, #percent').click(function (z) { number = app.percentOrPositiveNegative(z.target.innerHTML); });
    $('#equal').click(function(){ number = app.total(); });
    $('.clear').click(function(){ number = app.resetCalculator(0); });
    View.display(number);
  },

  display: function(number) {
    document.getElementById('result').innerHTML = number;
  }
};

$(document).ready(function() {
  View.run(App, $('#calculator'));
});

// $(document).ready(function(){
//   var computation = [];
//   var input = '';
//   displayNumber(0);

//  $('.number').click(function (e) { multipleNumbers(e.target.innerHTML); });

//  function multipleNumbers (string) {
//   if (string.match(/\d/)){
//     input += string;
//   }else{
//     computation.push(input, string);
//     input = '';
//   }
//   displayNumber(input || computation[computation.length - 1]);
//  }


//  $('#positive-negative, #percent').click(function (z) { percentOrPositiveNegative(z.target.innerHTML); });

//   function percentOrPositiveNegative (operator) {
//     var operatorLookup = {'±': toggleNegativeOrPositive, '%': percentage};
//     if (input.length > 0){
//       input = operatorLookup[operator](parseFloat(input));
//       displayNumber(input);
//     }
//   }

//   $('#equal').click(function(){ equal(); });

//   function equal (argument) {
//     computation.push(input);
//     var total = parseFloat(computation[0]) || 0;
//     computation.forEach(function(element, index, array){
//       total = crunchNumbers(total, element, index) || total;
//     });
//     clearCalculator(total);
//   }

//   function crunchNumbers (total, element, index) {
//     var operatorLookup = {'÷': myDivide, 'x': myMultiply, '+': myAdd, '-': mySubtract};
//     if(operatorLookup[element]){
//       return operatorLookup[element](total, parseFloat(computation[index+1]));
//     }
//   }

//   $('.clear').click(function(){ clearCalculator(0); });

//   function clearCalculator (resultingNumber) {
//     computation = [];
//     input = '';
//     displayNumber(resultingNumber);
//   }
// });


// function displayNumber(number) {
//   document.getElementById('result').innerHTML = number;
// }

// function percentage(num1){
//   return num1/100;
// }

// function toggleNegativeOrPositive(num1) {
//     return -num1;
// }

// function myAdd(num1, num2){
//   return num1 + num2;
// }

// function mySubtract(num1, num2){
//   return num1 - num2;
// }

// function myMultiply(num1, num2){
//   return num1 * num2;
// }

// function myDivide(num1, num2){
//   return num1 / num2;
// }