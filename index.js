var hrtime = require('browser-process-hrtime');

var Governor = function(cb, duration){
  return new Promise(function(resolve, reject){
    var runs = 1;
    //Default duration of 30ms
    var duration = duration || 30;
    var loop = function(){
      var start = hrtime();
      var result = cb(runs);
      var hrtimeResult = hrtime(start);
      var fnDuration = (hrtimeResult[0]*1000)+(hrtimeResult[1]/1000000);
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

module.exports = Governor;
