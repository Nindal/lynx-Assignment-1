const express = require('express');
const {showProduct,mostViewd} = require('../Controller/controller');
const router = express.Router();

router.get('/heathCheck',async (req,res)=>{
    res.status(200)
    .json({
        message: "working fine"
    })
})

router.get('/product',showProduct);

router.get('/product/mostViewed',mostViewd)

module.exports = router;