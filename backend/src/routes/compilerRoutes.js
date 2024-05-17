const express = require("express")
const router = express.Router()
const {solCompiler} = require("../controller/solCompiler");
const {rustCompiler} = require("../controller/rustCompiler");

router.use(express.json());

router.post('/compile/rust', rustCompiler)
router.post('/compile/sol', solCompiler);

module.exports = router;
