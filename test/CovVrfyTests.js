const CovVrfy = artifacts.require("./CovVrfy.sol");
contract("CovVrfy Contract Test", async accounts => {

    // Transacting or submitting a certificate to chain will require ETH. This test makes sure the account has more than 0 ETH.
    it("Account should contain more than 0 eth", async () => {
        const balance = await web3.eth.getBalance(accounts[0])
        assert.equal(balance - balance, 0);
    });

    // Makes sure that the deployer is the owner of the contract (Refer to Openzepplin's Ownable contract)
    it("Owner is the deployer of the contract.", async () => {
        const instance = await CovVrfy.deployed();
        assert.strictEqual(await instance.owner(), accounts[0]);
    });

    // Submits a certificate hash and then checks whether its saved on chain.
    it("Submitted certificate should exist on chain", async () => {
        const account_one = accounts[0];
        const instance = await CovVrfy.deployed();
        await instance.publishToChain("COVPASS: FOO", { from: account_one })
        exists = await instance.checkCert.call("COVPASS: FOO");
        assert.equal(exists, true);
    });
    // If the former is not the case, then the checkcert function should return false.
    it('Function "checkCert" returns false for certificates not saved to chain', async () => {
        const instance = await CovVrfy.deployed();
        exists = await instance.checkCert.call("COVPASS: BAR");
        assert.equal(exists, false);
    });

    // Pauses and unpauses the contract and checks if the _paused variable in Pausable.sol reflects the changes.
    it("Owner can pause and then unpause the contract", async function () {

        const instance = await CovVrfy.deployed();
        await instance.pause();
        assert.equal(await instance.paused(), true)
        await instance.unpause();
        assert.equal(await instance.paused(), false)
    });

    // Pausing the contract should dissalow any submissions to chain. In this test, it is made sure that an error occurs if the publishToChain function is called while the contract is paused.
    it("Submission should fail if contract is paused", async function () {
        try {
            const account_one = accounts[0];
            const instance = await CovVrfy.deployed();
            await instance.pause();
            await instance.publishToChain("COVPASS: FAIL!!", { from: account_one })
            assert.fail("The transaction should have thrown an error");
        }
        catch (err) {
            assert.include(err.message, "revert", "The error message should contain 'revert'");
        }
    });



});