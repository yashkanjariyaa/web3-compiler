const CompiledCode = require("../model/compiledCodes");

async function getAllQuestions(req, res) {
  try {
    const allQuestions = await CompiledCode.find({});

    const oddQuestions = allQuestions.filter(
      (question, index) => index % 2 === 0
    );

    return res.status(200).json({ questions: oddQuestions });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { getAllQuestions };
