const express = require("express");

const router = express.Router();

const controller = require('../controlers/account/acounnt');
const { methodNotAllowed } = require("../middlewares/methodMiddleware");

// router.route("/404").all(urlNotFound);
router.route("*").all(methodNotAllowed);

module.exports = router