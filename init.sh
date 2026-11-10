#!/bin/bash
set -e

echo "=== Meridian prototype verification ==="
echo "Runs the test suite and static route checks."
node verify.mjs
echo "=== Verification Complete ==="
