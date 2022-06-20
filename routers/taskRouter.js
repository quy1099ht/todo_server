const express = require("express");
const router = express.Router();

const controller =  require('../controlers/api/task');
const { accessTokenVerify } = require("../middlewares/tokenMiddleWare");

router.get('/api/v1/getTasks',accessTokenVerify, controller.get)
router.post('/api/v1/addTask',accessTokenVerify, controller.addTask)

router.delete('/api/v1/deleteTask',accessTokenVerify, controller.deleteTask)

router.post('/api/v1/completeTask',accessTokenVerify, controller.completeTask)

module.exports = router