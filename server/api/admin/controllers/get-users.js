const {sequelize, Sequelize} = require('../../../dao/models');
const ApplicationError = require('../../../utils/application-error');
const makeFilterOptions = require('../../../utils/make-filter-options');


module.exports = async (req, res) => {
  const options = await makeFilterOptions(req.query.skip, req.query.limit);
  const isWhere = req.query.username;

  const whereParts = [];
  if (req.query.username) {
    whereParts.push(`p."username" ILIKE '%${req.query.username}%'`);
  }
  const whereClause = `WHERE 
      ${whereParts.join(' AND ')}
    `;

  const items = await sequelize.query(
    `
SELECT p."id",
       p."username",
       ${Array.from({length: 10}, (_, i) => i + 1).map(value => `
       max(case when "pc"."currencyId" = ${value} then "pc"."balance" end) as "${value}_value",
--       max(case when "pc"."currencyId" = ${value} then "pc"."address" end) as "${value}_address",
       `).join('')}
       case when max("pc"."updatedAt") > "p"."updatedAt" then max("pc"."updatedAt") else "p"."updatedAt" end as "lastUpdated"
FROM "User" p
         JOIN "UserCurrency" pc ON p.id = pc."userId"
         JOIN "Currency" c ON c.id = pc."currencyId"
${isWhere ? whereClause : ''}
GROUP BY p."id"
ORDER BY ${req.query.sortField && req.query.sortField !== 'updated' ? `"${req.query.sortField}_value"` : '"lastUpdated"'} ${req.query.sortType ? req.query.sortType.toUpperCase() : 'DESC'}
${options.limit ? 'LIMIT ' + options.limit : ''}
${options.offset ? 'OFFSET ' + options.offset : ''}
    `, {
      type: Sequelize.QueryTypes.SELECT
    });

  const dbCount = await sequelize.query(
    `
SELECT count("id") FROM (
SELECT p."id"
FROM "User" p
         JOIN "UserCurrency" pc ON p.id = pc."userId"
         JOIN "Currency" c ON c.id = pc."currencyId"
${isWhere ? whereClause : ''}
GROUP BY p."id") as bigTable
    `, {
      type: Sequelize.QueryTypes.SELECT
    });

  const count = Number.parseInt(dbCount[0].count);
  return res.status(200).json({items: items, count});
};
