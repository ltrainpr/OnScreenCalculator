$(document).ready(function(){
  var computation = [];
  var input = '';
  displayNumber(0);

 $('.number').click(function (e) { multipleNumbers(e.target.innerHTML); });

 function multipleNumbers (string) {
  if (string.match(/\d/)){
    input += string;
  }else{
    computation.push(input, string);
    input = '';
  }
  displayNumber(input || computation[computation.length - 1]);
 }


 $('#positive-negative, #percent').click(function (z) { percentOrPositiveNegative(z.target.innerHTML); });

  function percentOrPositiveNegative (operator) {
    var operatorLookup = {'±': toggleNegativeOrPositive, '%': percentage};
    if (input.length > 0){
      input = operatorLookup[operator](parseFloat(input));
      displayNumber(input);
    }
  }

  $('#equal').click(function(){ equal(); });

  function equal (argument) {
    computation.push(input);
    var total = parseFloat(computation[0]) || 0;
    computation.forEach(function(element, index, array){
      total = crunchNumbers(total, element, index) || total;
    });
    clearCalculator(total);
  }

  function crunchNumbers (total, element, index) {
    var operatorLookup = {'÷': myDivide, 'x': myMultiply, '+': myAdd, '-': mySubtract};
    if(operatorLookup[element]){
      return operatorLookup[element](total, parseFloat(computation[index+1]));
    }
  }

  $('.clear').click(function(){ clearCalculator(0); });

  function clearCalculator (resultingNumber) {
    computation = [];
    input = '';
    displayNumber(resultingNumber);
  }
});


function displayNumber(number) {
  document.getElementById('result').innerHTML = number;
}

function percentage(num1){
  return num1/100;
}

function toggleNegativeOrPositive(num1) {
    return -num1;
}

function myAdd(num1, num2){
  return num1 + num2;
}

function mySubtract(num1, num2){
  return num1 - num2;
}

function myMultiply(num1, num2){
  return num1 * num2;
}

function myDivide(num1, num2){
  return num1 / num2;
}