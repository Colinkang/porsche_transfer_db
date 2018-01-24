const { P, pool, queryFormat } = require('./utils');
async function address() {
    let sql = queryFormat('insert into tb_address select * from ADDRESS')
    await P(pool, 'query', sql);
}

module.exports = { address: address };