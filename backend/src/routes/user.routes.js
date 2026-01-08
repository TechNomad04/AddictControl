const express = require('express')
const { verifyJWT } = require('../middleware/auth.middleware')
const { addict_data } = require('../controllers/users.controllers')
const router = express.Router()

router.post('/addictdata', verifyJWT, addict_data)

module.exports = router