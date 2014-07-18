$(document).ready(function(){
  var computation = [];
  var input = '';
  document.getElementById('result').innerHTML = 0;

 $('.number').click(function (e) {
    var operatorLookup = {'±': toggleNegativeOrPositive, '%': percentage};
    var string = e.target.innerHTML;
    if (string.match(/\d/)){
      input += string;
    }else{
      computation.push(input);
      computation.push(string);
      input = '';
    }
   $('#positive-negative, #percent').click(function (z) {
      z.stopImmediatePropagation();
      var operator = z.target.innerHTML;
      var lastElement = computation.length - 1;
      input = operatorLookup[operator](toFloat(input));
      console.log(computation);
      document.getElementById('result').innerHTML = input;
   });
    document.getElementById('result').innerHTML = (input || computation[computation.length - 1]);
 });


 $('#equal').click(function(){
    computation.push(input);
    var operatorLookup = {'÷': myDivide, 'x': myMultiply, '+': myAdd, '-': mySubtract};
    var total = toFloat(computation[0]) || 0;
    computation.forEach(function(element, index, array){
      if (operatorLookup[element]){
        total = operatorLookup[element](total, toFloat(computation[index+1]));
      }
    });
    computation = [];
    input = '';
    document.getElementById('result').innerHTML = total;
 });

 $('.clear').click(function(){
    computation = [];
    input = '';
    document.getElementById('result').innerHTML = 0;
 });
});

function percentage(num1){
  return num1/100;
}

function toggleNegativeOrPositive(num1) {
    return -num1;
}
function toFloat(stringDigits) {
  return parseFloat(stringDigits);
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