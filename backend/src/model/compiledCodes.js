const mongoose = require('mongoose')

const compiledCodeSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    hash: {
        type:String,
        required: true,
        unique: true
    },
    difficulty:{
        type: String,
        required:true,
        enum: ['easy', 'medium', 'hard']
    },
    lang:{
        type: String,
        required: true,
        enum: ['rust', 'sol']
    }
})

const CompiledCode = mongoose.model('CompiledCode', compiledCodeSchema);

module.exports = CompiledCode;