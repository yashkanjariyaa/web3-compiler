const CompiledCode = require("../model/compiledCodes");

const getPrevious = async (req, res) => {
  try {
    const id = req.params.id;
    const currentQuestion = await CompiledCode.findById(id);
    if (!currentQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }
    const previousQuestion = await CompiledCode.findOne({ _id: { $lt: id } })
      .sort({ _id: -1 })
      .limit(1);
    if (!previousQuestion) {
      return res.status(404).json({ message: "No previous question found" });
    }
    res.json(previousQuestion);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {getPrevious}