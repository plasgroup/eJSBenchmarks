// This source code was ported by Tatsuhiko Nagaya from the benchmark
// suite presented in https://doi.org/10.3390/electronics12010143
// (it is available from https://github.com/ignasp/ProgLangComp_onESP32).

/// <reference path="./SHA256.js" />
/// <reference path="./common-testing.js" />

// prettier-ignore
var testCases = [
  { length: 0, answer: [227, 176, 196, 66, 152, 252, 28, 20, 154, 251, 244, 200, 153, 111, 185, 36, 39, 174, 65, 228, 100, 155, 147, 76, 164, 149, 153, 27, 120, 82, 184, 85] },
  { length: 16, answer: [162, 253, 210, 95, 143, 206, 88, 246, 130, 154, 3, 237, 199, 62, 108, 215, 14, 197, 182, 12, 28, 248, 36, 82, 233, 204, 237, 71, 185, 84, 249, 28] },
  { length: 32, answer: [14, 135, 186, 83, 205, 78, 142, 205, 35, 117, 139, 230, 176, 141, 69, 241, 168, 13, 134, 164, 116, 112, 200, 204, 100, 147, 91, 114, 164, 7, 228, 70] },
  { length: 64, answer: [255, 85, 7, 5, 188, 20, 237, 82, 219, 203, 29, 246, 125, 240, 177, 58, 43, 189, 195, 22, 226, 128, 237, 18, 106, 80, 63, 172, 162, 164, 147, 62] },
  { length: 128, answer: [125, 250, 226, 195, 151, 174, 50, 247, 124, 90, 131, 113, 11, 183, 92, 61, 179, 31, 244, 93, 197, 142, 236, 211, 242, 117, 54, 71, 242, 62, 223, 35] },
  { length: 256, answer: [215, 130, 58, 181, 77, 32, 162, 82, 246, 138, 2, 5, 195, 19, 162, 174, 173, 235, 39, 93, 160, 71, 234, 32, 161, 54, 149, 202, 18, 175, 7, 252] },
  { length: 512, answer: [74, 243, 49, 63, 50, 242, 122, 226, 83, 154, 178, 133, 224, 200, 216, 155, 126, 126, 139, 251, 132, 185, 66, 134, 153, 43, 93, 203, 169, 195, 251, 9] },
  { length: 1024, answer: [126, 44, 189, 35, 138, 120, 99, 233, 229, 125, 114, 83, 92, 183, 16, 28, 206, 116, 2, 105, 14, 202, 214, 249, 14, 253, 51, 17, 97, 176, 202, 215] },
];

testCases.forEach(function (testCase) {
  /** @type {Ctx} */
  var ctx = {
    data: Array(64),
    datalen: 0,
    bitlen: 0,
    state: Array(8),
  };
  var rez = Array(BLOCK_SIZE);
  sha256_initialize(ctx);
  sha256_update(ctx, sample_data.slice(0, testCase.length));
  sha256_final(ctx, rez);

  assert(
    rez.every(function (v, i) {
      return v == testCase.answer[i];
    })
  );
});
