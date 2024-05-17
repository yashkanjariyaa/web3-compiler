const CompiledCode = require('../model/compiledCodes');

const getNext = async (req, res) => {
    try {
        const id = req.params.id;

        const currentQuestion = await CompiledCode.findById(id);

        if (!currentQuestion) {
            return res.status(404).json({ message: 'Question not found' });
        }
        const nextQuestion = await CompiledCode.findOne({ _id: { $gt: id } }).sort({ _id: 1 }).limit(1);
        if (!nextQuestion) {
            return res.status(404).json({ message: 'No next question found' });
        }
        res.json(nextQuestion);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {getNext}