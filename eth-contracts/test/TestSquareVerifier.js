var SquareVerifier = artifacts.require('SquareVerifier');
var zokratesProof = require("../../zokrates/code/square/proof.json");

contract("TestSolnSquareVerifier", accounts => {
  const owner = accounts[0];

  describe('match erc721 spec', function () {
      
      beforeEach(async function () { 
        this.contract = await SquareVerifier.new({from: owner});
    });
// Test verification with correct proof
// - use the contents from proof.json generated from zokrates steps

      it('should verify correct proof', async function () { 
      
        let result = await this.contract.verifyTx(zokratesProof.proof, zokratesProof.inputs, {from: owner});
        assert.equal(result, true, "Verification of correct proof is not be working");
      
      })

// Test verification with incorrect proof

      it('should not verify incorrect proof', async function () { 
  
        let result = await this.contract.verifyTx(zokratesProof.proof, [8,9], {from: owner});
        assert.equal(result, false, "Verification of incorrect proof not be working");
      
      })
  
  });
});


