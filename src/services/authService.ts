import jwt from "jsonwebtoken";
import argon2 from 'argon2';
import {RefreshToken, User} from "../schemas/exportSchemas";
import {emailRegexValidator} from "../util/exportUtil";
import {responseCreator} from "../util/exportUtil";

const signUp = async (req: any, res: any) => {

    if(!emailRegexValidator(req.body.username)){
        return responseCreator(res, 400, {error: "Bad email address"});
    }

    const userDoc = new User({
        username: req.body.username,
        password: await argon2.hash(req.body.password),
        role: req.body.role
    });

    const refreshTokenDoc = new RefreshToken({
        owner: userDoc.id
    });

    await userDoc.save();
    await refreshTokenDoc.save();

    const accessToken = createAccessToken(userDoc.id);
    const refreshToken = createRefreshToken(userDoc.id, refreshTokenDoc.id);

    return responseCreator(res, 200, {
        id: userDoc.id,
        accessToken,
        refreshToken
    })
}

const createAccessToken = (userId: String): any => {

    return jwt.sign({
        userId: userId
    }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: '10m'
    });
}

const createRefreshToken = (userId: String, refreshTokenId: String): any => {

    return jwt.sign({
        userId: userId,
        tokenId: refreshTokenId
    }, process.env.REFRESH_TOKEN_SECRET!, {
        expiresIn: '30d'
    });
}

export default signUp;