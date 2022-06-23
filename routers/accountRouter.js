const express = require("express");
const { accessTokenVerify } = require("../middlewares/tokenMiddleWare");
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { validateEmail, validatePassword } = require("../middlewares/validationMiddleware");
const { errorHandleMiddleware, validateErrMiddleware, initErrors } = require("../middlewares/errorMiddleWare");

const controller = require('../controlers/account/acounnt');
const { methodNotAllowed } = require("../middlewares/methodMiddleware");

router.route('/api/v2/register').post(initErrors, validateEmail, validatePassword, validateErrMiddleware, controller.register, errorHandleMiddleware);

router.route('/api/v2/login').post(controller.login, errorHandleMiddleware);

router.route("/api/v2/getUser").get(accessTokenVerify, controller.getUser, errorHandleMiddleware);

module.exports = router