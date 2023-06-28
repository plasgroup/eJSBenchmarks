// Copyright 2022 by Tatsuhiko Nagaya. All rights reserved.
// The use of this source code is governed by the MIT license.

// Common library for benchmarking

// Node.js & browser compatibility
if (String.prototype.matchAll) {
  globalThis.print = console.log;
}
var performance = performance || {};
performance.now = performance.now || Date.now;

// Utils
var BENCHMARK_ITERATION_COUNT = 5;

/**
 * @param {string} name
 * @param {() => void} callback
 */
function benchmark(name, callback) {
  var totalTime = 0;
  /** @type {number[]} */
  var iterations = [];

  for (let i = 0; i < BENCHMARK_ITERATION_COUNT; i++) {
    var startTime = performance.now() * 1000;
    callback();
    var elapsedTime = performance.now() * 1000 - startTime;
    totalTime += elapsedTime;
    iterations.push(elapsedTime);
  }

  print(
    'BENCHMARK{"total":' +
      totalTime +
      ',"iterationCount":' +
      BENCHMARK_ITERATION_COUNT +
      ',"iterations":[' +
      iterations +
      "]}BENCHMARK"
  );
}
