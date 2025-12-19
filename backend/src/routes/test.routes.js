const {givetest, submitanswer} = require('../middleware/test.middlewares')
const express = require('express')

const router = express.Router()

router.get('/questions', givetest);
router.post('/submit', submitanswer);

module.exports = router
