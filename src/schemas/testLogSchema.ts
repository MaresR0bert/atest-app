import mongoose from "mongoose";

const {Schema, model} = mongoose;

const testLogSchema = new Schema({
    owner: {type: Schema?.Types.ObjectId, ref: 'user'},
    testCode: {type: String, required: true},
    score: {type: Number, required: true},
}, {
    timestamps: true
});

const TestLog = model("TestLog", testLogSchema);

export default TestLog;