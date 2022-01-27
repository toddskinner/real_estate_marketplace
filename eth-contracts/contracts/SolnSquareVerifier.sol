pragma solidity >=0.4.21 <0.6.0;
pragma experimental ABIEncoderV2;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>

import "./ERC721Mintable.sol";
import "./SquareVerifier.sol";

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class

contract SolnSquareVerifier is StoneCapToken {
  SquareVerifier verifier;

    constructor(address owner) public {
        verifier = SquareVerifier(owner);
    }

// TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 index;
        address account;
    }

    uint256 numSolutions = 0;

// TODO define an array of the above struct
    mapping(bytes32 => Solution) solutions;


// TODO define a mapping to store unique solutions submitted
    mapping(uint256 => bytes32) private submittedSolutions;

// TODO Create an event to emit when a solution is added
    event SolutionAdded(uint256 index, address account);

// TODO Create a function to add the solutions to the array and emit the event
    function addSolution(bytes32 key, address solution_account, uint256 solution_index) public {
        
        solutions[key].index = solution_index;
        solutions[key].account = solution_account;

        numSolutions++;

        emit SolutionAdded(solution_index, solution_account);
    }

    function getNumSolutions() public returns(uint256){
        
        return numSolutions;
    }

// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly

    function mintToken(address account, uint256 index, SquareVerifier.Proof memory proof, uint[2] memory input) public returns(bool) {

                require(verifier.verifyTx(proof, input), "Not a valid solution");

                bytes32 key = keccak256(abi.encodePacked(proof.a.X, proof.a.Y, proof.b.X, proof.b.Y, proof.c.X, proof.c.Y, input));

                require(solutions[key].account == address(0x0), "Solution already exists");

                addSolution(key, account, index);

                string memory baseTokenUri = super.getBaseTokenURI();

                return super.mint(account, index, baseTokenUri);
    }  

    function getKey(address account, uint256 index, SquareVerifier.Proof memory proof, uint[2] memory input) public returns(bytes32) {
        
        bytes32 key = keccak256(abi.encodePacked(proof.a.X, proof.a.Y, proof.b.X, proof.b.Y, proof.c.X, proof.c.Y, input));
        return key;
    }
}
