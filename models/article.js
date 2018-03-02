const { P, pool, queryFormat } = require('./utils');
async function article() {
    let join = queryFormat('select activity_id, count(*) as join_count from ACTIVITY_JOINED group by activity_id')
    let query = queryFormat('select a.uuid,a.title,a.content,a.thumbnail as picture_path,a.start_time,a.end_time,a.time_created as created_time,a.status,a.address,a.visit_count,a.activity_type as second_type,b.join_count from ACTIVITY a left join (select activity_id as article_id, count(*) as join_count from ACTIVITY_JOINED group by activity_id) b on a.uuid = b.article_id');
    let result = await P(pool, 'query', query);
    for (let i = 0; i < result.length; i++) {
        result[i].picture_path = result[i].picture_path.replace(/\/backend(.*)NORMAL/g, "/origin");
        result[i].content = result[i].content.replace(/\/backend(.*)NORMAL/g, "/origin");
        result[i].created_time = new Date(result[i].created_time).getTime();
        if (result[i].start_time)
            result[i].start_time = new Date(result[i].start_time).getTime();
        if (result[i].end_time)
            result[i].end_time = new Date(result[i].end_time).getTime();
        let sql = queryFormat('insert into tb_article set uuid = ?,user_id = ?,title = ?,content = ?,picture_path = ?,start_time = ?,end_time = ?,address = ?,created_time = ?,status = ?,first_type = ?,second_type = ?,city = ?,visit_count = ?,join_count = ?,upvote_count = ?,user_type = ?,stay_at_top = ?', [result[i].uuid, 1, result[i].title, result[i].content, result[i].picture_path, result[i].start_time, result[i].end_time, result[i].address, result[i].created_time, 'ENABLED', 'FM', result[i].second_type, result[i].city, result[i].visit_count, result[i].join_count, result[i].upvote_count, 'MANAGER', 0]);
        await P(pool, 'query', sql);
    };
};

module.exports = { article: article };

