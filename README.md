# Notes Storage DApp

A decentralized application (dApp) built using Ethereum blockchain technology. This project utilizes **Truffle** for smart contract management and **React** for the frontend.

---

## Features

- Store and retrieve notes securely on the blockchain.
- Connects to Ethereum wallet (e.g., MetaMask) for account management.
- Responsive and user-friendly interface.

---

## Prerequisites

Ensure the following are installed on your system:

- Node.js (v16 or above recommended)
- npm or Yarn
- Truffle Suite
- MetaMask browser extension
- Ganache (for local blockchain testing)

---

## Installation and Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/dkv204p/notes-storage-dapp.git
   cd notes-storage-dapp
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Compile Smart Contracts**
   ```bash
   truffle compile
   ```

4. **Deploy Smart Contracts**
   - Start Ganache and note the RPC server URL (usually `http://127.0.0.1:7545`).
   - Deploy the contracts:
     ```bash
     truffle migrate --network development
     ```

5. **Start the Development Server**
   ```bash
   npm start
   ```

---

## Smart Contract Interaction

- Smart contracts are written in **Solidity** and located in the `contracts/` folder.
- To test the contracts:
  ```bash
  truffle test
  ```

---

## Technologies Used

- **Truffle**: Development framework for Ethereum.
- **React**: Frontend JavaScript library.
- **Solidity**: Smart contract programming language.
- **Web3.js**: JavaScript library for Ethereum interaction.
- **Ganache**: Local blockchain for testing.

---

## Contributing

Feel free to fork the repository and submit pull requests.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
