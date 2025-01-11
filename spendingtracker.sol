// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SpendingTracker {
    struct SpendingRecord {
        string department;
        uint256 amount;
        string description;
        uint256 timestamp;
        string ipfsHash;
    }

    SpendingRecord[] public records;
    
    event RecordAdded(uint256 indexed id, string department, uint256 amount);
    
    function addRecord(
        string memory department,
        uint256 amount,
        string memory description,
        string memory ipfsHash
    ) public {
        records.push(SpendingRecord(
            department,
            amount,
            description,
            block.timestamp,
            ipfsHash
        ));
        
        emit RecordAdded(records.length - 1, department, amount);
    }
    
    function getRecord(uint256 id) public view returns (SpendingRecord memory) {
        require(id < records.length, "Record does not exist");
        return records[id];
    }

    function getRecordCount() public view returns (uint256) {
        return records.length;
    }
}