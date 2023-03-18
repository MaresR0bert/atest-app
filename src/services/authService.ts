import jwt from "jsonwebtoken";
import {RefreshToken, User} from "../schemas/exportSchemas";
import argon2 from 'argon2';

const signUp = async (req: any, res: any) => {
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

    return res.status(200).json({
        id: userDoc.id,
        accessToken,
        refreshToken
    }).catch((err: any) => {
        res.status(404)
            .json("Error: " + err)
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