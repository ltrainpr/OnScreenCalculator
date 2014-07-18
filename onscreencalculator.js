$(document).ready(function(){
  var computation = '';
 $('.number').click(function (e) {
    computation += e.target.innerHTML;
 });

 $('#equal').click(function(){
    var operatorLookup = {'÷': myDivide, 'x': myMultiply, '+': myAdd, '-': mySubtract};
    var stringNumArray = computation.match(/\d+/gi);
    var operatorArray = computation.match(/\D/gi);
    var sum = parseInt(stringNumArray[0], 10);
    for(var i = 0; i < operatorArray.length; i++){
      sum = operatorLookup[operatorArray[i]](sum, parseInt(stringNumArray[i+1], 10));
    }
    computation = '';
    return sum;
 });

 $('.clear').click(function(){
    computation = '';
 });
});

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