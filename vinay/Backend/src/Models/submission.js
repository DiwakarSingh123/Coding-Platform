const mongoose = require('mongoose');
const { Schema } = mongoose;

const submissionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    problemId: {
        type: Schema.Types.ObjectId,
        ref:'problem',
        required: true,
    },
    code: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true,
        enum: ['javascript', 'python', 'c++', 'java', 'c', 'typescript']
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'wrong', 'err'],
        default: 'pending'
    },
    runtime: {
        type: Number,
        default: 0
    },
    memory: {
        type: Number,
    },
    errorMessage: {
        type: String,
        default: ""
    },
    testCasesPassed: {
        type: Number,
        default: 0
    },
    testCasesTotal: {
        type: Number,
        default: 0
    }
}, { timestamps: true }); // 

const Submission = mongoose.model('submission', submissionSchema);
module.exports = Submission;
