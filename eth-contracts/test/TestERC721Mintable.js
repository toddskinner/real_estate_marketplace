var ERC721MintableComplete = artifacts.require('StoneCapToken');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
            let baseTokenUri = this.contract.getBaseTokenURI();

            // TODO: mint multiple tokens
            for (var i = 1; i <= 10; i++) {
                await this.contract.mint(account_one, i, baseTokenUri, {from: account_one});
            }

            for (var j = 11; j <= 15; j++) {
                await this.contract.mint(account_two, j, baseTokenUri, {from: account_one});
            }
        })

        it('should return total supply', async function () { 
            let totalSupply = await this.contract.totalSupply();
            assert.equal(totalSupply, 15, "Incorrect total supply");
        })

        it('should get token balance', async function () { 
            let tokenBalanceAcct2 = await this.contract.balanceOf(account_two);
            console.log("token balance: " + tokenBalanceAcct2);
            assert.equal(tokenBalanceAcct2, 5, "Incorrect total balance for account 2");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let tokenUri = await this.contract.tokenURI(5);
            assert.equal(tokenUri, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/5", "URI is not correct");
        })

        it('should transfer token from one owner to another', async function () { 
            let transfer = await this.contract.transferFrom(account_one, account_two, 3, {from: account_one});
            let newOwner = await this.contract.ownerOf(3);
            assert.equal(account_two, newOwner);
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            try {
                await this.contract.mint(account_two, 1, {from: account_two});
              } catch(err) {
                assert.equal(err.reason, "Caller not the contract owner");
              }
        })

        it('should return contract owner', async function () { 
            let result = await this.contract.getOwner();
            assert.equal(account_one, result);
        })

    });
})