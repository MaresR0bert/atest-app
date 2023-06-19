import logger from "../util/logger";
import responseFactory from "../util/responseFactory";
import * as CryptoJS from "crypto-js";
import Question from "../schemas/questionSchema";

const decryptQuestion = (encryptedQuestion: string): any => {
    const decryptedData =
        CryptoJS.AES.decrypt(decodeURIComponent(encryptedQuestion), process.env.AES_ENCRYPTION_KEY!);
    return JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));
}

const addQuestion = async (req: any, res: any) => {
    let question = decryptQuestion(req.body.payload);
    Object.assign(question, {owner: res.locals.userId});

    const questionDoc = new Question(question);
    questionDoc.save();

    return responseFactory(res, 200, {});
}

export default {addQuestion}