const express = require("express");
const daily_notes_controller = require("../controllers/my_coding_quest_controller");

const router = express.Router();

router.get("/", daily_notes_controller.daily_notes_get);
router.post("/", daily_notes_controller.daily_notes_post);
router.get("/:id", daily_notes_controller.daily_notes_details);
router.delete("/:id", daily_notes_controller.daily_notes_delete);
router.put("/:id", daily_notes_controller.daily_notes_put);
router.get("/:id/edit", daily_notes_controller.daily_notes_edit_get);

module.exports = router;
