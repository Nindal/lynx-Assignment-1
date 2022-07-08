const _ = require('underscore');
const {showsingleProduct,mostViewdProduct} = require('../Model/model');
const conversion = require('../Util/conversion');

async function showProduct(req, res) {
    try{
        console.log(req.query);
        const id = req.query.productId;
        const currency = req.query.currency;
        const rows = await showsingleProduct(id);
        if(_.isEmpty(rows)){
           return res.status(201).json({
                status: 'success',
                message : 'no data found for this id'
            });
        }
        if(currency == 'CAD'){
            const amount = rows.price;
            const converted = await  conversion("CAD","USD",amount);
            if(isNaN(converted)){
                throw new Error('price not converted');
            }
            rows.price = converted;
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
        const currency = req.query.currency;
        const rows = await mostViewdProduct(limit);
        if(currency == 'CAD'){
            const promise = [];
            rows.forEach(row => {
                const amount = row.price;
                promise.push(conversion("CAD","USD",amount))
            });
            const data = await Promise.all(promise);
            for(let i=0 ; i < rows.length;i++){
                if(data[i]){
                    rows[i].price = data[i];
                }else{
                    throw new Error('price not converted');
                }
            }
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
module.exports = {showProduct,mostViewd};