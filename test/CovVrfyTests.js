const CovVrfy = artifacts.require("./CovVrfy.sol");
contract("CovVrfy Contract Test", async accounts => {
    it("Account should contain more than 0 eth", async () => {
        // const instance = await CovVrfy.deployed();
        const balance = await web3.eth.getBalance(accounts[0])
        assert.equal(balance - balance, 0);
    });
    it("Owner is the deployer of the contract. (Refer to Openzepplin's Ownable contract)", async () => {
        const instance = await CovVrfy.deployed();
        assert.strictEqual(await instance.owner(), accounts[0]);
    });
    it("Submitted certificate should exist on chain", async () => {
        const account_one = accounts[0];
        const instance = await CovVrfy.deployed();
        s = await instance.publishToChain("COVPASS: FOO", { from: account_one })
        exists = await instance.checkCert.call("COVPASS: FOO");
        assert.equal(exists, true);
    });
    it('function "checkCert" returns false for certificates not saved to chain', async () => {
        const instance = await CovVrfy.deployed();
        exists = await instance.checkCert.call("COVPASS: BAR");
        assert.equal(exists, false);
    });


    it("owner can pause and then unpause the contract", async function () {


        const instance = await CovVrfy.deployed();
        await instance.pause();
        assert.equal(await instance.paused(), true)
        await instance.unpause();
        assert.equal(await instance.paused(), false)
    });


    it("submission should fail if contract is paused", async function () {
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