const { P, pool, queryFormat } = require('./utils');
const uuidv4 = require('uuid/v4');
async function porscheadd() {
    let sql = queryFormat('insert into tb_porsche_center set uuid = ?,cn_name = ?,province_id = ?,city_id = ?,detail_address = ?,en_name = ?,postal_code = ?,tel = ?', [uuidv4(), '无锡保时捷中心', 32, 3202, '无锡市金城东路290号', 'Porsche Centre Wuxi', '214111', '0510-88773911']);
    await P(pool, 'query', sql);

};
module.exports = {
    porscheadd: porscheadd
};
