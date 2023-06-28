# ProgLangComp_onESP32

https://github.com/plasgroup/ProgLangComp_onESP32

https://github.com/ignasp/ProgLangComp_onESP32

## Usage (requires Node.js)

```
make build
```

Compiled JavaScript files will be exported in `./dist`

## Directory structure

```
ProgLangComp_onESP32
├── compiler.js      # Bundles dependencies into a single .js file
├── dist             # Generated files
├── Makefile         # Convenient scripts
└── src
    ├── common-*     # Common library
    ├── *.bench.js   # Benchmark script
    ├── *.js         # Program body
    └── *.test.js    # Test script
```
