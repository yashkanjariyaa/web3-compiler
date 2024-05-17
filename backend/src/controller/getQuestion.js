const mongoose = require("mongoose");
const CompiledCode = require("../model/compiledCodes");

async function getQuestionById(req, res) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ObjectId" });
  }

  try {
    const question = await CompiledCode.findById(id);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }
    return res.status(200).json({ question });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { getQuestionById };
