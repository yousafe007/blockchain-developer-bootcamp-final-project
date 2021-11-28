# Avoiding common attacks

## <ins>SWC-102 - Outdated Compiler Version</ins>
<br>

Solidity version 0.8.0 is used, which is safer and a much recent release.


## <ins>SWC-131 - Presence of unused variables</ins>
The contract inhabits only state variables which are used and does not contain redundant variables.

## <ins>SWC-103 - Floating Pragma</ins>

Contracts are deployed and tested with the same pragma version (version `0.8.0`) as explained in the SWC-Registry to avoid any unwanted vulnerabilities in the contract functionality.


## <ins>SWC-123 - Requirement Violation</ins>

Execution can resume if the hash that is already stored in the state array is submitted again. To avoid this, it is made sure that the hash of a COVID certificate is not saved twice using `require()` in the `publishToChain` method. In this way, any input is checked before pushing the hash to the state array. 





