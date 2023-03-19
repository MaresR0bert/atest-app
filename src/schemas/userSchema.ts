import mongoose from "mongoose";

const {Schema, model} = mongoose;

const userSchema = new Schema({
    username: {type: String, unique: true, trim: true},
    password: {type: String, unique: false, trim: true, minLength: 12},
    role: {type: String, unique: false, trim: true}
}, {
    timestamps: true
});

const User = model("User", userSchema);

export default User;