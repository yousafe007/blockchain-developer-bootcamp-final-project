# Design Pattern Decisions

## <ins>Access Control Design Patterns</ins>

The Ownable design pattern has been implemented to give only the contract owner permission to pause and unpause the contract.

The ownable design pattern is used to give the contract owner the ability to pause or unpause the contract.

## <ins>Inheritance</ins>

Two solidity files from Openzepplin were imported for ease of development: Ownable and Pausable.


- **Ownable:** The main purpose for this import was to allow the contract creator to use the functionalities provided by Pausable.sol
-  **Pausable:** The owner of the contract, which can be health official who is in charge of the website and submissions of Covid Certs may want to pause the contract and only allow reads from the contract. The functionality provided by Pausable.sol is intented to be used for that exact reason
