import mongoose from "mongoose";

const {Schema, model} = mongoose;

const refreshTokenSchema = new Schema({
    owner: {type: Schema.Types.ObjectId, ref:'user'}
}, {
    timestamps: true
});

const RefreshToken = model("refreshToken", refreshTokenSchema);

export default RefreshToken;