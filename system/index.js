const express = require("express");
const router = express.Router();
const authenticate = require('./modules/auth/authenticate');
const multer = require('./modules/multer');

router.route("/files")
.get(authenticate, require("./modules/listFiles"));

router.route("/files")
.post(authenticate, multer.single('file'), require("./modules/uploadFiles"));

router.route("/files")
.delete(authenticate, require("./modules/deleteFiles"));

router.route("/droplet/:id/:action")
.get(authenticate, require("./modules/droplet"));

router.route("/login")
.post(require("./modules/auth/login"));

router.route("/register")
.post(require("./modules/auth/register"));

module.exports = router;