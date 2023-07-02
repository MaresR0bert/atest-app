import responseFactory from "../util/responseFactory";
import Test from "../schemas/testSchema";
import {encryptQuestion} from "../util/questionEncryption";
import Question from "../schemas/questionSchema";
import {shuffleArray} from "../util/arrayUtils";
import UserLog from "../schemas/userLogSchema";
import TestLog from "../schemas/testLogSchema";

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
    Object.assign(newTest, {isOpen: true});

    const testDoc = new Test(newTest);
    testDoc.save();

    return responseFactory(res, 200, {});
}

const startTest = async (req: any, res: any) => {

    const currentUserLog = await UserLog.find({owner: res.locals.userId}).exec();
    if(!currentUserLog.length){
        const testDoc = await Test.findOne({"testCode": req.params.room}).exec();
        if(!testDoc!.isOpen) {
            return responseFactory(res, 401, {error: "Test is NOT Open"});
        }
        const testQuestions = await Question.find().where('_id').in(testDoc!.questions).exec();

        const userLogDoc = new UserLog({
            owner: res.locals.userId,
            testCode: req.params.room,
            pastQuestions: [],
            remainingQuestions: testQuestions,
            score: [],
            isAscending: false
        });

        userLogDoc.save();

        const optimalQuestion = testQuestions!.filter((question: any) => question.difficulty === 5)[0];

        const encryptedQuestion = encryptQuestion(anonymizeQuestion(optimalQuestion));

        return responseFactory(res, 200, encryptedQuestion);
    } else {

        const encryptedQuestion = encryptQuestion({}
            //anonymizeQuestion({})
        );

        //TODO Call on Adaptive Algorithm
        return responseFactory(res, 200, encryptedQuestion);
    }
}

const verifyAndChooseNextQuestion = async (req: any, res: any) => {
    const currentQuestion = await Question.findById(req.params.questionId).exec();
    if (!currentQuestion) {
        return responseFactory(res, 404, {err: "No such Question"});
    }
    let verification: Boolean = false;
    if(currentQuestion.rightAnswers.sort().join(',')=== req.body.answers.sort().join(',')){
        verification = true;
    }

    const updatedUserLog = await UserLog.findOneAndUpdate({"owner": res.locals.userId}, {
        $push: {pastQuestions: currentQuestion._id, score: currentQuestion.difficulty},
        $pull: {remainingQuestions: currentQuestion._id},
        isAscending: verification
    }, {
        new: true
    });

    if(req.body.isFinished) {
        const testLogDoc = new TestLog({
            owner: res.locals.userId,
            testCode: updatedUserLog!.testCode,
            score: updatedUserLog!.score[updatedUserLog!.score.length - 1]
        })

        testLogDoc.save();

        await UserLog.findByIdAndDelete(updatedUserLog!._id);

        return responseFactory(res, 200, {});
    } else {
        //TODO Call on Adaptive Algorithm

        return responseFactory(res, 200, {status: verification});
    }
}

export default {addTest, startTest, verifyAndChooseNextQuestion}