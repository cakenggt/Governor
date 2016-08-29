var expect = require('chai').expect;
var governor = require('./index');

describe('count', function(){
  it('to 10000', function(){
    var num = 0;
    var count = function(steps){
      for (var i = 0; i < steps; i++){
        num++;
        if (num >= 10000){
          return num;
        }
      }
    };
    var prom = governor(count, 30)
    .then(function(result){
      //At this point the function should have completed
      expect(result).to.equal(10000);
    });
    //The function has not yet run here
    expect(num).to.equal(0);
    setTimeout(function(){
      //This will get executed sometime between start and end
      expect(num).to.be.gt(0);
    }, 1);
    return prom;
  });
});
