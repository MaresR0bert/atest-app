import express from 'express';

let router = express.Router();

router.route('/').post((req, res) => {
    console.log(req.body);
    return res.json({}).status(200);
})

export default router;