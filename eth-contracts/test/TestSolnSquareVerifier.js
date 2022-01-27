var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
var SquareVerifier = artifacts.require('SquareVerifier');
var zokratesProof = require("../../zokrates/code/square/proof.json");

contract("TestSolnSquareVerifier", accounts => {
    const account_one = accounts[0];
    const account_two = accounts[1];
    const index = 1;

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            let squareVerifier = await SquareVerifier.new({from: account_one})
            this.contract = await SolnSquareVerifier.new(squareVerifier.address, {from: account_one});
        });

// Test if a new solution can be added for contract - SolnSquareVerifier

        it('should add new solution for the contract', async function () { 
        
            let result = false;
            try {
                await this.contract.mintToken(account_two, index, zokratesProof.proof, zokratesProof.inputs, { from: account_one });
                let num = await this.contract.getNumSolutions.call();
                if(num == 1){
                    result = true;    
                } else {
                    result = false;
                }

            } catch(e) {
                console.log("error " + e);
                result = false;
            }
            assert.equal(result, true, "Unable to add solution");
        })


// Test if an ERC721 token can be minted for contract - SolnSquareVerifier

        it('should mint an ERC721 token for the contract', async function () { 
    
            let result = false;
            try {
                await this.contract.mintToken(account_two, index, zokratesProof.proof, zokratesProof.inputs, { from: account_one });
                result = true;
            } catch(e) {
                console.log("error " + e);
                result = false;
            }
            assert.equal(result, true, "Unable to mint token");
        })
    
    });
});