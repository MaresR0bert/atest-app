import mongoose from "mongoose";

const {Schema, model} = mongoose;

const questionSchema = new Schema({
    questionBody: {type: String, required: true},
    rightAnswers: {type: [String], required: true},
    wrongAnswers: {type: [String], required: true},
    difficulty: {type: Number, required: true},
    owner: {type: Schema.Types.ObjectId, ref:'user'}
}, {
    timestamps: true
});

const Question = model("Question", questionSchema);

export default Question;