$(document).ready(function(){
  var computation = [];
  var input = '';
  displayNumber(0);

 $('.number').click(function (e) {
    var operatorLookup = {'±': toggleNegativeOrPositive, '%': percentage};
    var string = e.target.innerHTML;
    multipleNumbers(string);

    displayNumber(input || computation[computation.length - 1]);
 });

 $('#positive-negative, #percent').click(function (z) {
    var operator = z.target.innerHTML;
    if (input.length > 0){
      input = operatorLookup[operator](parseFloat(input));
      displayNumber(input);
    }
 });

 function multipleNumbers (string) {
  if (string.match(/\d/)){
    input += string;
  }else{
    computation.push(input);
    computation.push(string);
    input = '';
  }
  return input;
 }

 $('#equal').click(function(){
    computation.push(input);
    var total = parseFloat(computation[0]) || 0;
    computation.forEach(function(element, index, array){
      total = crunchNumbers(total, element, index) || total;
    });
    computation = [];
    input = '';
    displayNumber(total);
 });

 function crunchNumbers (total, element, index) {
  var operatorLookup = {'÷': myDivide, 'x': myMultiply, '+': myAdd, '-': mySubtract};
  if(operatorLookup[element]){
    return operatorLookup[element](total, toFloat(computation[index+1]));
  }
 }

 $('.clear').click(function(){
    computation = [];
    input = '';
    displayNumber(0);
 });
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