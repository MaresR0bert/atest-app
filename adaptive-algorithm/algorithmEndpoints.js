import express from 'express';

let router = express.Router();

router.route('/').post((req, res) => {
    return res.json({message: "Congrats" + req.body.val}).status(200);
})

export default router;