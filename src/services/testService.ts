import responseFactory from "../util/responseFactory";
import Test from "../schemas/testSchema";
import {encryptQuestion} from "../util/questionEncryption";
import Question from "../schemas/questionSchema";
import {shuffleArray} from "../util/arrayUtils";

const anonymizeQuestion = (question: any) => {
    return {
        "_id": question._id,
        "questionBody": question.questionBody,
        "answers": shuffleArray(question.wrongAnswers.concat(question.rightAnswers)),
        "isMultiple": question.rightAnswers.length > 1
    }
}

const addTest = async (req: any, res: any) => {
    const newTest = JSON.parse(JSON.stringify(req.body));
    Object.assign(newTest, {owner: res.locals.userId});

    const testDoc = new Test(newTest);
    testDoc.save();

    return responseFactory(res, 200, {});
}

const startTest = async (req: any, res: any) => {

    const testDoc = await Test.findOne({"testCode": req.params.room}).exec();
    const testQuestions = await Question.find().where('_id').in(testDoc!.questions).exec();

    const optimalQuestion = testQuestions!.filter((question: any) => question.difficulty === 5)[0];
    if(!optimalQuestion){

    }

    const encryptedQuestion = encryptQuestion(anonymizeQuestion(optimalQuestion));

    return responseFactory(res, 200, encryptedQuestion);
}

const verifyAndChooseNextQuestion = async (req: any, res: any) => {

}

export default {addTest, startTest, verifyAndChooseNextQuestion}