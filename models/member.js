const { P, pool, queryFormat } = require('./utils');
async function member(params) {
    let query = queryFormat('select name as username, mobile as tel from INVITED_MEMBER ');
    let result = await P(pool, 'query', query);
    for (let i = 0; i < result.length; i++) {
        result[i].created_time = new Date(result[i].created_time).getTime();
        let sql = queryFormat('insert into tb_member set tel = ?,username = ?,status = ?', [result[i].tel, result[i].username, 'UNREGISTERED']);
        await P(pool, 'query', sql);
    };
    let query_member = queryFormat('select uuid, name as nickname ,gender,mobile as tel,email,province_id,city_id,purchasing_willing,car_id,time_created as created_time,address as detail_address,referral,avatar,district,CONCAT(surname,firstname) as username,time_updated as updated_time,have_car,car_brand,car_model,purchase_willing_updated_time from member')
    let result_member = await P(pool, 'query', query);
    for (let i = 0; i < result_member.length; i++) {
        result_member[i].created_time = new Date(result_member[i].created_time).getTime();
        result_member[i].updated_time = new Date(result_member[i].updated_time).getTime();
        let sql = queryFormat('insert into tb_member set uuid = ?,nickname = ?,gender = ?, tel = ?,username = ?,province_id = ?,city_id = ?,district = ?,detail_address = ?,email = ?,purchase_willing = ?,interest = ?,present = ?,created_time = ?,updated_time = ?,avatar = ? ,car_id = ?,purchase_willing_updated_time = ?,referral = ?,have_car = ?,car_brand = ?,car_model = ?,is_received_present = ?,status = ?',
            [result_member[i].uuid, result_member[i].tel, result_member[i].nickname, result_member[i].gender, result_member[i].tel, result_member[i].username, result_member[i].province_id, result_member[i].city_id, result_member[i].district, result_member[i].detail_address, result_member[i].email, result_member[i].purchase_willing, result_member[i].interest, result_member[i].present, result_member[i].created_time, result_member[i].updated_time, result_member[i].avatar, result_member[i].car_id, result_member[i].purchase_willing_updated_time, result_member[i].referral, result_member[i].have_car, result_member[i].car_brand, result_member[i].car_model, 'N', 'REGISTERED']);
        await P(pool, 'query', sql);
    };

};
module.exports = { member: member };