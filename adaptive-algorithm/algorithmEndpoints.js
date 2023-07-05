import express from 'express';

let router = express.Router();

router.route('/').post((req, res) => {

    if(req.body.userLog.score && req.body.userLog.score.length > 3) {
        const controlArr = req.body.userLog.score.slice(req.body.userLog.score.length - 3, req.body.userLog.score.length);

        if(controlArr.every(score => score === controlArr[0])) {
            return res.json({finished: true}).status(200);
        }
    }

    const lastScore = req.body.userLog.score[req.body.userLog.score.length - 1];
    let questionList = req.body.questions;
    let tempQuestionList;

    if (req.body.userLog.isAscending) {

        let iterator = 0;

        do {
            iterator++;
            tempQuestionList = questionList.filter(q => q.difficulty === lastScore + iterator)
        } while (!tempQuestionList.length && ((iterator + lastScore) <= 10));

    } else {
        tempQuestionList = questionList.filter(q => q.difficulty === (lastScore - 1));
    }

    tempQuestionList =
        !tempQuestionList.length ? questionList.filter(q => q.difficulty === lastScore) : tempQuestionList;

    if (!tempQuestionList.length) {
        return res.json({finished: true}).status(200);
    }

    return res.json(tempQuestionList[0]).status(200);
})

export default router;