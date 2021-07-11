const express = require("express");
const mock_projects_controller = require("../controllers/my_coding_quest_controller");

const router = express.Router();

router.get("/", mock_projects_controller.mock_projects_get);
router.get("/form_01", mock_projects_controller.form_01_get);
router.get(
  "/responsive_site_01",
  mock_projects_controller.responsive_site_01_get
);
router.get("/tribute_page", mock_projects_controller.tribute_page_get);

module.exports = router;
