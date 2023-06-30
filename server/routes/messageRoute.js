const express = require('express')
const router = express.Router();
const {addMessage, getAllMessage} = require('../controllers/messageController')

router.post('/addmessage/',addMessage)
router.post('/getallmessages/',getAllMessage)


module.exports = router