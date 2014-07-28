
describe('On Screen Calculator', function(){

  it('adds two numbers', function(){
    var parameters = {computation: ['3', '+', '4'], input: '4'};

    expect(Calculator.calculate(parameters)).toBe(7);
  });

  it('subtract two numbers', function(){
    var parameters = {computation: ['9', '-', '4'], input: '4'};

    expect(Calculator.calculate(parameters)).toBe(5);
  });

  it('multiply\'s two numbers', function(){
    var parameters = {computation: ['3', 'x', '4'], input: '4'};

    expect(Calculator.calculate(parameters)).toBe(12);
  });

  it('divides two numbers', function(){
    var parameters = {computation: ['12', '÷', '4'], input: '4'};

    expect(Calculator.calculate(parameters)).toBe(3);
  });

  it('toggleNegativeOrPositvie converts number to negative number', function(){
    var parameters = {computation: ['3', '+', '4'], input: '4'};

    expect(App.percentOrPositiveNegative('±', parameters)).toBe(-4);
  });

  it('toggleNegativeOrPositvie converts negative number to positive number', function(){
    var parameters = {computation: ['3', '+'], input: '-4'};

    expect(App.percentOrPositiveNegative('±', parameters)).toBe(4);
  });

  it('toggleNegativeOrPositvie divides by 100 for percentage representation', function(){
    var parameters = {computation: ['3', '+'], input: '9876'};

    expect(App.percentOrPositiveNegative('%', parameters)).toBe(98.76);
  });
});

