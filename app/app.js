function Documents() {
    this.web3 = null;
    this.instance = null;
    this.scanText = null;

}
Documents.prototype.init = function () {

    if (typeof window.ethereum !== 'undefined') {
        console.log('window.ethereum is enabled')

        if (!(ethereum.selectedAddress == null)) {
            // truncating the address shown in the green badge
            ethadd= ethereum.selectedAddress.replace(ethereum.selectedAddress.substring(4,ethereum.selectedAddress.length-4), "...")
            document.getElementById("connected-badge").innerHTML = "<b>Connected: " +ethadd+ "</b>";
            $("#connected-badge").show();
            $("#mm-connect").hide();

        }

        if (window.ethereum.isMetaMask === true) {
            console.log('MetaMask is active')
            var contractAddress=""
            contractAddress= '0xaf7854C86aB9F533F05E6396927B5dff9703bDdD';

            ABI = [
                {
                  "anonymous": false,
                  "inputs": [
                    {
                      "indexed": false,
                      "internalType": "string",
                      "name": "certInfo",
                      "type": "string"
                    }
                  ],
                  "name": "LogSubmission",
                  "type": "event"
                },
                {
                  "anonymous": false,
                  "inputs": [
                    {
                      "indexed": true,
                      "internalType": "address",
                      "name": "previousOwner",
                      "type": "address"
                    },
                    {
                      "indexed": true,
                      "internalType": "address",
                      "name": "newOwner",
                      "type": "address"
                    }
                  ],
                  "name": "OwnershipTransferred",
                  "type": "event"
                },
                {
                  "anonymous": false,
                  "inputs": [
                    {
                      "indexed": false,
                      "internalType": "address",
                      "name": "account",
                      "type": "address"
                    }
                  ],
                  "name": "Paused",
                  "type": "event"
                },
                {
                  "anonymous": false,
                  "inputs": [
                    {
                      "indexed": false,
                      "internalType": "address",
                      "name": "account",
                      "type": "address"
                    }
                  ],
                  "name": "Unpaused",
                  "type": "event"
                },
                {
                  "inputs": [],
                  "name": "owner",
                  "outputs": [
                    {
                      "internalType": "address",
                      "name": "",
                      "type": "address"
                    }
                  ],
                  "stateMutability": "view",
                  "type": "function",
                  "constant": true
                },
                {
                  "inputs": [],
                  "name": "paused",
                  "outputs": [
                    {
                      "internalType": "bool",
                      "name": "",
                      "type": "bool"
                    }
                  ],
                  "stateMutability": "view",
                  "type": "function",
                  "constant": true
                },
                {
                  "inputs": [],
                  "name": "renounceOwnership",
                  "outputs": [],
                  "stateMutability": "nonpayable",
                  "type": "function"
                },
                {
                  "inputs": [
                    {
                      "internalType": "address",
                      "name": "newOwner",
                      "type": "address"
                    }
                  ],
                  "name": "transferOwnership",
                  "outputs": [],
                  "stateMutability": "nonpayable",
                  "type": "function"
                },
                {
                  "inputs": [
                    {
                      "internalType": "string",
                      "name": "certInfo",
                      "type": "string"
                    }
                  ],
                  "name": "publishToChain",
                  "outputs": [],
                  "stateMutability": "nonpayable",
                  "type": "function"
                },
                {
                  "inputs": [
                    {
                      "internalType": "string",
                      "name": "certInfo",
                      "type": "string"
                    }
                  ],
                  "name": "calcSha",
                  "outputs": [
                    {
                      "internalType": "bytes32",
                      "name": "",
                      "type": "bytes32"
                    }
                  ],
                  "stateMutability": "pure",
                  "type": "function",
                  "constant": true
                },
                {
                  "inputs": [
                    {
                      "internalType": "string",
                      "name": "certInfo",
                      "type": "string"
                    }
                  ],
                  "name": "checkCert",
                  "outputs": [
                    {
                      "internalType": "bool",
                      "name": "",
                      "type": "bool"
                    }
                  ],
                  "stateMutability": "view",
                  "type": "function",
                  "constant": true
                },
                {
                  "inputs": [],
                  "name": "pause",
                  "outputs": [],
                  "stateMutability": "nonpayable",
                  "type": "function"
                },
                {
                  "inputs": [],
                  "name": "unpause",
                  "outputs": [],
                  "stateMutability": "nonpayable",
                  "type": "function"
                }
              ]

            // Create the contract instance for the specific address provided in the configuration
            this.web3 = new Web3(window.ethereum)
            this.instance = new this.web3.eth.Contract(ABI, contractAddress);

        } else {

            console.log('MetaMask is not available')
            document.getElementById("mm-connect").disabled = true;
            document.getElementById("ssubmit-button").disabled = true;
            document.getElementById("search-button").disabled = true;
            $("#qrscan").hide();

            
        }
    } else {
        console.log('window.ethereum is not found')
        document.getElementById("mm-connect").disabled = true;
        document.getElementById("mm-connect").innerHTML = "Please Install Metamask";
        document.getElementById("submit-button").disabled = true;
        document.getElementById("search-button").disabled = true;
        $("#qrscan").hide();

    }
};

// Searces for a given decoded QR CODE
Documents.prototype.checkCert = async function () {
    this.resetAlerts()
    try {

        console.log("CLICK SEARCH")
        res = await this.instance.methods.checkCert(Documents.scanText).call();
        console.log(res)

        var blockinfo = document.getElementById('block-info');
        if (!res) {
            blockinfo.innerHTML = "Certificate is not yet saved on chain!"
            $("#notfound-alert").show()

        } else {
            blockinfo.innerHTML = "Certificate is saved on chain."
        }
        // }

    } catch (error) {
        alert("Please provide a valid QR Code!")
    }

};

// Submit the scanned QR code to chain 

Documents.prototype.submit = async function () {

    this.resetAlerts()

    exists = await this.instance.methods.checkCert(Documents.scanText).call();
    console.log(res)
    try {

        res = await this.instance.methods.checkCert(Documents.scanText).call();

        if (!res) {

            if (Documents.scanText.startsWith('COVPASS:')) {
                console.log("CLICK SUBMIT")
                $("#spinner").show();

                await this.instance.methods.publishToChain(Documents.scanText).send({ from: ethereum.selectedAddress })
                    .on('error', function (error, receipt) {
                        console.log("er:" + error)
                        console.log('receipt: ' + receipt)
                    }).on('receipt', function (receipt) {
                      $("#submit-alert").show();
                    })
            } else {
                alert("Please submit a correct QR Code!")
            }
        } else {
            $("#existing-alert").show();
            document.getElementById('block-info').innerHTML = ""
        }
    } catch (error) {
        alert("The transaction was not submitted")
    }
    $("#spinner").hide();

};

// Connects with metamask
Documents.prototype.connect = async function () {

    try {
        await ethereum.request({ method: 'eth_requestAccounts' })
        // truncating the address shown in the green badge
        ethadd= ethereum.selectedAddress.replace(ethereum.selectedAddress.substring(4,ethereum.selectedAddress.length-4), "...")
        document.getElementById("connected-badge").innerHTML = "<b>Connected: " +ethadd+ "</b>";

        $("#connected-badge").show();
        $("#mm-connect").hide();

    } catch (err) {
        console.log(err)
    }
};
// Hides certain bootstrap alerts
Documents.prototype.resetAlerts = function () {
    $("#submit-alert").hide();
    $("#existing-alert").hide();
    $("#notfound-alert").hide();
};

// Bind event handlers to the buttons defined in app.html
Documents.prototype.bindButton = function () {
    var that = this;

    $(document).on("click", "#submit-button", function () {
        that.submit();
    });

    $(document).on("click", "#search-button", function () {
        that.checkCert();
    });

    $(document).on("click", "#mm-connect", function () {
        that.connect();
    });

};

Documents.prototype.main = function () {
    this.resetAlerts();
};



Documents.prototype.onReady = async function () {
    this.init();
    this.bindButton();
    this.main();
};
Documents.prototype.updateVar = function () {
    let output = document.getElementById('output')
    let tochange = document.getElementById('change')
    tochange.innerHTML = output.innerHTML


}
Documents.prototype.qr = function () {
    // credits:  https://github.com/mebjas/html5-qrcode 


    //initializes the QR windows
    var resultContainer = document.getElementById('cert-result');
    var lastResult, countResults = 0;
    function onScanSuccess(decodedText, decodedResult) {
        if (decodedText !== lastResult) {
            ++countResults;
            lastResult = decodedText;
            Documents.scanText = decodedText
            console.log(decodedText)


            if (!decodedResult.decodedText.startsWith('COVPASS:')) {
                resultContainer.innerHTML = "Please scan a correct COV-Pass!"
            } else {
                resultContainer.innerHTML = `The Certificate is original! Certificate Holder:  ${decodedText.replace("COVPASS: ", "")}`//decodedText
            }
        }
    }
    var html5QrcodeScanner = new Html5QrcodeScanner(
        "qr-reader", { fps: 10, qrbox: 250 });
    html5QrcodeScanner.render(onScanSuccess);
}

var documents = new Documents();

$(document).ready(function () {
    documents.onReady();
    documents.qr();
});

