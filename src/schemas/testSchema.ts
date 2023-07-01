import mongoose from "mongoose";

const {Schema, model} = mongoose;

const testSchema = new Schema({
    testCode: {type: String, required: true, unique: true},
    owner: {type: Schema.Types.ObjectId, ref:'user'},
    questions: {type: [Schema?.Types.ObjectId], ref:'question'}
}, {
    timestamps: true
});

const Test = model("Test", testSchema);

export default Test;