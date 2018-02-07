const { P, pool, queryFormat } = require('./utils');
async function porsche_center() {
    let query = queryFormat('select uuid,name as cn_name,province_id,city_id,address as detail_address,english_name as en_name,postal_code,mobile as tel,email from porsche_center ');
    let result = await P(pool, 'query', query);
    for (let i = 0; i < result.length; i++) {
        let sql = queryFormat('insert into tb_porsche_center set uuid = ?,cn_name = ?,province_id = ?,city_id = ?,detail_address = ?,en_name = ?,postal_code = ?,tel = ?,email = ?',
            [result[i].uuid, result[i].cn_name, result[i].province_id, result[i].city_id, result[i].detail_address, result[i].en_name, result[i].postal_code, result[i].tel, result[i].email]);
        await P(pool, 'query', sql);
    };
};
module.exports = { porsche_center: porsche_center };