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
 * @typedef {Object} fir_f32_t Data struct of f32 fir filter
 * @property {number[]} coeffs (float[]) Pointer to the coefficient buffer.
 * @property {number[]} delay (float[]) Pointer to the delay line buffer.
 * @property {number} N (int) FIR filter coefficients amount.
 * @property {number} pos (int) Position in delay line.
 * @property {number} decim (int) Decimation factor.
 * @property {number} d_pos (int) Actual decimation counter.
 */

/**
 * @param {fir_f32_t} fir
 * @param {number[]} coeffs
 * @param {number[]} delay
 */
function dsps_fir_init_f32(fir, coeffs, delay) {
  fir.coeffs = coeffs;
  fir.delay = delay;
  fir.N = coeffs.length;
  fir.pos = 0;

  for (var i = 0; i < fir.N; i++) {
    fir.delay[i] = 0;
  }
  return true;
}

/**
 * @param {fir_f32_t} fir
 * @param {number[]} input
 * @param {number[]} output
 */
function dsps_fir_f32_ansi(fir, input, output) {
  for (var i = 0; i < input.length; i++) {
    var acc = 0;
    var coeff_pos = fir.N - 1;
    fir.delay[fir.pos] = input[i];
    fir.pos++;
    if (fir.pos >= fir.N) {
      fir.pos = 0;
    }
    for (var n = fir.pos; n < fir.N; n++) {
      acc += fir.coeffs[coeff_pos--] * fir.delay[n];
    }
    for (var n = 0; n < fir.pos; n++) {
      acc += fir.coeffs[coeff_pos--] * fir.delay[n];
    }
    output[i] = acc;
  }
  return true;
}
