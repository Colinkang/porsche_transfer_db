const { P, pool, queryFormat } = require('./utils');
async function advice() {
    let query = queryFormat('select member_id,content,time_created as created_time from ADVICE ');
    let result = await P(pool, 'query', query);
    for (let i = 0; i < result.length; i++) {
        result[i].created_time = new Date(result[i].created_time).getTime();
        let sql = queryFormat('insert into tb_advice set member_id = ?,content = ?,created_time = ?', [result[i].member_id, result[i].content, result[i].created_time]);
        await P(pool, 'query', sql);
    };
};

module.exports = {
    advice: advice
};