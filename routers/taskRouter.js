const express = require("express");
const router = express.Router();
const { accessTokenVerify } = require("../middlewares/tokenMiddleWare");

const { errorHandleMiddleware } = require("../middlewares/errorMiddleWare");
const { getAllTask } = require("../controlers/task/get_all_tasks/getAll");
const { getTaskDetail } = require("../controlers/task/get_task_detail/getTaskDetail");
const { addTask } = require("../controlers/task/add_new_task/addTask");
const { updateTaskStatus } = require("../controlers/task/update_task_status/updateTaskStatus");
const { updateTaskContent } = require("../controlers/task/update_task_content/updateTaskContent");
const { deleteTask } = require("../controlers/task/delete_task/deleteTask");


router.route('/api/v1/getTasks').get(accessTokenVerify, getAllTask, errorHandleMiddleware);

router.route('/api/v1/getTaskDetail/:id').get(accessTokenVerify, getTaskDetail, errorHandleMiddleware);

router.route('/api/v1/addTask').post(accessTokenVerify, addTask, errorHandleMiddleware);

router.route('/api/v1/deleteTask').delete(accessTokenVerify, deleteTask, errorHandleMiddleware);

router.route('/api/v1/updateTaskStatus/:id').put(accessTokenVerify, updateTaskStatus, errorHandleMiddleware);

router.route('/api/v1/updateTaskContent/:id').put(accessTokenVerify, updateTaskContent, errorHandleMiddleware);

module.exports = router