.PHONY: build
build:
	node ./compiler.js

.PHONY: test
test:
	for f in dist/*.test.js; do node $f; done

.PHONY: benchmark
benchmark:
	for f in dist/*.bench.js; do node $f; done"
