const { P, pool, queryFormat } = require('./utils');
async function article() {
    let query = queryFormat('select uuid,title,content,thumbnail as picture_path,start_time,end_time,time_created as created_time,status,address,visit_count,activity_type as second_type from ACTIVITY');
    let result = await P(pool, 'query', query);
    for (let i = 0; i < result.length; i++) {
        result[i].picture_path = result[i].picture_path.replace(/\/backend(.*)NORMAL/g, "/origin/");
        result[i].content = result[i].content.replace(/\/backend(.*)NORMAL/g, "/origin/");
        result[i].created_time = new Date(result[i].created_time).getTime();
        result[i].start_time = new Date(result[i].start_time).getTime();
        result[i].end_time = new Date(result[i].end_time).getTime();
        let sql = queryFormat('insert into tb_article set uuid = ?,user_id = ?,title = ?,content = ?,picture_path = ?,start_time = ?,end_time = ?,address = ?,created_time = ?,status = ?,first_type = ?,second_type = ?,city = ?,visit_count = ?,join_count = ?,upvote_count = ?,user_type = ?,stay_at_top = ?', [result[i].uuid, 1, result[i].title, result[i].content, result[i].picture_path, result[i].start_time, result[i].end_time, result[i].address, result[i].created_time, 'ENABLED', 'FM', result[i].second_type, result[i].city, result[i].visit_count, result[i].join_count, result[i].upvote_count, 'MANAGER', 0]);
        await P(pool, 'query', sql);
    };
};

module.exports = { article: article };

