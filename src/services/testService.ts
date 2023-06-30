import responseFactory from "../util/responseFactory";
import Test from "../schemas/testSchema";
import {encryptQuestion} from "../util/questionEncryption";

const addTest = async (req: any, res: any) => {
    const newTest = JSON.parse(JSON.stringify(req.body));
    Object.assign(newTest, {owner: res.locals.userId});

    const testDoc = new Test(newTest);
    testDoc.save();

    return responseFactory(res, 200, {});
}

const startTest = async (req: any, res: any) => {

    const question = {
        "questionBody":"<p>fdsafsdafsdgdsag</p>",
        "answers":["gdsgdg","gdgdgd"],
        "isMultiple": false
    }

    const encryptedQuestion = encryptQuestion(question)

    return responseFactory(res, 200, encryptedQuestion);
}

export default {addTest, startTest}