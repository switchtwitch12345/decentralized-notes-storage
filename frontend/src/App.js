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

                    // Listen for account changes
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

    return (
        <div style={{ padding: "20px" }}>
            <h1>Notes Storage DApp</h1>
            <p>
                <strong>Connected Account:</strong> {account ? account : "Not connected"}
            </p>
            <div style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Enter a new note"
                    style={{ padding: "10px", width: "300px", marginRight: "10px" }}
                />
                <button onClick={addNote} style={{ padding: "10px 20px", cursor: "pointer" }}>
                    Add Note
                </button>
            </div>
            <h3>Your Notes:</h3>
            <ul>
                {notes.map((note, index) => (
                    <li key={index} style={{ padding: "5px 0" }}>
                        {note}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
