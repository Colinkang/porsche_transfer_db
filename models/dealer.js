const { P, pool, queryFormat } = require('./utils');
async function dealer() {
    let query = queryFormat('select porsche_centre_id as porsche_center_id, member_id,time_created as created_time from CONTACT_REQUEST ');
    let result = await P(pool, 'query', query);
    for (let i = 0; i < result.length; i++) {
        result[i].created_time = new Date(result[i].created_time).getTime();
        let sql = queryFormat('insert into tb_dealer set porsche_center_id = ?,member_id = ?,type = ?,created_time = ?', [result[i].porsche_center_id, result[i].member_id, 'CONTACT', result[i].created_time]);
        await P(pool, 'query', sql);
    };

    let trial_query = queryFormat('select porsche_centre_id as porsche_center_id, member_id,trial_time as trial_drive_time,time_created as created_time from CONTACT_REQUEST ');
    let trial_result = await P(pool, 'query', trial_query);
    for (let i = 0; i < result.length; i++) {
        result[i].created_time = new Date(result[i].created_time).getTime();
        result[i].trial_drive_time = new Date(result[i].trial_drive_time).getTime();
        let sql = queryFormat('insert into tb_dealer set porsche_center_id = ?,member_id = ?,trial_drive_time = ?,type = ?,created_time = ?', [result[i].porsche_center_id, result[i].member_id, result[i].trial_drive_time, 'CONTACT', result[i].created_time]);
        await P(pool, 'query', sql);
    };

};

module.exports = {
    dealer: dealer
};
