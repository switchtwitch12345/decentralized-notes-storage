import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./contractInfo";

function App() {
    const [account, setAccount] = useState("");
    const [contract, setContract] = useState(null);
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");

    useEffect(() => {
        const loadBlockchainData = async () => {
            if (window.ethereum) {
                try {
                    const web3 = new Web3(window.ethereum);
                    await window.ethereum.request({ method: "eth_requestAccounts" });

                    const accounts = await web3.eth.getAccounts();
                    setAccount(accounts[0]);

                    const notesStorage = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
                    setContract(notesStorage);

                    const userNotes = await notesStorage.methods.getNotes().call({ from: accounts[0] });
                    setNotes(userNotes);

                    window.ethereum.on("accountsChanged", async (accounts) => {
                        setAccount(accounts[0]);
                        const updatedNotes = await notesStorage.methods.getNotes().call({ from: accounts[0] });
                        setNotes(updatedNotes);
                    });
                } catch (error) {
                    console.error("Error connecting to MetaMask:", error);
                }
            } else {
                console.error("MetaMask is not installed. Please install it to use this dApp.");
            }
        };

        loadBlockchainData();
    }, []);

    const addNote = async () => {
        if (!newNote.trim()) {
            alert("Note cannot be empty. Please enter a valid note.");
            return;
        }

        if (contract) {
            try {
                await contract.methods.addNote(newNote).send({ from: account });
                const updatedNotes = await contract.methods.getNotes().call({ from: account });
                setNotes(updatedNotes);
                setNewNote("");
            } catch (error) {
                console.error("Error adding note:", error);
            }
        }
    };

    const editNote = async (index, updatedNote) => {
        if (contract) {
            try {
                await contract.methods.editNote(index, updatedNote).send({ from: account });
                const updatedNotes = await contract.methods.getNotes().call({ from: account });
                setNotes(updatedNotes);
            } catch (error) {
                console.error("Error editing note:", error);
            }
        }
    };

    const handleEdit = (index) => {
        const updatedNote = prompt("Edit your note:", notes[index]);
        if (updatedNote) editNote(index, updatedNote);
    };

    const deleteNote = async (index) => {
        if (contract) {
            try {
                await contract.methods.deleteNote(index).send({ from: account });
                const updatedNotes = await contract.methods.getNotes().call({ from: account });
                setNotes(updatedNotes);
            } catch (error) {
                console.error("Error deleting note:", error);
            }
        }
    };

    const handleDelete = (index) => {
        if (window.confirm("Are you sure you want to delete this note?")) {
            deleteNote(index);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Notes Storage DApp</h1>
            <div className="mb-4">
                <strong>Connected Account:</strong> {account ? account : "Not connected"}
            </div>
            <div className="input-group mb-3">
                <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Enter a new note"
                    className="form-control"
                />
                <button onClick={addNote} className="btn btn-primary">
                    Add Note
                </button>
            </div>
            <h3>Your Notes:</h3>
            <ul className="list-group">
                {notes.map((note, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        {note}
                        <div>
                            <button onClick={() => handleEdit(index)} className="btn btn-warning btn-sm me-2">
                                Edit
                            </button>
                            <button onClick={() => handleDelete(index)} className="btn btn-danger btn-sm">
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
