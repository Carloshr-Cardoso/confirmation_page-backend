const express = require('express');

const router = express.Router();

router.get('/sign-in', (req, res)=>{
    return res.json("sign In")
})

router.get('/admin', (req, res)=>{
    return res.json("Administration Page")
})

module.exports = router;
