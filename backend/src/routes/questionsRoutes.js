const express = require("express");
const router = express.Router();
const { getQuestionById } = require("../controller/getQuestion");
const { getAllQuestions } = require("../controller/getAllQuestion");
const { getNext } = require("../controller/returnNext");
const { getPrevious } = require("../controller/returnPrevious");

router.get("/questions/:id", getQuestionById);
router.get("/all-questions", getAllQuestions);
router.get("/next/:id", getNext);
router.get("/previous/:id", getPrevious);

module.exports = router;
