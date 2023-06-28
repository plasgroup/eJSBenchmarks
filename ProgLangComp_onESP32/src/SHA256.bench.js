// This source code was ported by Tatsuhiko Nagaya from the benchmark
// suite presented in https://doi.org/10.3390/electronics12010143
// (it is available from https://github.com/ignasp/ProgLangComp_onESP32).

/// <reference path="./SHA256.js" />
/// <reference path="./common-testing.js" />
/// <reference path="./common-benchmark.js" />

// prettier-ignore
var answer = [126, 44, 189, 35, 138, 120, 99, 233, 229, 125, 114, 83, 92, 183, 16, 28, 206, 116, 2, 105, 14, 202, 214, 249, 14, 253, 51, 17, 97, 176, 202, 215];

benchmark("SHA256", function () {
  for (let n = 0; n < 1800; n++) {
    /** @type {Ctx} */
    var ctx = {
      data: Array(64),
      datalen: 0,
      bitlen: 0,
      state: Array(8),
    };
    var rez = Array(BLOCK_SIZE);
    sha256_initialize(ctx);
    sha256_update(ctx, sample_data.slice(0, 1024));
    sha256_final(ctx, rez);

    assert(
      rez.every(function (v, i) {
        return v == answer[i];
      })
    );
  }
});
