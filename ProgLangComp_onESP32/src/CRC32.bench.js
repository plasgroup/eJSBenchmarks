// This source code was ported by Tatsuhiko Nagaya from the benchmark
// suite presented in https://doi.org/10.3390/electronics12010143
// (it is available from https://github.com/ignasp/ProgLangComp_onESP32).
// The license of the original program is:
//   Copyright 2011 The Go Authors. All rights reserved.
//   Use of this source code is governed by a BSD-style
//   license that can be found in the LICENSE file.

/// <reference path="./CRC32.js" />
/// <reference path="./common-testing.js" />
/// <reference path="./common-benchmark.js" />

var table = Array(256);
crc32_make_table(0xedb88320, table);

var input = sample_data.slice(0, 1024);
var answer = 1837082096;

benchmark("CRC32", function () {
  for (let n = 0; n < 35000; n++) {
    var result = crc32_calc(input, table);
    assert(result == answer);
  }
});
