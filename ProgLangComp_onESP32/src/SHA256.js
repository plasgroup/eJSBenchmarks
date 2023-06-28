// This source code was ported by Tatsuhiko Nagaya from the benchmark
// suite presented in https://doi.org/10.3390/electronics12010143
// (it is available from https://github.com/ignasp/ProgLangComp_onESP32).

var BLOCK_SIZE = 32;

// functions
/** @returns {nubmer} */
function ROTLEFT(a, b) {
  return ((a << b) | (a >>> (32 - b))) >>> 0;
}
/** @returns {nubmer} */
function ROTRIGHT(a, b) {
  return ((a >>> b) | (a << (32 - b))) >>> 0;
}
/** @returns {nubmer} */
function CH(x, y, z) {
  return ((x & y) ^ (~x & z)) >>> 0;
}
/** @returns {nubmer} */
function MAJ(x, y, z) {
  return ((x & y) ^ (x & z) ^ (y & z)) >>> 0;
}
/** @returns {nubmer} */
function EP0(x) {
  return (ROTRIGHT(x, 2) ^ ROTRIGHT(x, 13) ^ ROTRIGHT(x, 22)) >>> 0;
}
/** @returns {nubmer} */
function EP1(x) {
  return (ROTRIGHT(x, 6) ^ ROTRIGHT(x, 11) ^ ROTRIGHT(x, 25)) >>> 0;
}
/** @returns {nubmer} */
function SIG0(x) {
  return (ROTRIGHT(x, 7) ^ ROTRIGHT(x, 18) ^ (x >>> 3)) >>> 0;
}
/** @returns {nubmer} */
function SIG1(x) {
  return (ROTRIGHT(x, 17) ^ ROTRIGHT(x, 19) ^ (x >>> 10)) >>> 0;
}

/**
 * @param {number[]} buf
 * @param {number} ch
 * @param {number} n
 */
function memset(buf, ch, n) {
  for (var i = 0; i < n; i++) {
    buf[i] = ch;
  }
}

var k = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1,
  0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
  0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
  0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
  0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
  0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b,
  0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
  0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
  0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
];

/**
 * @typedef {Object} Ctx
 * @property {number[]} data
 * @property {number} datalen
 * @property {number} bitlen
 * @property {number[]} state
 */

/**
 * @param {Ctx} ctx
 * @param {number[]} data
 */
function sha256_transform(ctx, data) {
  /** @type {number[]} */
  var m = Array(64);

  for (var i = 0, j = 0; i < 16; ++i, j += 4) {
    m[i] =
      ((data[j] << 24) |
        (data[j + 1] << 16) |
        (data[j + 2] << 8) |
        data[j + 3]) >>>
      0;
  }
  for (; i < 64; ++i) {
    m[i] = SIG1(m[i - 2]) + m[i - 7] + SIG0(m[i - 15]) + m[i - 16];
  }

  var a = ctx.state[0];
  var b = ctx.state[1];
  var c = ctx.state[2];
  var d = ctx.state[3];
  var e = ctx.state[4];
  var f = ctx.state[5];
  var g = ctx.state[6];
  var h = ctx.state[7];

  for (i = 0; i < 64; ++i) {
    var t1 = h + EP1(e) + CH(e, f, g) + k[i] + m[i];
    var t2 = EP0(a) + MAJ(a, b, c);
    h = g;
    g = f;
    f = e;
    e = d + t1;
    d = c;
    c = b;
    b = a;
    a = t1 + t2;
  }

  ctx.state[0] = (ctx.state[0] + a) >>> 0;
  ctx.state[1] = (ctx.state[1] + b) >>> 0;
  ctx.state[2] = (ctx.state[2] + c) >>> 0;
  ctx.state[3] = (ctx.state[3] + d) >>> 0;
  ctx.state[4] = (ctx.state[4] + e) >>> 0;
  ctx.state[5] = (ctx.state[5] + f) >>> 0;
  ctx.state[6] = (ctx.state[6] + g) >>> 0;
  ctx.state[7] = (ctx.state[7] + h) >>> 0;
}

/**
 * @param {Ctx} ctx
 */
function sha256_initialize(ctx) {
  ctx.datalen = 0;
  ctx.bitlen = 0;
  ctx.state[0] = 0x6a09e667;
  ctx.state[1] = 0xbb67ae85;
  ctx.state[2] = 0x3c6ef372;
  ctx.state[3] = 0xa54ff53a;
  ctx.state[4] = 0x510e527f;
  ctx.state[5] = 0x9b05688c;
  ctx.state[6] = 0x1f83d9ab;
  ctx.state[7] = 0x5be0cd19;
}

/**
 * @param {Ctx} ctx
 * @param {number[]} data
 */
function sha256_update(ctx, data) {
  for (var i = 0; i < data.length; ++i) {
    ctx.data[ctx.datalen] = data[i];
    ctx.datalen++;
    if (ctx.datalen == 64) {
      sha256_transform(ctx, ctx.data);
      ctx.bitlen += 512;
      ctx.datalen = 0;
    }
  }
}

/**
 * @param {Ctx} ctx
 * @param {number[]} hash
 */
function sha256_final(ctx, hash) {
  var i = ctx.datalen;

  // Pad whatever data is left in the buffer.
  if (ctx.datalen < 56) {
    ctx.data[i++] = 0x80;
    while (i < 56) ctx.data[i++] = 0x00;
  } else {
    ctx.data[i++] = 0x80;
    while (i < 64) ctx.data[i++] = 0x00;
    sha256_transform(ctx, ctx.data);
    memset(ctx.data, 0, 56);
  }

  // Append to the padding the total message's length in bits and transform.
  ctx.bitlen += ctx.datalen * 8;
  ctx.data[63] = ctx.bitlen & 0xff;
  ctx.data[62] = (ctx.bitlen >>> 8) & 0xff;
  ctx.data[61] = (ctx.bitlen >>> 16) & 0xff;
  ctx.data[60] = (ctx.bitlen >>> 24) & 0xff;

  // Assume ctx.bitlen < 2^32
  ctx.data[59] = 0; // (ctx.bitlen >>> 32) & 0xff;
  ctx.data[58] = 0; // (ctx.bitlen >>> 40) & 0xff;
  ctx.data[57] = 0; // (ctx.bitlen >>> 48) & 0xff;
  ctx.data[56] = 0; // (ctx.bitlen >>> 56) & 0xff;
  sha256_transform(ctx, ctx.data);

  // Since this implementation uses little endian byte ordering and SHA uses big endian,
  // reverse all the bytes when copying the final state to the output hash.
  for (i = 0; i < 4; ++i) {
    hash[i] = (ctx.state[0] >>> (24 - i * 8)) & 0x000000ff;
    hash[i + 4] = (ctx.state[1] >>> (24 - i * 8)) & 0x000000ff;
    hash[i + 8] = (ctx.state[2] >>> (24 - i * 8)) & 0x000000ff;
    hash[i + 12] = (ctx.state[3] >>> (24 - i * 8)) & 0x000000ff;
    hash[i + 16] = (ctx.state[4] >>> (24 - i * 8)) & 0x000000ff;
    hash[i + 20] = (ctx.state[5] >>> (24 - i * 8)) & 0x000000ff;
    hash[i + 24] = (ctx.state[6] >>> (24 - i * 8)) & 0x000000ff;
    hash[i + 28] = (ctx.state[7] >>> (24 - i * 8)) & 0x000000ff;
  }
}
