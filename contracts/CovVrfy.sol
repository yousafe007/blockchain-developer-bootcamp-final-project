// SPDX-License-Identifier: GPL-3.0
// 0x6B29DDD015b66D799B5DA08238E69D7BB59279C6
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


/// @title Cov-VRFY
/// @author Yousuf Ejazi
/// @notice You can use this contract to save and verify sha256 hashes of documents. The primary use of the contract is intended for verifing and submitting covid certificated on-chain.
/// @dev the contract is developed for a coding bootcamp and not intended to be used for production.

contract CovVrfy is Pausable,Ownable {

  /// @notice Emit the submission of a certain hash to chain
  /// @param certInfo the data that will be submitted and saved to state, representing the certificate's information
  event LogSubmission(string certInfo);






  /// @notice An array of type byte32 to store the hash of the covid certs
  bytes32[] private certs;



  /// @notice Pushes the hash into the certs array.
  /// @param cert The hash to be stored in the state variable

  function storeCert(bytes32 cert) 
    internal 
  {
    certs.push(cert);
  }

  /// @notice calculate the hash of the input and stores it in the state variable
  /// @param certInfo the input to be hashed and saved into the stated

  function publishToChain(string calldata certInfo) 
     external
     whenNotPaused
  {
    
    bytes32 hash = calcSha(certInfo);
    require(!certExists(hash), "The certificate already exists on chain!");
    storeCert(hash);
    emit LogSubmission(certInfo);
  }

  /// @notice This function calculates the hash of the passed in string, which is the decoded info from the covid cert
  /// @param certInfo The input to be hashed
  /// @return the calculated hash

  function calcSha(string memory certInfo) 
    pure 
    public 
    returns (bytes32) 
  {
    return sha256(abi.encodePacked(certInfo));
  }

  /// @notice Checks if the cert has already been saved on chain. Uses an internal function which carries the function
  /// @param certInfo The input to be checked for existence
  /// @return boolean. return true if the info has already been saved on chain and false otherwise

  function checkCert(string memory certInfo) 
    public 
    view 
    returns (bool) 
  {
    bytes32 hash = calcSha(certInfo);
    return certExists(hash);
  }

  /// @notice returns true if proof is stored

  /// @param cert The input to be checked for existence
  /// @return return true if the input exists in the state array and false otherwise

  function certExists(bytes32 cert) 
    internal 
    view 
    returns (bool) 
  {
    for (uint256 i = 0; i < certs.length; i++) {
      if (certs[i] == cert) {
        return true;
      }
    }  
    return false;
  }

  /// @notice pauses the contract. 
  /// @dev refer to openzepplin's implementation of the pause onlyOwner modifier
  function pause()
    public 
    onlyOwner {
    _pause();
  }


  /// @notice unpauses the contract. 
  /// @dev refer to openzepplin's implementation of the unpause onlyOwner modifier
  function unpause() 
    public 
    onlyOwner {
      _unpause();
  }

}


// 0x6B29DDD015b66D799B5DA08238E69D7BB59279C6