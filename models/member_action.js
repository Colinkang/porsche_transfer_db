const { P, pool, queryFormat } = require('./utils');
async function member_action(params) {
    let query = queryFormat('select activity_id,member_id,time_created as created_time from ACTIVITY_JOINED');
    let result = await P(pool, 'query', query);
    for (let i = 0; i < result.length; i++) {
        result[i].created_time = new Date(result[i].created_time).getTime();
        let sql = queryFormat('insert into tb_member_action set article_id = ?,member_id = ?,action = ?,created_time = ?', [result[i].article_id, result[i].member_id, 'JOIN', result[i].created_time]);
        await P(pool, 'query', sql);
    };


    let visit_query = queryFormat('select activity_id,member_id,time_created as created_time from MEMBER_VISIT_HISTORY');
    let visit_result = await P(pool, 'query', query);
    for (let i = 0; i < visit_result.length; i++) {
        visit_result[i].created_time = new Date(visit_result[i].created_time).getTime();
        let sql = queryFormat('insert into tb_member_action set article_id = ?,member_id = ?,action = ?,created_time = ?', [visit_result[i].article_id, visit_result[i].member_id, 'VISIT', visit_result[i].created_time]);
        await P(pool, 'query', sql);
    };

};
module.exports = { member_action: member_action };