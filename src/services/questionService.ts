import logger from "../util/logger";
import responseFactory from "../util/responseFactory";
import * as CryptoJS from "crypto-js";

const addQuestion = async (req: any, res: any) => {
    const decryptedData = CryptoJS.AES.decrypt(decodeURIComponent(req.body.payload), process.env.AES_ENCRYPTION_KEY!);
    const decryptedInfo = JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));
    logger.info(JSON.stringify(decryptedInfo));
    return responseFactory(res, 200, {});
}

export default {addQuestion}