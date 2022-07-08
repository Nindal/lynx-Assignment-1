const mysql = require('mysql2/promise');
const DB = require('./constants');
const _ = require('underscore');

async function showsingleProduct(id) {
    const connection = await mysql.createConnection({
        host : DB.host,
        user : DB.user,
        password : DB.password,
        database : DB.database
    })
    const rows = await connection.execute(`SELECT * FROM product where id =${id}`);
    const data = rows[0][0];;
    if(_.isEmpty(data)){
        return ;
    }
    const productViewed = data.productViewed+1;
    await connection.execute(`update product set productViewed=${productViewed} where id=${id};`);
    await connection.end();
    return data;
   
}


async function mostViewdProduct(limit){
    const connection = await mysql.createConnection({
        host : DB.host,
        user : DB.user,
        password : DB.password,
        database : DB.database
    })
    if(isNaN(limit) || !limit){
        limit = 5;
    }
    const rows = await connection.execute(`select * from product where productViewed > 0  order by productViewed desc limit ${limit}`);
    console.log(rows[0])
    const data = rows[0];
    await connection.end();
    return data;

}


module.exports = {showsingleProduct,mostViewdProduct}