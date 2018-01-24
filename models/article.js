const { P, pool, queryFormat } = require('./utils');
async function article() {
    let query = queryFormat('select * from ACTIVITY');
    let result = await P(pool, 'query', query);
    for (let i = 0; i < result.length; i++) {
        result[i].created_time = new Date(result[i].created_time).getTime();
        let sql = queryFormat('insert into tb_article set uuid = ?,user_id = ?,title = ?,content = ?,picture_path = ?,start_time,end_time = ?,address = ?,created_time = ?,status = ?,first_type = ?,second_type = ?,city = ?,visit_count = ?,join_count = ?,upvote_count = ?,user_type = ?,stay_at_top = ?', [result[i].member_id, result[i].content, result[i].created_time]);
        await P(pool, 'query', sql);
    };
};

module.exports = { article: article };

