var hrtime = require('browser-process-hrtime');

var Governor = function(cb, duration){
  return new Promise(function(resolve, reject){
    var runs = 1;
    var loop = function(){
      var start = hrtime();
      var result = cb(runs);
      var fnDuration = hrtime(start);
      //Prevents divide by 0 error
      fnDuration = fnDuration ? fnDuration : 1;
      if (result){
        //The computation finished
        resolve(result);
      }
      else{
        runs = Math.ceil(runs * (duration/(fnDuration)));
        setTimeout(loop, 0);
      }
    };
    setTimeout(loop, 0);
  });
};
