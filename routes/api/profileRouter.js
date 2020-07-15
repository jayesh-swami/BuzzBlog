const express = require("express");
const router = express.Router();

router
  // @route   GET /api/profiles/test
  // @desc    test profile route
  // @access  public
  .get("/test", (req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      Username: "Hello",
      Message: "World Profile",
    });
  });

module.exports = router;
