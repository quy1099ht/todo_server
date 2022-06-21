const express = require("express");
const router = express.Router();
const { accessTokenVerify } = require("../middlewares/tokenMiddleWare");

const controller = require('../controlers/task/task');
const { errorHandleMiddleware } = require("../middlewares/errorMiddleWare");


router.route('/api/v1/getTasks').get(accessTokenVerify, controller.get, errorHandleMiddleware);
router.route('/api/v1/getTaskDetail/:id').get(accessTokenVerify, controller.getTaskDetail, errorHandleMiddleware);
router.route('/api/v1/addTask').post(accessTokenVerify, controller.addTask, errorHandleMiddleware);

router.route('/api/v1/deleteTask').delete(accessTokenVerify, controller.deleteTask, errorHandleMiddleware);

router.route('/api/v1/updateTaskStatus/:id').put(accessTokenVerify, controller.updateTaskStatus, errorHandleMiddleware);

router.route('/api/v1/updateTaskContent/:id').put(accessTokenVerify, controller.updateTaskContent, errorHandleMiddleware);

module.exports = router