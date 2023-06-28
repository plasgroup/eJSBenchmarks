// This source code was ported by Tatsuhiko Nagaya from the benchmark
// suite presented in https://doi.org/10.3390/electronics12010143
// (it is available from https://github.com/ignasp/ProgLangComp_onESP32).
// The license of the original program is:
//   Copyright 2011 The Go Authors. All rights reserved.
//   Use of this source code is governed by a BSD-style
//   license that can be found in the LICENSE file.

/**
 * @param {number} poly
 * @param {number[]} table
 */
function crc32_make_table(poly, table) {
  for (var i = 0; i < 256; i++) {
    var crc = 0;
    var byte = i;
    for (var j = 0; j < 8; j++) {
      if ((byte ^ crc) & 1) {
        crc = ((crc >>> 1) ^ poly) >>> 0;
      } else {
        crc = crc >>> 1;
      }
      byte = byte >>> 1;
    }
    table[i] = crc;
  }
}

/**
 * @param {number[]} bytes
 * @param {number[]} table
 */
function crc32_calc(bytes, table) {
  var crc = 0xffffffff;
  var length = bytes.length;
  for (var i = 0; i < length; i++) {
    crc = (table[(bytes[i] ^ crc) & 0x000000ff] ^ (crc >>> 8)) >>> 0;
  }
  return ((-1 - crc) & 0xffffffff) >>> 0;
}
