const express = require("express");
const router = express.Router();
const { accessTokenVerify } = require("../middlewares/tokenMiddleWare");

const controller = require('../controlers/task/task');


router.route('/api/v1/getTasks').get(accessTokenVerify, controller.get);
router.route('/api/v1/getTaskDetail/:id').get(accessTokenVerify, controller.getTaskDetail);
router.route('/api/v1/addTask').post(accessTokenVerify, controller.addTask);

router.route('/api/v1/deleteTask').delete(accessTokenVerify, controller.deleteTask);

router.route('/api/v1/updateTaskStatus').put(accessTokenVerify, controller.updateTaskStatus);

router.route('/api/v1/updateTaskContent').put(accessTokenVerify, controller.updateTaskContent);

module.exports = router