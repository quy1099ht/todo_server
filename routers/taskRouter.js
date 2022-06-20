const express = require("express");
const router = express.Router();
const { accessTokenVerify } = require("../middlewares/tokenMiddleWare");

const controller =  require('../controlers/task/task');


router.get('/api/v1/getTasks',accessTokenVerify, controller.get)
router.post('/api/v1/addTask',accessTokenVerify, controller.addTask)

router.delete('/api/v1/deleteTask',accessTokenVerify, controller.deleteTask)

router.post('/api/v1/completeTask',accessTokenVerify, controller.completeTask)

module.exports = router