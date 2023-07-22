// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "sismo-connect-solidity/SismoConnectLib.sol";

contract Counter {
    uint256 public number;

    event updateNumber(uint newNumber);

    function setNumber(uint256 newNumber) public {
        number = newNumber;
        emit updateNumber(newNumber);
    }

    function increment() public {
        number++;
        emit updateNumber(number + 1);
    }
}
