#!/usr/bin/env node
#
# Copyright 2022 by Tatsuhiko Nagaya. All rights reserved.
# The use of this source code is governed by the MIT license.

const fs = require("fs");

fs.mkdirSync(`${__dirname}/dist`, { recursive: true });

for (const fileName of fs.readdirSync(`${__dirname}/src`)) {
  const src = fs.readFileSync(`${__dirname}/src/${fileName}`, {
    encoding: "utf-8",
  });
  const compiled = src.replace(
    /^\/\/\/ <reference path="(.+)" \/>$/gm,
    (_, relativePath) =>
      fs.readFileSync(`${__dirname}/src/${relativePath}`, { encoding: "utf-8" })
  );
  fs.writeFileSync(`${__dirname}/dist/${fileName}`, compiled);
}
