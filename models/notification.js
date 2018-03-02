const { P, pool, queryFormat } = require('./utils');
async function notification() {
    let query = queryFormat('select uuid,to_id as member_id,content,time_created as created_time,  CASE is_read WHEN 1 THEN ? ELSE ? END as is_read  from NOTIFICATION ', ['Y', 'N']);
    let result = await P(pool, 'query', query);
    for (let i = 0; i < result.length; i++) {
        result[i].created_time = new Date(result[i].created_time).getTime();
        let sql = queryFormat('insert into tb_notification set uuid = ?,admin_id = ?,member_id = ?,content = ?,created_time = ?,is_read = ?',
            [result[i].uuid, 1, result[i].member_id, result[i].content, result[i].created_time, result[i].is_read]);
        await P(pool, 'query', sql);
    };
};

module.exports = { notification: notification };