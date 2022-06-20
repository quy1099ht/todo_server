const express = require("express");
const router = express.Router();
const { accessTokenVerify } = require("../middlewares/tokenMiddleWare");

const controller = require('../controlers/task/task');


router.route('/api/v1/getTasks').get(accessTokenVerify, controller.get)
router.route('/api/v1/addTask').post(accessTokenVerify, controller.addTask)

router.route('/api/v1/deleteTask').delete(accessTokenVerify, controller.deleteTask)

router.route('/api/v1/completeTask').post(accessTokenVerify, controller.completeTask)

module.exports = router