// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.7.0;

interface IVotingStrategy {
    function getVotingPowerAt(address user, uint256 blockNumber) external view returns (uint256);
}
