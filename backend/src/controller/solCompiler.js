const solc = require("solc");
const fs = require("fs");
const crypto = require("crypto");
const compiledCodeModel = require("../model/compiledCodes");

const solCompiler = async (req, res) => {
  const sourceCode = req.body.code;
  const id = req.body.id;
  const result = {};
  const directory = "./compiled_contracts";
  const contractName = "mainContract";

  try {
    // Compiling the Solidity source code
    const input = {
      language: "Solidity",
      sources: {
        "MyContract.sol": {
          content: sourceCode,
        },
      },
      settings: {
        outputSelection: {
          "*": {
            "*": ["abi", "evm.bytecode.object"],
          },
        },
      },
    };

    const compiledCode = JSON.parse(solc.compile(JSON.stringify(input)));
    
    if (compiledCode.errors) {
      const error = compiledCode.errors[0];
      result.compilation_stderr = `${error.formattedMessage} \n ${error.message} \n ${error.severity}`;
      const sha256Hash = crypto.createHash("sha256");
      sha256Hash.update(JSON.stringify(compiledCode));
      const compiledCodeHash = sha256Hash.digest("hex");

      const question = await compiledCodeModel.findById(id);
      let test;
      if (compiledCodeHash === question.hash) {
        test = "success";
      } else {
        test = "failure";
      }
      res.status(200).json({
        message: "Compilation errors in the contract",
        result: result,
        resultHash: compiledCodeHash,
        test: test,
      });
    } else {
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
      }
      const bytecode =
        compiledCode.contracts["MyContract.sol"][contractName].evm.bytecode
          .object;
      const abi = compiledCode.contracts["MyContract.sol"][contractName].abi;

      fs.writeFileSync(`${directory}/bytecode.txt`, bytecode, "utf8");
      fs.writeFileSync(`${directory}/abi.json`, JSON.stringify(abi), "utf8");

      const sha256Hash = crypto.createHash("sha256");
      sha256Hash.update(JSON.stringify(compiledCode));
      const compiledCodeHash = sha256Hash.digest("hex");

      const question = await compiledCodeModel.findById(id);
      let test;
      if (compiledCodeHash === question.hash) {
        test = "success";
      } else {
        test = "failure";
      }
      res.status(200).json({
        message: "Successfully compiled the contract",
        result: result,
        resultHash: compiledCodeHash,
        test: test,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server-side error" });
  }
};

module.exports = { solCompiler };
