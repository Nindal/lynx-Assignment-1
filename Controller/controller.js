const _ = require('underscore');
const {showsingleProduct,mostViewdProduct} = require('../Model/model');

async function showProduct(req, res) {
    try{
        const id = req.query.productId;
        const rows = await showsingleProduct(id);
        if(_.isEmpty(rows)){
           return res.status(201).json({
                status: 'success',
                message : 'no data found for this id'
            });
        }
        res.status(201).json({
            status: 'success',
            data: rows
        });
    }
    catch(err){
        res.status(500).json({
            status: 'error',
            message : err.message
        });
    }
};



async function mostViewd(req, res) {
    try{
        const limit = req.query.limit;
        const rows = await mostViewdProduct(limit);
        res.status(201).json({
            status: 'success',
            data: rows
        });
        
    }
    catch(err){
        res.status(500).json({
            status: 'error',
            message : err.message
        });
    }
};
module.exports = {showProduct,mostViewd};