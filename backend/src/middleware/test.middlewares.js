const {generate} = require('../utils/generateques.util')
const {Test} = require('../models/Test.model')
const {normalize} = require('../utils/testcheck.utils')

const givetest = async(req, res) => {
    try {
        const alcohol_id = req.body.id;
        const questest = new Test({alcohol_id});
        await questest.save()
        const test = await generate();
        if(!test.questions || test.questions.length !== 5)
            return res.status(401).json({status:false, message:"Gemini error"})
        return res.status(200).json({status: true, test, test_id:questest._id});
    } catch (err) {
        console.log(err)
        return res.status(500).json({status:false, message: "Internal server error"})
    }
}

const submitanswer = async(req, res) => {
    try {
        const {answer, expected_answer, question_category} = req.body;
        const nanswer = normalize(answer)

    } catch (err) {
        console.log(err)
        return res.status(500).json({status: false, message: "Internal server error"})
    }
}

module.exports = {
    givetest
}