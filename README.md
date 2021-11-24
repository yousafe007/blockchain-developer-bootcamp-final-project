### My Final Project For The Consensys Academy Bootcamp.



<!-- <p align="center">
![LOGO](/app/assets/covlogo.png)
</p> -->

<p align="center">
  <img  src="/app/assets/covlogo.png">
</p>


## <ins>Project description</ins>

The following Dapp seeks to be a proof-of-concept for on-Chain Covid-19 Certificate Verification and Submission.

At this moment in time, many countries provide their citizens with a proof of their vaccination in either physical, i.e. as a hard document or in software form, which can be done by encoding the patient's vaccine information into a QR-Code, allowing for easy verification. 

This project shows a very elementary way of making use of the later form, i.e. software, to save and verify Covid-19 certificates on-chain.

<br>
## <ins>Project Demo</ins>

"LINK TO YOUTUBE VIDEO"
<br>
## <ins>Contact Address on Ropsten:</ins>

Ropsten: 0x6B29DDD015b66D799B5DA08238E69D7BB59279C6
<br>
## <ins>Deployed and running version of the app:</ins>

https://yousafe007.github.io/blockchain-developer-bootcamp-final-project/app/app.html

## <ins>Directory Structure</ins>


- app: contains all the files for the front end.
- contracts: contains all the solidity code
- migrations: contains the .sol files for migrating the contracts to chain.
- node_modules: contains node-modules, which are ignored from the commits
- tests - contains the smart contract unit tests 



<br>
## <ins>Start the UI locally</ins>

It is recommended to use VS-Code for testing this project.

Make sure to install the [Live Server Plugin](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) by Ritwick Dey to be able to run the website locally. Once installed, open the "app.html" file and then on the bottom right side of the VS-Code window click on "go live".

<br>

## <ins>Deploying the smart contract</ins>

In a new terminal, navigate to the project root and install the projects dependencies along with truffle and ganache-cli.

```
npm install
npm install -g ganache-cli
npm install -g truffle
```

Make sure to have these lines of code in the `truffle-config.js` file:
```
  development: {
  host: "127.0.0.1",
  port: 7545,
  network_id: "*",
  },
```
If you wish to change the deployment options above, then you are welcome to do that.

For the ease of use, we are going to use ganache UI. Download it from [here](https://www.trufflesuite.com/ganache).

Run ganache UI, select "New Workspace" and then in the workspace tab, click on add project and select the`truffle-config.js` in the root directory of the project. Go to the Server tab and then make sure the host name is set to: `127.0.0.1 - lo` and port number to 7545, or as set in the `truffle-config.js` file. Also make sure to add a local network with the above configuration in metamask installed to your browser to test the app later.

Now we have set up Ganache and are listeing to the changes and deployment made on the local testnet.


## <ins>Deploying to a local dev network</ins>

Being in the root project directory, deploy the contracts:

```
truffle migrate --network development --reset
```
Once deployed, copy the contract address for the CovVrfy contract. The contract address in the `app.js` file in the "app" folder should be replaced with the copied contract address. The variable named `contractAddress` for the contract address is located inside the `Documents.prototype.init` function.


## <ins>Running the tests</ins>

//TODO
