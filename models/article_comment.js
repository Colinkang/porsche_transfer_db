const { P, pool, queryFormat } = require('./utils');

async function article_comment() {
    let query = queryFormat('select uuid,activity_id as article_id,author_id as user_id,author_role as user_type, content,time_created as created_time,pictures as picture_path from ACTIVITY_COMMENT');
    let result = await P(pool, 'query', query);
    for (let i = 0; i < result.length; i++) {
        result[i].created_time = new Date(result[i].created_time).getTime();
        if (result[i].picture_path) {
            result[i].picture_path = '/origin/' + result[i].picture_path.split(/\//)[result[i].picture_path.split(/\//).length - 1];
        }
        let sql = queryFormat('insert into tb_article_comment set uuid = ?,article_id = ?,user_id = ?,content = ?,created_time = ?,picture_path = ?,type = ?,upvote_count = ?,user_type = ?,comment_level = ?', [result[i].uuid, result[i].article_id, result[i].user_id, result[i].content, result[i].created_time, result[i].picture_path, 'FM', 0, result[0].user_type, 'FIRST']);
        await P(pool, 'query', sql);
    };
};

module.exports = { article_comment: article_comment };

