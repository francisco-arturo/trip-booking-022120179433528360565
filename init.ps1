# init.ps1 - Windows verification entrypoint for the Meridian prototype.
#
# Mirrors ./init.sh. Fails fast: any failing check aborts with a non-zero exit code.

$ErrorActionPreference = 'Stop'

Write-Host '=== Meridian prototype verification ==='
Write-Host 'Runs the test suite and static route checks.'
& node verify.mjs
if ($LASTEXITCODE -ne 0) {
    throw "Verification failed with exit code $LASTEXITCODE"
}
Write-Host '=== Verification Complete ==='
