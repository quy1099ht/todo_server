const express = require("express");
const { accessTokenVerify, refreshTokenVerify } = require("../middlewares/tokenMiddleWare");
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { validateEmail, validatePassword } = require("../middlewares/validationMiddleware");
const { errorHandleMiddleware, validateErrMiddleware, initErrors } = require("../middlewares/errorMiddleWare");

const controller = require('../controlers/account/acounnt');
const { methodNotAllowed } = require("../middlewares/methodMiddleware");

router.route('/api/v2/register').post(initErrors, validateEmail, validatePassword, validateErrMiddleware, controller.register, errorHandleMiddleware);

router.route('/api/v2/login').post(controller.login, errorHandleMiddleware);

router.route("/api/v2/getUser").get(accessTokenVerify, controller.getUser, errorHandleMiddleware);

router.route("/api/v2/updateUser").put(accessTokenVerify, controller.updateUserDetail, errorHandleMiddleware);

router.route("/api/v2/logout").post(accessTokenVerify, controller.logout, errorHandleMiddleware);

router.route("/api/v2/getAccessToken").post(refreshTokenVerify, controller.getNewAccessToken, errorHandleMiddleware);

module.exports = router