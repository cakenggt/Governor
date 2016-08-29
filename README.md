# Guv'ner

Guv'ner is a way to make a long-running process execute without blocking JavaScript's single thread.

# About

JavaScript has only one thread, and is thus not optimized for long-running computations. Usually developers put their long-running functions into a `window.requestAnimationFrame` or `setTimeout` to free up the UI in browsers or the server code in a Node backend. However, it is difficult to determine the correct amount of work to do in each function call, as machines vary wildly on processing power.

Guv'ner introduces the ability to self-regulate the amount of work done by this long-running function, much like a [Centrifugal Governor](https://en.wikipedia.org/wiki/Centrifugal_governor) on an engine. When given a function with takes in a specified number of "work steps" to execute, Guv'ner will adjust the number of work steps executed to stay within the time parameter specified by the caller. This adjustment is made anew each execution, keeping the time of execution as close as possible to the desired amount.

# Specification

## `guvner(fn[, duration]) -> Promise`

The exported guvner function takes in a function to execute and an optional duration in milliseconds. The function must take in a single `number` parameter which correlates linearly with how much work the function will do before it exits.

The function must return a truthy value when it is finished with it's work, which will tell the guvner function to stop running and resolve the promise. This truthy value will be the resolved value of the promise which is returned from calling `guvner`.

The function provided to `guvner` should use closure to keep track of it's state.

# Example
```
var guvner = require('guvner');

var num = 0;
var count = function(steps){
  for (var i = 0; i < steps; i++){
    num++;
    if (num >= 10000){
      return num;
    }
  }
};
guvner(count, 30)
.then(function(result){
  console.log(result);
});
```
