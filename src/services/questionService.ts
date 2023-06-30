import responseFactory from "../util/responseFactory";
import {decryptQuestion, encryptQuestion} from "../util/questionEncryption"
import Question from "../schemas/questionSchema";

const addQuestion = async (req: any, res: any) => {
    let question = decryptQuestion(req.body.payload);
    Object.assign(question, {owner: res.locals.userId});

    const questionDoc = new Question(question);
    questionDoc.save();

    return responseFactory(res, 200, {});
}

const getQuestions = async (req: any, res: any) => {
    const questions: any = await Question.find({owner: res.locals.userId}).exec();
    let encryptedQuestions: any[] = [];
    questions.forEach((question: any) => {
        encryptedQuestions.push(encryptQuestion(question));
    })
    return responseFactory(res, 200, encryptedQuestions);
}

export default {addQuestion, getQuestions}