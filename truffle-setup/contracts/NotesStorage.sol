// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NotesStorage {
    mapping(address => string[]) private notes;

    function addNote(string memory _note) public {
        notes[msg.sender].push(_note);
    }

    function getNotes() public view returns (string[] memory) {
        return notes[msg.sender];
    }
}
