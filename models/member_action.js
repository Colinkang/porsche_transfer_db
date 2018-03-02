const { P, pool, queryFormat } = require('./utils');
async function member_action() {
    let query = queryFormat('select activity_id as article_id,member_id,time_created as created_time from ACTIVITY_JOINED');
    let join_result = await P(pool, 'query', query);
    for (let i = 0; i < join_result.length; i++) {
        join_result[i].created_time = new Date(join_result[i].created_time).getTime();
        let sql = queryFormat('insert into tb_member_action set article_id = ?,member_id = ?,action = ?,created_time = ?', [join_result[i].article_id, join_result[i].member_id, 'JOIN', join_result[i].created_time]);
        await P(pool, 'query', sql);
    };

    let visit_query = queryFormat('select activity_id as article_id,member_id,time_created as created_time from MEMBER_VISIT_HISTORY');
    let visit_result = await P(pool, 'query', query);
    for (let i = 0; i < visit_result.length; i++) {
        visit_result[i].created_time = new Date(visit_result[i].created_time).getTime();
        let sql = queryFormat('insert into tb_member_action set article_id = ?,member_id = ?,action = ?,created_time = ?', [visit_result[i].article_id, visit_result[i].member_id, 'VISIT', visit_result[i].created_time]);
        await P(pool, 'query', sql);
    };

    let update_sql = queryFormat('update tb_member_action set  visit_url = CONCAT(?,article_id)', ['/#/article/']);
    await P(pool, 'query', update_sql);

};


module.exports = { member_action: member_action };