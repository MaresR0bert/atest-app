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
        expiresIn: '6h'
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
        return responseFactory(res, 400, {error: "User Already Exists"});
    }

    try{
        await refreshTokenDoc.save();
    } catch (err) {
        logger.error(err);
        return responseFactory(res, 400, {error: "Malformed Credentials"});
    }

    const accessToken = createAccessToken(userDoc.id);
    const refreshToken = createRefreshToken(userDoc.id, refreshTokenDoc.id);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        withCredentials: true,
        expires: new Date(new Date().getTime() + (6 * 3600 * 1000))
    })

    return responseFactory(res, 200, {
        id: userDoc.id,
        accessToken,
        refreshToken,
        role: "ROLE_STUDENT"
    });
}

const logIn = async (req: any, res: any) => {

    if(!emailRegexValidator(req.body.username)){
        return responseFactory(res, 400, {error: "Bad credentials"});
    }

    const userDoc = await User
        .findOne({username: req.body.username})
        .select("+password +role")
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

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        withCredentials: true,
        expires: new Date(new Date().getTime() + (6 * 3600 * 1000))
    });

    return responseFactory(res, 200, {
        id: userDoc.id,
        accessToken,
        refreshToken,
        role: userDoc.role
    });
}

const newRefreshToken = async (req: any, res: any) => {

    try {
        const currentRefreshToken: JwtPayload = await verifyRefreshToken(req.body.refreshToken);
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
        const refreshToken: JwtPayload = await verifyRefreshToken(req.body.refreshToken);
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
    try {
        const refreshToken: JwtPayload = await verifyRefreshToken(req.cookies.refreshToken);
        await RefreshToken.deleteOne({_id: refreshToken.tokenId});
        res.clearCookie("refreshToken");
        return responseFactory(res, 200, {status: "success"});
    } catch (err) {
        res.clearCookie("refreshToken");
        return responseFactory(res, 404, {error: err});
    }
}

const authCheck = async (req: any, res: any) => {
    try {
        await verifyRefreshToken(req.cookies.refreshToken);
        return responseFactory(res, 200, {"guard": true});
    } catch (err) {
        return responseFactory(res, 404, {"guard": false});
    }
}

const teacherCheck = async (req: any, res: any) => {
    try {
        const refreshToken: JwtPayload = await verifyRefreshToken(req.cookies.refreshToken);
        const user = await User.findById(refreshToken.userId).select("+role").exec();
        logger.info(user?.role);
        if(user?.role === "ROLE_PROF"){
            return responseFactory(res, 200, {"guard": true});
        } else {
            return responseFactory(res, 404, {"guard": false});
        }
    } catch (err) {
        return responseFactory(res, 404, {"guard": false});
    }
}

const verifyRefreshToken = async (token: string): Promise<JwtPayload> => {
    const decodeToken = () : JwtPayload => {
        try{
            return <JwtPayload>jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!);
        } catch (err){
            throw "Unauthorized";
        }
    }

    const decodedToken: JwtPayload = decodeToken();
    const tokenExists = await RefreshToken.exists({_id: decodedToken.tokenId});
    if (tokenExists) {
        return decodedToken;
    } else {
        throw "Unauthorized";
    }
}

export default {signUp, logIn, newRefreshToken, newAccessToken, logOut, authCheck, teacherCheck};