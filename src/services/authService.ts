import jwt, {JwtPayload} from "jsonwebtoken";
import argon2 from 'argon2';
import {RefreshToken, User} from "../schemas/exportSchemas";
import {responseFactory, logger, emailRegexValidator, passwordRegexValidator} from "../util/exportUtil";

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

const verifyPassword = async (hashedPassword: string, givenPassword: string): Promise<boolean> => {
    return await argon2.verify(hashedPassword, givenPassword);
}

const signUp = async (req: any, res: any) => {

    if(!emailRegexValidator(req.body.username)){
        return responseFactory(res, 400, {error: "Bad email address"});
    }

    if(!passwordRegexValidator(req.body.password)){
        return responseFactory(res, 400, {error: "Password too simple"});
    }

    const userDoc = new User({
        username: req.body.username,
        password: await argon2.hash(req.body.password),
        role: req.body.role
    });

    const refreshTokenDoc = new RefreshToken({
        owner: userDoc.id
    });

    try{
        await userDoc.save();
    } catch (err) {
        logger.error(err);
        return responseFactory(res, 400, {error: "Malformed Credentials"});
    }

    try{
        await refreshTokenDoc.save();
    } catch (err) {
        logger.error(err);
        return responseFactory(res, 400, {error: "Malformed Credentials"});
    }

    const accessToken = createAccessToken(userDoc.id);
    const refreshToken = createRefreshToken(userDoc.id, refreshTokenDoc.id);

    return responseFactory(res, 200, {
        id: userDoc.id,
        accessToken,
        refreshToken
    })
}

const logIn = async (req: any, res: any) => {

    if(!emailRegexValidator(req.body.username)){
        return responseFactory(res, 400, {error: "Bad credentials"});
    }

    const userDoc = await User
        .findOne({username: req.body.username})
        .select("+password")
        .exec();

    if(!userDoc
        || !userDoc.password
        || !(await verifyPassword(userDoc.password, req.body.password))) {
        return responseFactory(res, 400, {error: "Bad Credentials"});
    }

    const tokenExists = await RefreshToken.exists({owner: userDoc.id})
    if (tokenExists) {
        return responseFactory(res, 401, {
            error: "User is already authenticated"
        });
    }

    const refreshTokenDoc = new RefreshToken({
        owner: userDoc.id
    });

    try {
        await refreshTokenDoc.save();
    } catch (err) {
        logger.error(err);
        return responseFactory(res, 400, {error: "Malformed Credentials"});
    }

    const accessToken = createAccessToken(userDoc.id);
    const refreshToken = createRefreshToken(userDoc.id, refreshTokenDoc.id);

    return responseFactory(res, 200, {
        id: userDoc.id,
        accessToken,
        refreshToken
    });
}

const newRefreshToken = async (req: any, res: any) => {

    try {
        const currentRefreshToken = await verifyRefreshToken(req.body.refreshToken);
        const refreshTokenDoc = new RefreshToken({
            owner: currentRefreshToken.userId
        })

        await refreshTokenDoc.save();
        await RefreshToken.deleteOne({_id: currentRefreshToken.tokenId})

        const refreshToken = createRefreshToken(currentRefreshToken.userId, refreshTokenDoc.id);
        const accessToken = createAccessToken(currentRefreshToken.userId);

        return responseFactory(res, 200, {
            id: currentRefreshToken.userId,
            accessToken,
            refreshToken
        });
    } catch (err) {
        return responseFactory(res, 401, {error: err});
    }
}

const newAccessToken = async (req: any, res: any) => {
    try {
        const refreshToken = await verifyRefreshToken(req.body.refreshToken);
        const accessToken = createAccessToken(refreshToken.userId);

        return responseFactory(res, 200, {
            id: refreshToken.userId,
            accessToken,
            refreshToken: req.body.refreshToken
        });
    } catch (err) {
        return responseFactory(res, 401, {error: err});
    }
}

const logOut = async (req: any, res: any) => {
    const refreshToken = await verifyRefreshToken(req.body.refreshToken);
    await RefreshToken.deleteOne({_id: refreshToken.tokenId});
    return responseFactory(res, 200, {status: "success"});
}

const verifyRefreshToken = async (token: string) => {
    const decodeToken = () : JwtPayload => {
        try{
            return <JwtPayload>jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!);
        } catch (err){
            throw "Unauthorized";
        }
    }

    try{
        const decodedToken = decodeToken();
        const tokenExists = await RefreshToken.exists({_id: decodedToken.tokenId});
        if (tokenExists) {
            return decodedToken;
        } else {
            throw "Unauthorized";
        }
    } catch (err) {
        throw err;
    }
}

export default {signUp, logIn, newRefreshToken, newAccessToken, logOut};