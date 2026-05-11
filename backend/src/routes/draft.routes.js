const express = require("express");
const { getDraft, saveDraft } = require("../controllers/draft.controller");

const router = express.Router();

router.get("/:problemId", getDraft);
router.post("/save", saveDraft);

module.exports = router;
