# Web3 Compiler - Solidity + Rust

## Description:
Web3 Compiler is a web-based compiler supporting two languages - Solidity and Rust. It provides an environment for developers to write, compile, and test their Solidity and Rust code directly in the browser. Additionally, it contains sample questions to solve, helping developers enhance their skills in these languages.

## Video Demo:
[Watch Video Demo](https://drive.google.com/file/d/13RKhavfLpmRijJJiyswUW5iPsQlkLhe7/view?usp=sharing)  <!-- Replace '#' with your video demo link -->

## Frontend Setup (Vite + React):

### Prerequisites:
- Node.js installed on your system. You can download it from [here](https://nodejs.org/).
- npm or yarn package manager installed.

### Create React App with Vite:
```bash
yarn create @vitejs/app web3-compiler --template react
# Or, using npm
npm init @vitejs/app web3-compiler --template react
```

### Navigate to Project Directory:
```bash
cd web3-compiler
```

### Start the Development Server:
```bash
yarn dev
# Or, using npm
npm run dev
```

### Build for Production:
```bash
yarn build
# Or, using npm
npm run build
```

## Backend Setup (Node.js):

### Prerequisites:
- Node.js installed (if not already done in frontend setup).

### Create a New Node.js Project:
```bash
mkdir web3-compiler-backend
cd web3-compiler-backend
npm init -y
```

### Install Necessary Dependencies (e.g., Express for backend):
```bash
npm install express
```

### Create Your Backend Files (e.g., `server.js`):
```javascript
// server.js
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World from Node.js!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

### Start the Backend Server:
```bash
node server.js
```

### MongoDB Data File:
A file named `data.json` is provided which represents the initial data structure for MongoDB. You can use this file to seed your MongoDB database.

## Rust Setup (Rustup Installation):

### Install Rust with Rustup:
- Follow the instructions on [rustup.rs](https://rustup.rs/) to install Rust on your system.

### Verify Rust Installation:
```bash
rustc --version
```

### Create a New Rust Project (Optional):
```bash
cargo new web3-compiler-rust
cd web3-compiler-rust
```

### Start Coding in Rust!

## Environment Variables:
To run the project, make sure to create and configure the necessary environment variables. You can find an example `.env` file in the repository.

That's it! You now have a setup guide for both frontend and backend development for Web3 Compiler, along with Rust installation via Rustup. Happy coding!

Make sure to include the `data.json` file in your repository for users to reference.
