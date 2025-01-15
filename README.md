# Notes Storage DApp

A decentralized application (dApp) built using Ethereum blockchain technology. This project utilizes **Truffle** for smart contract management, **React** for the frontend, and **Bootstrap** for styling.

---

## Features

- Store, retrieve, edit, and delete notes securely on the blockchain.
- Connects to Ethereum wallet (e.g., MetaMask) for account management.
- Responsive and user-friendly interface built with **Bootstrap**.

---

## Prerequisites

Ensure the following are installed on your system:

- Node.js (v16 or above recommended)
- npm or Yarn
- Truffle Suite
- MetaMask browser extension
- Ganache (for local blockchain testing)

---

## Folder Structure

- **frontend/**: Contains the React application for the user interface.
- **truffle-setup/**: Contains the Truffle project for smart contract development.

---

## Installation and Setup

### Setting Up the Truffle Project

1. **Navigate to the Truffle Setup Folder**
   ```bash
   cd truffle-setup
   ```

2. **Compile Smart Contracts**
   ```bash
   truffle compile
   ```

3. **Deploy Smart Contracts**
   - Start Ganache and note the RPC server URL (usually `http://127.0.0.1:7545`).
   - Deploy the contracts:
     ```bash
     truffle migrate --network development
     ```

### Setting Up the Frontend

1. **Navigate to the Frontend Folder**
   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Update `contractInfo.js` [CONTRACT_ABI and CONTRACT_ADDRESS] as per your deployed     contract `[truffle-setup/build/NotesStorage.json]`.**
    ```
    export const CONTRACT_ABI = []; // Your contract ABI here
    
    export const CONTRACT_ADDRESS = ""; // Your contract address here
    ```

3. **Start the Development Server**
   ```bash
   npm start
   ```

---

## Smart Contract Interaction

- Smart contracts are written in **Solidity** and located in the `truffle-setup/contracts/` folder.
- To test the contracts:
  ```bash
  cd truffle-setup
  truffle test
  ```

---

## Technologies Used

- **Truffle**: Development framework for Ethereum.
- **React**: Frontend JavaScript library.
- **Bootstrap**: CSS framework for styling.
- **Solidity**: Smart contract programming language.
- **Web3.js**: JavaScript library for Ethereum interaction.
- **Ganache**: Local blockchain for testing.

---

## Contributing

Feel free to fork the repository and submit pull requests.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
