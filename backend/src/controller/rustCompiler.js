const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const compiledCode = require("../model/compiledCodes");

const rustCompiler = async (req, res) => {
  const sourceCode = req.body.code;
  const id = req.body.id;

  const directory = "compiled_rust";
  const sourceFilePath = path.join(directory, "temp.rs");
  const executableFilePath = path.join(directory, "temp.exe");
  const filePath = path.join(directory, "./temp.rs");

  let result = {};

  try {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }
    fs.writeFileSync(filePath, sourceCode);

    // Compiling the Rust code
    exec(
      `rustc ${sourceFilePath} -o ${executableFilePath}`,
      async (compilationError, compilationStdout, compilationStderr) => {
        result.compilation_stderr = compilationStderr || "";
        result.compilation_stdout = compilationStdout || "";

        if (compilationError) {
          console.error(`Compilation error: ${compilationError.message}`);
          result.compilationError = compilationError.message;
        }
        // Executing the compiled Rust code
        exec(
          `${executableFilePath}`,
          async (executionError, executionStdout, executionStderr) => {
            result.execution_stderr = executionStderr || "";
            result.execution_stdout = executionStdout || "";

            if (executionError) {
              console.error(`Execution error: ${executionError.message}`);
              result.executionError = executionError.message;
            }
            const sha256Hash = crypto.createHash("sha256");
            sha256Hash.update(JSON.stringify(result));
            const resultHash = sha256Hash.digest("hex");

            try {
              const question = await compiledCode.findById(id);
              let test;
              if (resultHash === question.hash) {
                test = "success";
              } else {
                test = "failure";
              }
              return res.status(200).json({
                message: "Compiled and executed successfully",
                result: result,
                resultHash: resultHash,
                test: test,
              });
            } catch (error) {
              console.error(error);
              return res.status(500).json({
                message: "Error retrieving data from database",
                error: error.message,
              });
            }
          }
        );
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server-side error", error: error});
  }
};

module.exports = { rustCompiler };
