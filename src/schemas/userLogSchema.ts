import mongoose from "mongoose";

const {Schema, model} = mongoose;

const userLogSchema = new Schema({
    owner: {type: Schema?.Types.ObjectId, ref: 'user', unique: true},
    testCode: {type: String, required: true},
    pastQuestions: {type: [Schema?.Types.ObjectId], ref:'question'},
    remainingQuestions: {type: [Schema?.Types.ObjectId], ref:'question'},
    score: {type: [Number]},
    isAscending: {type: Boolean}
}, {
    timestamps: true
});

const UserLog = model("UserLog", userLogSchema);

export default UserLog;