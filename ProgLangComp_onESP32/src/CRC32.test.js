// This source code was ported by Tatsuhiko Nagaya from the benchmark
// suite presented in https://doi.org/10.3390/electronics12010143
// (it is available from https://github.com/ignasp/ProgLangComp_onESP32).
// The license of the original program is:
//   Copyright 2011 The Go Authors. All rights reserved.
//   Use of this source code is governed by a BSD-style
//   license that can be found in the LICENSE file.

/// <reference path="./CRC32.js" />
/// <reference path="./common-testing.js" />

var table = Array(256);
crc32_make_table(0xedb88320, table);

var testCases = [
  { length: 0, answer: 0 },
  { length: 16, answer: 2632431868 },
  { length: 32, answer: 4166324082 },
  { length: 64, answer: 2586358605 },
  { length: 128, answer: 1459376770 },
  { length: 256, answer: 1664025310 },
  { length: 512, answer: 2210411609 },
  { length: 1024, answer: 1837082096 },
];

testCases.forEach(function (testCase) {
  var bytes = sample_data.slice(0, testCase.length);
  var result = crc32_calc(bytes, table);

  assert(result == testCase.answer);
});
