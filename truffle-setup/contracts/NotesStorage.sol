// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NotesStorage {
    mapping(address => string[]) private userNotes;

    function getNotes() public view returns (string[] memory) {
        return userNotes[msg.sender];
    }

    function addNote(string memory note) public {
        userNotes[msg.sender].push(note);
    }

    function editNote(uint index, string memory newNote) public {
        require(index < userNotes[msg.sender].length, "Index out of bounds");
        userNotes[msg.sender][index] = newNote;
    }

    function deleteNote(uint index) public {
        require(index < userNotes[msg.sender].length, "Index out of bounds");
        for (uint i = index; i < userNotes[msg.sender].length - 1; i++) {
            userNotes[msg.sender][i] = userNotes[msg.sender][i + 1];
        }
        userNotes[msg.sender].pop();
    }
}
