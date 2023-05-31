import jwt, {JwtPayload} from "jsonwebtoken";
import responseFactory from "../util/responseFactory";

const verifyAccessToken = async (req: any, res: any, next: any) => {
    try {
        await <JwtPayload>jwt.verify(req.get('Authorization').split(" ")[1], process.env.ACCESS_TOKEN_SECRET!);
        next();
    } catch (err) {
        return responseFactory(res, 401, {error: err});
    }
}

export default verifyAccessToken;