
describe('On Screen Calculator', function(){
  it('add function adds two numbers together', function(){
    expect(Calculator.myAdd(1,2)).toBe(3);
  });

  it('add function adds two numbers together', function(){
    expect(Calculator.mySubtract(4,1)).toBe(3);
  });

  it('add function adds two numbers together', function(){
    expect(Calculator.myMultiply(3,2)).toBe(6);
  });

  it('add function adds two numbers together', function(){
    expect(Calculator.myDivide(4,2)).toBe(2);
  });

  it('toggleNegativeOrPositvie converts first number to negative number', function(){
    expect(Calculator.toggleNegativeOrPositive(1,2)).toBe(-1);
  });

  it('toggleNegativeOrPositvie converts first negative number to positive number', function(){
    expect(Calculator.toggleNegativeOrPositive(-1,2)).toBe(1);
  });
});

