const { P, pool, queryFormat } = require('./utils');
async function member_login_history() {
    let query = queryFormat('select member_id,time_created as created_time from MEMBER_LOGIN_HISTORY ');
    let result = await P(pool, 'query', query);
    for (let i = 0; i < result.length; i++) {
        result[i].created_time = new Date(result[i].created_time).getTime();
        let sql = queryFormat('insert into tb_member_login_history set member_id = ?,created_time = ?', [result[i].member_id, result[i].created_time]);
        await P(pool, 'query', sql);
    };
};

module.exports = { member_login_history: member_login_history };