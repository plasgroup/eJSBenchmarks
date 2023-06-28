// This source code was ported by Tatsuhiko Nagaya from the benchmark
// suite presented in https://doi.org/10.3390/electronics12010143
// (it is available from https://github.com/ignasp/ProgLangComp_onESP32).
// The license of the original program is:
//   Copyright 2018-2019 Espressif Systems (Shanghai) PTE LTD
//  
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//  
//       http://www.apache.org/licenses/LICENSE-2.0
//  
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

/// <reference path="./FFT_I16.js" />
/// <reference path="./common-testing.js" />

// prettier-ignore
var testCases = [
  { length: 0, answer: [] },
  { length: 16, answer: [129, 130, -27, 34, -1, 2, 32, -18, 45, -28, -7, 31, 25, -24, -23, -20, 0, -6, 5, -16, -4, -38, -44, 7, 4, -2, 2, 14, 10, -29, -16, -18] },
  { length: 32, answer: [115, 131, 10, -5, 10, -8, 16, -12, 31, -14, -10, 7, 5, -18, -20, -21, -9, 3, -2, -2, 0, -33, -17, -12, -4, -3, -2, 8, -10, -8, -25, -3, 9, 1, 25, 23, 9, 4, -7, -25, -11, -9, 13, 3, 2, -6, 19, 17, 4, 1, -19, 3, 3, 15, 20, 16, -7, -16, 12, 4, -38, -37, -1, 9] },
  { length: 64, answer: [123, 130, 9, -15, 1, -9, 0, -17, 11, -8, -11, 1, 11, -16, -14, -18, -4, 4, -2, -2, 5, -14, -1, -11, 1, -1, -4, 0, -11, -5, -17, 8, 2, 4, 14, 26, 3, -2, 1, -2, 3, -19, -4, -4, -9, 8, 1, 7, -6, 0, -12, 2, -2, -10, 4, 10, 1, -17, 9, 0, -20, -22, -6, 4, 4, 8, 4, 10, 1, -1, 20, -19, -9, -26, -1, 12, 13, 8, -5, 11, -1, 10, -4, -3, -23, 3, -7, 19, 0, 0, 7, -1, 5, -13, -8, 4, -1, -4, -4, -6, 13, -8, -11, -7, 7, -1, 1, -8, -2, -9, 13, -17, 3, 2, -5, 9, 19, -6, 4, -9, 1, 11, 8, 3, -17, 13, 3, -7] },
  { length: 128, answer: [115, 127, 7, -9, -3, -10, 3, -10, 7, -8, -4, 4, 7, -12, -11, -2, -5, -1, -8, -11, 2, -9, 0, -10, 9, -3, -10, 6, -7, -4, -7, 4, 3, 10, 4, 15, -9, -7, 1, 0, 5, -9, -9, -2, -7, 0, -8, 6, -6, 4, -2, 1, -9, -8, 0, 7, -6, -15, -1, -7, -4, -12, -9, 2, 10, 0, 4, 0, -3, 0, 10, -8, -3, -9, -1, 7, 4, 8, -3, 14, -5, 11, 0, -6, -15, 5, 2, 4, 0, -7, 5, 9, 2, -3, 0, 2, 1, -9, -5, -9, 12, -7, -4, -9, 5, 3, 0, -10, 4, -7, 0, -2, -3, 1, 0, -7, 9, 1, 3, 5, -7, 9, 0, -1, -12, 7, -7, 0, -4, -12, -15, 3, 1, 0, 5, 3, 13, -8, 2, 9, -6, -4, -8, 2, 7, 2, 5, -11, 0, -8, -6, -5, -6, 8, 5, 0, 5, -2, -3, -1, -5, -1, 3, -6, 6, -9, -4, -9, -8, 2, 5, 2, 5, -10, 7, 0, 1, 3, -5, 1, 2, 1, 18, -1, -3, 4, 4, -3, -14, 6, 4, 6, 7, 0, -6, 6, -2, 3, -6, -11, -4, 1, 8, 8, -6, -15, -4, 8, 5, -3, 2, -8, 1, 9, 13, 8, 4, 8, -9, 5, -4, -13, 0, 8, 1, 2, -2, -2, 5, -4, 0, 1, -9, -4, 10, 5, 1, -4, -14, -17, 5, -4, 15, 1, -3, -6, 5, -2, 0, -2, 12, -9, -1, 7, -8, -4] },
  { length: 256, answer: [119, 126, 6, -8, 0, -9, 2, -8, 7, -6, -3, -2, -2, -3, -8, 3, -4, -1, -1, -13, 1, -7, -5, -1, 7, 2, -8, 5, -3, 0, -7, -2, 2, 7, 5, 7, 2, 0, -1, -1, 4, 0, -6, 2, -5, 3, -2, 6, -7, 5, 6, 2, 0, -8, 1, 9, -4, -5, 2, -8, -2, -6, -7, 0, 5, 0, -5, -2, 3, -5, 8, -6, 1, -4, 1, 8, 3, 12, 1, 8, -1, 6, 0, -4, -10, 1, 4, 6, 0, 1, 2, 2, 2, -1, -2, -2, -4, -8, -3, -11, 5, -7, -2, 1, 1, 0, 1, -2, 6, 0, -3, -1, 1, 2, 3, -3, 5, 2, -4, -2, 1, 9, -1, 1, -3, 3, -5, 4, -4, 1, -5, -3, 0, -3, 6, 5, 5, -2, 1, 7, -2, -3, -9, -3, 0, 2, 2, -9, 0, -5, -11, -3, -8, 10, 1, 1, -3, 2, 1, 0, -1, 3, 6, -2, 8, -5, -6, -3, -6, 5, 0, -2, 6, -6, 3, -3, -2, 3, 0, -1, 3, -1, 12, 1, -8, 3, -1, 1, -5, 2, -1, 5, 9, -3, 1, -1, -1, 2, 2, -7, -2, -5, 4, 6, 2, -7, -6, 6, -2, 2, -6, -4, -5, 3, 8, 3, -3, 8, -11, -4, -2, -10, 1, 7, -2, -4, -5, -8, -1, 4, 2, 1, -8, -11, 5, 6, -2, 1, -5, -7, 1, -1, 3, 1, 1, -1, 6, -2, 5, -1, 5, -4, -3, 5, -9, -4, 8, 3, -8, -6, -4, 0, 0, -4, 4, 1, 2, 0, -4, -10, -8, -1, 1, 3, 5, 6, -3, -5, -8, 0, 2, -2, -2, 3, -5, 5, 2, -2, 4, -3, 7, -1, 0, 7, 5, 0, -5, -3, -3, 4, -1, 0, 0, 4, 1, -2, -3, 1, 1, 4, -3, 3, -7, -2, 8, 3, -12, -7, 4, 3, -4, -5, -5, -9, 5, 1, 2, -7, -7, -2, 0, 3, 2, -8, 2, 1, 7, 5, 2, 4, -2, 3, -8, 2, -4, 0, 0, -2, -3, -6, 1, -3, -5, -2, -3, 3, 4, 0, -7, 0, -2, -4, -6, 3, -4, 2, 5, -10, 3, 3, -5, 11, 6, -5, 2, -9, -2, -3, 3, 1, -3, 8, -1, 0, -8, 3, -2, 10, -1, -6, 1, -2, -2, -11, 3, -1, 2, -2, -2, -6, 0, -7, 2, 1, -8, -5, -6, -4, 5, -3, -6, -1, -5, -7, -3, 2, -2, 6, -3, 2, -2, 8, 2, -3, -6, 1, 6, -3, 0, -1, 5, -3, 2, -6, 3, 5, 5, 3, -8, -3, -2, -12, 3, -2, -7, 0, 5, -5, 0, 1, -1, 2, 7, -6, -1, 5, 8, 0, 4, -3, -4, 2, 3, -6, 0, -5, -3, -10, 4, -11, 1, -5, 3, -8, 8, -4, -4, -5, 1, 0, 4, -2, 4, -4, -5, -6, 2, 4, 9, -1, -3, -4, -4, -4, -10, 3, 1, -4, -4, -7, 4, 5, 2, -7, -1, -1, 0, -6, -2, 0, 2, -3] },
  { length: 512, answer: [121, 126, 3, -7, 2, -4, 1, -10, 5, -4, -2, -4, 2, 2, 0, 3, -1, 0, 3, -7, -1, -7, -2, -2, 3, 1, -3, 3, -2, 0, -3, -3, -3, 2, 6, 6, 0, 0, -3, 2, 1, 1, 0, 0, -8, 3, -1, 3, 3, 3, 3, -1, -4, -1, -2, 4, -2, -5, -2, -1, 2, -2, -5, -1, 5, -2, -5, 1, 6, -3, 5, -1, 2, -1, 3, 1, 3, 8, 1, 5, -2, 0, -2, 1, -7, -1, 1, 1, 0, -1, 0, 6, 3, 3, -4, -3, -2, -3, -6, -3, 4, -5, -4, 1, 1, -5, 4, 1, 0, 0, 4, 1, 2, 0, 4, -3, 2, 0, -3, -3, 0, 5, 4, -1, -1, 5, 0, 2, -3, 1, -4, -1, 3, 0, 2, 1, 1, 1, -1, 5, 2, 1, -5, -2, -2, 2, 2, -4, -2, -1, -5, -8, -6, 5, 1, -3, -5, 1, -1, -1, -3, 3, 3, 3, 1, -1, 0, -5, -5, 4, 5, -3, 0, -1, -1, -3, -6, 3, -4, 2, 1, -3, 3, 0, -2, -2, -4, 2, -4, -1, -2, 0, 4, 0, -2, -3, 0, 2, 0, -1, -2, -2, 5, 4, 0, -6, -1, 2, -2, 3, 0, -3, -3, 2, 4, -1, -1, 2, -9, 1, -1, -5, 4, 5, 1, -2, -4, -2, -2, 7, -2, -1, -4, -8, -1, 3, -2, 3, -1, -6, -1, 1, -4, -1, 1, -1, 5, -5, 0, -3, 3, -3, -1, 3, -1, -4, 5, 1, -6, -4, -4, 2, 0, -4, 4, 3, 2, 4, -2, -7, -6, -2, 1, 4, 3, 3, -1, 3, -9, -2, -1, -3, -4, 4, -3, 1, 4, -4, -1, -3, 4, -6, -3, 5, 1, 0, -2, 0, -3, 1, -2, 1, 1, 3, -3, -4, -5, 2, 2, 5, -2, -1, -4, -1, 8, -3, -9, -6, 1, 4, -4, 0, -2, 0, 2, -1, 6, -5, -9, -3, -2, 1, -3, -6, -1, -3, 3, 2, -1, 2, -5, 2, -3, 2, -5, 1, 0, -2, 1, 0, -1, 0, -2, 3, -4, 3, 1, -1, -8, -3, -7, -1, -3, 0, -5, -1, 2, -6, 2, 3, 1, 8, 5, -3, 0, -4, -3, -2, 2, -1, -5, 2, -6, 1, -4, 2, -5, 4, 1, -1, -2, -3, -4, -4, -3, 0, -1, 0, -4, -5, 2, -1, 2, 5, -5, -2, -1, -1, 3, -1, -2, 2, -5, -5, -4, 0, 2, 4, -4, 1, -2, 6, -1, 0, -3, 0, -2, -3, -1, -1, 0, -2, -1, -3, 0, 2, 1, -2, -7, 1, -2, -7, 0, -2, -7, -2, 7, -6, 1, 5, 0, 2, 1, -4, 2, -1, 7, 3, 2, -4, -1, -1, -4, -1, 1, -3, 1, -5, -1, -8, 3, 0, 0, -5, 5, -2, 1, 1, 3, 3, 5, -2, 6, -2, -1, -5, 2, 3, 2, 0, -5, -1, -5, -4, -5, -1, -2, 0, 1, -6, 5, 0, 2, -6, 4, -2, 0, -5, 1, 4, 0, -2, 0, 3, 0, -3, 0, 1, 0, 0, 1, -2, 1, 2, -1, 0, -1, 2, 0, 3, -7, 3, 6, -3, -2, -1, -2, -3, 2, 3, -1, -3, -1, 2, 2, -1, -2, 3, -1, 1, -2, -1, -1, -5, 0, 2, 1, 0, 1, -2, 1, 10, -1, 1, -5, -4, 1, -2, 0, -3, -11, -2, -6, 0, -1, 3, 6, 2, 4, -2, -4, 5, -2, -6, -3, 0, 1, 1, 3, 3, -1, 1, 1, 2, -8, -1, -1, 4, 2, -4, 1, -2, -2, -1, 2, -6, 4, -1, 1, -2, -3, -3, 0, -1, -4, -2, 5, 4, -3, 0, -3, -6, 1, 2, 3, 1, -4, -3, 3, -5, 3, -1, 3, 1, -1, 2, -4, 2, 4, 4, 1, -2, -5, 2, 1, 1, 3, -1, 2, -2, -2, 1, -2, 4, -2, 4, 1, -2, -2, -1, -3, -4, 4, 0, 3, -1, 5, -3, 5, -4, 0, 1, 1, -7, -1, -2, -3, -5, 1, 5, -3, -2, 2, 8, -3, -4, 1, -2, 3, 1, -7, -2, -4, 1, 5, -7, 6, 3, -2, -2, -2, 1, 3, -4, 0, -3, -1, -2, 1, 5, -8, -3, -1, -1, 1, -1, -2, -3, 6, 6, 1, -2, 0, 1, 3, 5, 5, -2, 7, 0, -1, 4, 0, -5, 3, -1, -1, 0, -3, -3, 0, -5, -1, -5, -3, 6, 3, -3, -1, -4, -5, -3, 3, 1, 0, -7, -2, -4, 1, -5, 3, -8, -1, -3, 5, 0, 2, 5, 2, -3, -1, 1, 1, -2, -2, 1, 2, 2, -6, 2, 0, -1, 0, -1, 0, 2, 3, 0, -3, 1, -3, -6, -3, -6, -1, -2, 4, 0, 1, 3, 1, -6, 7, 0, 3, 2, -2, -7, -5, -1, 2, -1, 2, 2, 2, 2, 3, 3, -2, 0, -5, 1, 3, 4, -3, -3, 2, 1, -6, 2, -4, -2, 1, 4, -7, 4, 0, 0, 0, 1, 1, -3, -1, -4, -1, -2, 1, -4, 3, -3, -1, -7, 0, -1, -1, 4, -3, -4, 2, -1, 0, -2, -1, -5, -3, 0, 3, -3, 2, -4, -1, -1, 0, -5, 0, 4, 3, -5, -4, -6, 4, 2, -2, 6, -1, -3, -5, -3, 1, 1, 2, 1, 3, -3, 1, -7, 2, 3, 6, -2, -4, 1, 5, -2, -3, -3, -8, -6, -5, 0, -4, 1, -9, 3, -3, 0, -5, -1, -5, 4, -2, -4, 2, 3, 4, -4, 2, 0, 6, -2, 5, -1, 2, -1, -3, -1, -3, 3, 2, -7, -1, 1, 2, -10, -2, -2, -2, -5, 1, -3, -2, -3, -5, 1, -3, -6, 1, -1, 1, -2, -6, 3, -2, 0, -1, -1, 2, 2, -2, -1, -2, -7, 2, 3, -4, -5, -2, -5, -7, 5, 1, -1, -6, 2, 0, -5, 0, 1, -4, 0, -3, 1, -1, 0, 0, -2, 1, 1, -1, -5, -3, -2, -2, -6, -1, -5, 1, 0, 0, -1, -2, 2, 6, -4, -2, -7, 6, 0, -2, 0, -1, 3, 0, -1] },
  { length: 1024, answer: [123, 125, 3, -4, 1, -3, -2, -3, 2, -4, -1, -3, 2, 1, 0, 1, 0, 0, -1, -4, -1, -3, 0, 1, 0, 1, -1, 4, -4, 0, -2, -4, 0, 1, 3, 5, -1, -1, 0, 1, 1, 4, 2, -3, -3, 0, -2, 1, 3, 0, 0, -1, -2, -2, 0, 0, -1, -2, 2, 1, 1, -3, 0, 1, -1, -2, -2, -1, 3, -1, 3, 0, 2, -1, -1, 1, 1, 0, 3, 1, -1, 1, 0, -2, -3, -2, -1, 0, -1, -1, -1, 4, 4, 1, -3, 1, 0, 0, -3, -2, 4, -2, -3, -1, 0, -3, 3, 1, 1, 1, -1, 1, 1, 0, 2, -3, -1, 0, 2, -1, -2, 3, 0, -3, -2, 2, -3, 0, -4, 3, -2, -1, 2, 1, 0, 1, 1, 0, 0, 2, -1, 2, -1, 0, 1, 1, 1, -2, 1, 0, -5, -6, -2, 2, 0, -3, -3, -2, 0, 0, -3, 2, 4, 2, -2, -2, 2, -5, -5, -3, 2, -2, -2, -2, 0, 0, -4, 1, 0, 1, 0, -2, 1, -1, -1, -2, -2, -1, -4, 0, -2, -2, 1, 4, 2, -6, 0, 0, -1, -2, -3, -1, 6, 1, -1, -1, -5, 1, -2, 3, -2, -1, -1, 0, 0, 1, 1, -3, -3, -2, 2, -2, 4, 3, 0, -1, -1, -1, 1, 1, -1, -2, -4, -7, -3, 3, -1, 2, 0, -5, 2, -2, -2, 0, 0, 0, 1, -4, 0, -1, 1, -3, 0, 2, -1, -5, -2, 0, -5, -1, -6, -3, -2, -3, 0, 3, 1, 4, -1, -2, -3, -2, 0, 1, 2, 2, 0, 5, -4, -1, -2, -4, -1, -1, 0, -4, -2, -1, -2, -2, 0, -5, -1, 2, 1, 0, -3, 0, -3, 0, -1, 1, 3, 2, -1, 0, 0, -2, 2, 3, 0, -1, -5, -3, 4, -7, -2, -5, 2, 2, -2, 1, -1, 2, 0, -1, 2, -3, -5, -1, -3, 1, -2, -3, -2, -2, 0, 3, -1, -2, -2, 1, -3, 1, -3, -1, -1, -2, 2, 1, 0, -1, 0, 3, -2, 2, -1, -1, -6, 1, -4, -1, -1, 1, -1, 0, -1, -5, 0, 2, 0, 5, 4, 0, -1, -2, 0, 0, -1, -1, -3, 1, -1, 1, -3, 0, -4, -2, -1, 1, -3, -1, -2, -4, -1, 1, -2, 2, -1, -3, 1, -1, 1, 1, -1, -4, -2, -2, 1, 1, -1, 2, -3, -2, -2, -1, 1, 6, -1, -2, 3, 5, 0, 0, -3, 1, 1, 0, 4, 0, -2, 0, 2, -4, 2, -4, 1, -1, -3, -1, 0, -3, 1, 0, 0, -1, 5, -3, 4, 3, 2, 2, 0, 0, 0, -3, 6, 1, 1, -4, -3, -2, -2, -3, -1, -3, -2, -3, -2, -4, 2, 2, -1, -2, 2, -1, -2, -1, 4, 2, 2, 0, 3, -3, 0, -2, 0, 0, 1, -2, -1, 1, -4, -2, -2, 1, -1, 0, 0, -4, 2, 1, 2, -3, 2, -3, -1, -3, 2, 5, 1, -2, 0, 0, 0, 1, -3, 1, 1, -2, -2, 0, 1, 3, 3, -1, 0, 0, 0, 0, -3, 0, 3, -2, -2, 0, -1, -1, 2, 0, 0, -5, 2, 3, 0, 1, -4, 1, -2, 2, 3, 1, 0, -2, 1, 3, 4, -2, 1, 1, -2, 3, -1, -3, 0, -1, 1, -2, -2, 0, -8, -2, -3, 1, -1, 3, 2, 0, 4, 0, -2, 1, -3, -1, -1, -4, 2, -3, 2, 0, -1, -2, 1, -2, -3, -2, -1, 0, -1, -6, -1, -3, -2, -1, 1, -5, 2, 1, -2, 1, -3, -1, 1, -1, -3, -5, 4, -2, -1, 0, -1, -3, 2, 1, 1, -1, -1, -3, 1, -1, 0, 0, 1, 1, -1, 3, -1, 2, 3, 2, 0, -1, 0, 2, 0, 0, 0, 3, 2, -1, 0, -1, 0, 2, 0, 2, 2, -2, -3, 0, -1, -2, -1, 0, 3, 0, 4, 1, 3, -4, -1, -1, 2, -7, 0, -4, -1, -2, -1, 0, -3, 0, 2, 5, -2, -2, -1, -4, 3, 1, -4, -2, -4, -4, 4, -3, 2, -1, 1, -3, 0, -4, 1, -4, -1, 0, -1, -1, 1, 2, -4, -2, 2, -2, 1, 0, -3, -2, 0, 4, 0, 0, -1, 0, 2, 0, 5, -2, 4, 0, -2, 2, 0, -3, -1, 0, -2, 0, 1, -5, -1, -3, -1, 0, -2, 1, 1, -4, -1, -5, -2, 0, 0, 1, -2, -7, -2, -4, -1, -2, 2, -3, -1, -2, 0, 0, 3, 1, 3, -2, 2, 0, -2, 3, 1, 2, 2, -1, -3, 3, 2, 0, -1, 0, -2, -3, 0, -2, -4, -2, -3, -2, -2, -3, 0, -1, -2, -1, 0, 1, 0, -2, 4, 2, 3, 0, -1, -3, -4, -1, 0, -4, 2, 0, 0, 0, 1, 4, -1, -2, -2, -2, 2, -2, -2, -2, 0, -1, -2, 1, -4, 0, 3, 4, -1, 3, -2, -2, 0, 0, 2, -4, -2, -2, 1, 0, 3, -3, 2, -4, -2, -2, -4, -3, -4, 0, -2, -1, -4, 1, -2, 2, -2, -3, -4, 3, 4, -3, 1, -4, 1, 1, 1, -1, -2, 3, 0, 0, 0, -2, 1, 1, 0, 6, -1, -1, -3, -1, 2, 0, -1, -2, 1, -1, -1, -3, 3, 0, 3, -2, -3, 0, 4, -4, -3, -4, -4, -5, -4, 2, -1, 1, -6, 1, -4, 1, -4, -1, -1, 0, -2, 3, -2, 2, 2, -3, 0, 1, 3, -1, -2, -1, 2, -1, -2, -1, 1, 1, -4, -2, -3, 1, 1, -4, -2, -1, -1, -3, 2, -4, -1, -4, -2, 2, 0, -3, -1, -3, 1, 0, -4, 2, 1, 2, -3, -5, 1, 0, 0, -1, -3, -1, 2, 2, -3, -2, -1, 2, -6, 0, -1, -3, -1, -1, -1, -2, -2, 2, -3, 2, -3, 2, 0, 3, 3, 1, -1, 0, -3, 0, -1, -6, -5, -4, 3, -1, 1, 1, 1, -2, -2, -3, 4, -4, 2, -1, 3, -1, -2, -2, -1, 2, -2, -2, -2, 2, 1, -1, -2, 1, -5, -3, 1, -1, 1, 0, 0, -5, -3, -1, -6, -1, -6, -3, -3, -1, -3, 0, 3, -3, -4, 1, -4, -2, 0, 0, 2, 3, -1, 2, 1, -3, 2, -3, -1, -1, 1, 1, 0, 0, 3, 0, -3, 0, -4, -4, 2, -4, 2, 0, -1, 1, -2, 0, 0, -4, -3, 2, -1, -2, 3, 1, -5, -4, 2, -2, -2, -3, -2, -1, 2, -2, 0, 3, -3, 2, 0, -2, -4, 2, -2, 1, -2, 0, 1, -1, 1, 0, -3, 0, -1, 1, 0, -1, -3, -1, 0, -1, -4, -1, -2, -3, 1, -1, -1, -4, -3, 1, 0, -2, 3, 0, 1, 5, 1, 0, 2, 0, 1, -2, -2, -2, -2, -1, -3, -1, -3, -2, 3, 0, 1, -2, 0, -1, -3, -3, -3, 0, 1, 0, -2, -1, -1, -2, -4, 3, 3, 3, 2, 1, 3, 1, -2, 0, 1, -1, -2, -1, 3, -6, -4, 1, 5, 0, -1, -2, 2, -4, -1, 2, 0, 0, 1, 0, -2, 0, 5, -3, -3, 3, 2, -2, -5, -1, 0, 2, -1, -3, 2, 3, -1, -2, -1, -6, -2, -3, 3, 0, -4, -2, -1, 1, 1, 0, -4, -1, -1, 1, -1, -5, 3, 4, 0, 2, -3, 1, 0, 2, -3, 0, -3, 0, 5, 1, 4, 1, -4, 0, 0, -2, -1, -1, 0, -2, 1, 1, 0, 3, -2, -1, 1, -2, 1, 2, 2, -2, 1, 3, -4, -1, 2, -4, -5, -3, 5, 0, 0, -3, -3, -5, 0, -3, -3, -1, 0, 2, -3, -1, -1, 2, -4, -3, 0, 4, 2, -3, 4, 1, 2, 5, -4, -3, 1, 0, -1, -2, 1, -1, 2, -1, -2, -1, -1, 2, -1, 1, 0, 2, -2, 0, 1, 0, 0, -1, -2, 2, 0, -2, 0, -2, -4, 0, 1, 1, 0, -2, -3, -4, -3, -2, -5, -5, -1, 2, 2, 1, 1, -2, 0, 0, 0, -1, 5, 1, -1, 4, -2, 1, 2, 0, 0, 2, 2, 0, 0, 1, 0, 1, 0, 0, -2, -2, 0, 0, 3, 1, -2, 3, 1, 4, 2, -6, -1, -1, 2, -2, -1, -1, 1, -2, -2, 1, -1, 0, 1, 3, 1, 4, -2, 1, 2, 2, -3, -3, -3, -1, -2, -1, 0, 0, -2, -2, -3, 1, -2, -3, 1, -1, -1, 1, -5, -3, 3, -1, -2, 3, -1, 1, 1, 2, 0, 0, 2, 5, 1, 2, 1, -2, -2, -2, 1, 5, 0, 2, 3, 0, 0, 1, 6, 2, 1, 0, 1, 0, -2, -1, 1, 0, -3, 5, -2, -1, 0, -1, 1, 2, -5, -1, 0, -3, 2, -2, 4, 0, -2, -3, 3, 0, 2, -2, -7, -3, -3, -1, -5, -5, 1, -1, 1, -2, 1, -5, 1, -2, -2, -4, 2, -2, -2, 1, 4, -1, 0, -1, -1, 3, 0, -2, -3, 3, 0, 0, -4, -1, -2, -3, 1, -4, -2, 1, -1, -1, -1, 0, -1, 2, 2, 5, -2, -3, -3, -1, 1, 0, -2, -2, -1, 0, 3, 0, 0, -2, -3, 0, -1, 3, -2, -4, -2, -3, -1, 0, -3, -2, -3, -1, 0, 6, 0, -1, 1, 2, -3, -4, -1, 2, -4, 1, -1, 2, 1, 0, -2, -1, 6, -4, -2, -6, -4, 2, 0, -1, -5, -1, -4, 4, -1, -4, -2, 0, 2, -6, -1, -2, 0, 1, -3, -1, 3, -3, 3, 2, 5, -3, 3, 2, 2, 3, -1, 3, 1, -1, -1, -1, -1, -3, 0, 1, 0, -3, -3, -2, -3, -3, -2, -2, -2, 1, 5, -1, 3, -3, -1, -1, -1, -2, 2, -1, -2, 0, -2, 2, 1, -1, 2, -1, 1, -4, -1, 2, 0, 1, 1, -4, -3, -1, -5, 3, 0, -1, -2, -2, -1, -4, 2, 0, 2, 1, 1, 0, 0, 1, -4, -1, -4, -3, -4, -2, 2, 2, -3, 0, 2, -4, 1, -2, 0, 1, -1, -1, -2, -4, 2, -3, 0, 0, 4, -1, 0, -4, 3, -1, -2, -2, -3, 2, 4, 0, -3, -4, 4, -5, 4, 1, 2, -2, 1, 0, -4, -4, -1, 1, 4, 0, -4, 2, -1, 1, 1, 1, -4, -1, 0, -5, -1, 0, -1, 0, 5, 0, -1, -3, 4, -1, 2, 1, -4, 1, -2, -4, -1, 0, 0, 4, 1, -1, -4, 1, 1, 1, 2, -4, 1, -1, -1, -1, 0, -3, 1, -1, -1, 1, -1, -3, -5, 2, 2, -1, 0, -4, 1, 1, 1, 0, -2, -1, -3, -2, 0, 4, 0, -3, -4, 1, -2, 2, -1, -3, 2, -4, 0, -1, 1, -5, -3, 2, -2, -1, 0, 2, -1, -4, 0, -2, -4, -1, -3, -4, 2, 0, -4, -1, -5, 0, 3, 1, 1, -1, 3, -1, -3, -2, 1, -2, 2, 3, 5, 1, -2, 0, 0, -3, -1, 3, -3, 1, 2, 2, -2, 2, -2, -3, -2, -3, 0, 1, -2, 0, 1, 1, -2, 4, 1, -2, -2, 1, 0, -3, 3, 0, -4, 0, -4, -8, -1, -3, -3, 0, -3, -1, -1, -2, -3, -4, -2, 2, -3, 1, 0, 1, -4, -3, -2, 0, -2, -5, 2, 0, -1, 0, 0, 2, 2, 1, 3, -1, -2, 0, -4, -2, 1, 5, -1, -4, -1, 0, 1, -1, 0, -2, 0, 6, -7, 1, -4, 2, 1, 1, -3, -3, -2, -1, 0, 3, -5, 0, -1, -1, -3, -2, 2, -2, 0, -4, 2, -7, 1, -1, -1, -1, 1, 2, -3, -3, 1, -3, -4, 1, -2, 1, 0, 3, 2, 2, 3, -2, -3, 4, -3, 6, -1, 0, -4, 1, 0, 0, -3, 6, 1, -3, 1, -5, 2, 0, -6, -1, -3, -5, -2, 1, -8, 0, 0, 1, 1, -4, -2, 0, -1, -2, 0, -5, -3, -2, 0, -4, -5, -1, -1, 4, 2, -2, -1, -3, 4, 2, -2, -4, -5, 3, -3, 1, 1, 2, 3, -1, -1, -4, -7, 1, -1, -1, 5, 1, 2, -2, -1, -2] },
];

testCases.forEach(function (testCase) {
  var inout_data = sample_data.slice(0, testCase.length * 2);
  dsps_fft2r_sc16_ansi_(inout_data, FFT_TABLE_I16);

  assert(
    inout_data.every(function (v, i) {
      return Math.abs(v - testCase.answer[i]) <= 2;
    })
  );
});
