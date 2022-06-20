const express = require("express");
const { accessTokenVerify } = require("../middlewares/tokenMiddleWare");
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { validateEmail, validatePassword } = require("../middlewares/validationMiddleware");
const { errorHandleMiddleware, validateErrMiddleware, initErrors } = require("../middlewares/errorMiddleWare");

const controller =  require('../controlers/api/acounnt')

router.post('/api/v2/register', initErrors, validateEmail,validatePassword,validateErrMiddleware, controller.register, errorHandleMiddleware);

router.post('/api/v2/login', controller.login);

router.get("/api/v2/getUser", accessTokenVerify, controller.getUser);

module.exports = router