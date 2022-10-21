// SPDX-License-Identifier: GNU AGPLv3

pragma solidity ^0.8.16;

interface IWETH9 {
    function deposit() external payable;

    function withdraw(uint256) external;
}
