// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


/// @title Cov-VRFY
/// @author Yousuf Ejazi
/// @notice You can use this contract to save and verify sha256 hashes of strings. The primary use of the contract is intended for verifing and submitting covid certificates on-chain. It is based on the Proof of Existence exercise from the bootcamp.

/// @dev the contract is developed for a coding bootcamp and not intended to be used for production.

contract CovVrfy is Pausable,Ownable {

  /// @notice event for the submission of a certain hash of the certificate to chain
  /// @param certInfo the data that will be submitted and saved to state, representing the certificate's information
  event LogSubmission(string certInfo);

  /// @notice An array of type byte32 to store the hashes of the covid certs.
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

  /// @notice This function calculates the hash of the passed in string, which is the decoded info from the covid-certificate qr-code
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
  /// @dev when implementing the frontend, this function is supposed to be used by the dev for checking the existence of a certain hash in the array

  function checkCert(string memory certInfo) 
    public 
    view 
    returns (bool) 
  {
    bytes32 hash = calcSha(certInfo);
    return certExists(hash);
  }

  /// @notice returns true if the hash is stored is stored

  /// @param cert The input to be checked for its existence in the state array
  /// @return returns true if the input exists in the state array and false otherwise

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
  /// @dev refer to openzepplin's implementation of the onlyOwner modifier
  function pause()
    public 
    onlyOwner {
    _pause();
  }


  /// @notice unpauses the contract (Only the owner is allowed to call this function). 
  /// @dev refer to openzepplin's implementation of the onlyOwner modifier.
  function unpause() 
    public 
    onlyOwner {
      _unpause();
  }

}