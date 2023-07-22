// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/ParityProtocol.sol";

contract ParityProtocolTest is Test {
    ParityProtocol public parity;

    function setUp() public {
        bytes16 appId = bytes16(keccak256(abi.encodePacked("0xd7689d36e3813e9f11f8c3ddcc695737")));
        parity = new ParityProtocol(appId);
    }

    // function test_doSomethingUsingSismoConnect() public {
    //     // bytes memory sismoConnectResponse = bytes(abi.encodePacked((keccak256(abi.encodePacked("0xd7689d36e3813e9f11f8c3ddcc695737")))));
    //     // parity.doSomethingUsingSismoConnect(sismoConnectResponse);

    //     // // test vaultId got added to user
    // }
}
