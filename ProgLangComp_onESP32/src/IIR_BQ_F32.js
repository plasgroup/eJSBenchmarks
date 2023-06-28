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

/**
 * @param {number[]} input
 * @param {number[]} output
 * @param {number} len
 * @param {number[]} coef
 * @param {number[]} w
 */
function dsps_biquad_f32_ansi(input, output, len, coef, w) {
  for (var i = 0; i < len; i++) {
    var d0 = input[i] - coef[3] * w[0] - coef[4] * w[1];
    output[i] = coef[0] * d0 + coef[1] * w[0] + coef[2] * w[1];
    w[1] = w[0];
    w[0] = d0;
  }
  return true;
}
