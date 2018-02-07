const { P, pool, queryFormat } = require('./utils');

async function car() {
  let sql = queryFormat('insert into tb_car select * from CAR')
  await P(pool, 'query', sql);
};

module.exports = { car: car };