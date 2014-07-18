$(document).ready(function(){
  var computation = [];
  document.getElementById('result').innerHTML = 0;

 $('.number').click(function (e) {
    var operatorLookup = {'±': toggleNegativeOrPositive, '%': percentage};
    var string = e.target.innerHTML;
   $('#positive-negative, #percent').click(function (z) {
      z.stopImmediatePropagation();
      var operator = z.target.innerHTML;
      var lastElement = computation.length - 1;
      number = operatorLookup[operator](toFloat(computation[lastElement]));
      computation[lastElement] = number.toString();
      console.log(computation);
      document.getElementById('result').innerHTML = number;
   });
    document.getElementById('result').innerHTML = string;
    computation.push(string);
 });


 $('#equal').click(function(){
    var operatorLookup = {'÷': myDivide, 'x': myMultiply, '+': myAdd, '-': mySubtract};
    var total = toFloat(computation[0]) || 0;
    computation.forEach(function(element, index, array){
      if (operatorLookup[element]){
        total = operatorLookup[element](total, toFloat(computation[index+1]));
      }
    });
    computation = [];
    document.getElementById('result').innerHTML = total;
 });

 $('.clear').click(function(){
    computation = [];
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