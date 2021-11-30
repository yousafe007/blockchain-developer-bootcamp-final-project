### My Final Project For The Consensys Academy Bootcamp.




<p align="center">
  <img  src="/app/assets/covlogo.png">
</p>


## Project description

The following dapp seeks to be a proof-of-concept for on-chain Covid-19 certificate verification and submission. The project is based on the Proof-of-Existence exercise discussed in the bootcamp.

At this moment in time, many countries provide their citizens with a proof of their vaccination in either physical, i.e. as a hard document or in software form, which in its most simplest form can be done by encoding the patient's vaccine information into a QR-Code, allowing for easy verification. 

This project shows a very elementary way of making use of the later form, i.e. software, to save and verify Covid-19 certificates on-chain.


IMPORTANT: Since this is not a production ready dapp, I had to think of a way to disallow the submission of any sort of random QR-Code, which can be malicious in certain cases. So to make sure that only certain QR-Codes are submitted, the decoded string contained within the QR-code starts with the prefix "`COVPASS:`" followed by the name of the certificate holder, e.g. "`COVPASS: John Doe`". To generate such QR-Codes with manually defined text, use a website like [this](https://goqr.me/). This provides a slight sense of authenticity to this experimental project. 

You can find some sample QR-codes in the `sample-qrcodes` folder for testing.


## Project Demo

[link to the video](https://youtu.be/JNayirqWSlk)
## Contact Address on Ropsten:

Ropsten: 0xaf7854C86aB9F533F05E6396927B5dff9703bDdD
## Deployed and running version of the app:
Make sure to use Meta-Mask on Ropsten!

[link lives here!](https://yousafe007.github.io/blockchain-developer-bootcamp-final-project/app/app.html)

## Directory Structure


- app: contains all the files for the front end.
- contracts: contains all the solidity code
- migrations: contains the .sol files for migrating the contracts to chain.
- node_modules: contains node-modules, which are ignored from the commits
- tests - contains the smart contract unit tests 

## Start the UI locally

It is recommended to use VS-Code for testing this project.

Make sure to install the [Live Server Plugin](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) by Ritwick Dey to be able to run the website locally. Once installed, open the "app.html" file in VS-Code and then on the bottom right side of the window click on "go live". This should open up the page in your default browser.


## Deploying the smart contract
Note: Node version 16.13.0 LTS was used while testing and building this project.

In a new terminal window, navigate to the project root and install the projects dependencies along with truffle, web3 and ganache-cli.

```
npm install
npm install -g ganache-cli
npm install -g truffle
npm install web3
```


Make sure to have these lines of code in the `truffle-config.js` file:
```
development: {
  host: "127.0.0.1",
  port: 7545,
  network_id: "*",
}
```
If you wish to change the deployment options above, then you are welcome to do that.

For ease of use, we are going to use ganache UI. Download it from [here](https://www.trufflesuite.com/ganache).

Run ganache UI, select "New Workspace" and then in the workspace tab, click on add project and select the`truffle-config.js` in the root directory of the project. Go to the Server tab and then make sure the host name is set to: `127.0.0.1 - lo` and port number to 7545, or as set in the `truffle-config.js` file. Also make sure to add a local network with the above configuration in metamask installed to your browser to test the app later.

Now we have set up Ganache and are listeing to the changes and deployment made on the local testnet.


## Deploying to a local dev network

Being in the root project directory, deploy the contracts:

```
truffle migrate --network development --reset
```
Once deployed, copy the contract address for the CovVrfy contract. The contract address in the `app.js` file in the "app" folder should be replaced with the copied contract address. The variable named `contractAddress` for the contract address is located inside the `Documents.prototype.init` function.


## Deploying to a public network

We will now deploy the contract on Ropsten, but you can decide which network to deploy it to.
Install the following packages:
```
npm install @truffle/hdwallet-provider
npm install dotenv
```

Create a `.env` file in the root folder and paste your infura endpoint and your mnemonic like this:

```
MNEMONIC="this is not a mnemonic :)"
INFURA_URL="the url"
```

<!-- 

Paste this code into your `truffle-config.js` file:
```
const HDWalletProvider = require('@truffle/hdwallet-provider');
const dotenv = require('dotenv');
dotenv.config();
const mnemonic = process.env.MNEMONIC;
```

Make sure to add the ropsten network settings in the `truffle-config.js` file:

```
ropsten: {
    provider: () => new HDWalletProvider(mnemonic, process.env.INFURA_URL),
    network_id: "3",
    gas: 5500000
}

``` -->

Deploy it to Ropsten by running this in the root folder of the project:

```
truffle migrate --network ropsten   
```

Similar to deploying on a local network, replace the contract address in the `app.js` file with the newly deployed contract's address (see above).
## Running the tests

Run Gnache-CLI or Gnache UI as explained above in 'deploying the smart contract' section. Once the local testnet is running, open the terminal in the root folder of the project and run `truffle test`

## Credits
The QR-Scanner library was implemented by mebjas and the code can be found in his [repository](https://github.com/mebjas/html5-qrcode).

## My public Ethereum address for the certification as an NFT
0x3420fde3a09aAD23307c539255c9B848Ea00D008

## TODO
1. Provide a more user friendly way to automatically promt the user to change the network on metamask.
2. Some further UI improvements
3. Modifiy the smart contract to avoid saving any random string to the state array, which for now is only done by the front end code.
