const express = require("express")
const indexController = require("../controllers/indexController")
const router = express.Router()

router.use("/", indexController.index)

module.exports = router