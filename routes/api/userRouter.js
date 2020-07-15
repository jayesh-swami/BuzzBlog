const express = require('express');
const router = express.Router();

router
// @route   GET /api/users/test
// @desc    test users route
// @access  public
.get('/test', (req,res)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json({
        "Username":"Hello",
        "Message": "World"
    })
})

module.exports = router;