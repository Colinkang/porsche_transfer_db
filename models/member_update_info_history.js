const { P, pool, queryFormat } = require('./utils');
async function member_update_info_history(params) {
    let query = queryFormat('select member_id,origin_data,updated_data,time_created as created_time from member_login_history ');
    let result = await P(pool, 'query', query);
    for (let i = 0; i < result.length; i++) {
        result[i].created_time = new Date(result[i].created_time).getTime();
        let sql = queryFormat('insert into tb_member_update_info_history set member_id = ?,origin_data = ?,updated_data = ?,created_time = ?', [result[i].member_id, result[i].origin_data, result[i].updated_data, result[i].created_time]);
        await P(pool, 'query', sql);
    };
};
module.exports = { member_update_info_history: member_update_info_history };