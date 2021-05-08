const prisma = require('../prisma'); // Service 로직은 오직 Model(=Prisma) 에만 의존합니다.

// const createUser = (fields) => {
//   const data = makeDataForCreate(fields);
//   return prisma.users.create({ data });
// };

const findUser = (field) => {
  const [uniqueKey] = Object.keys(field);

  const isKeyId = uniqueKey === 'id';
  const value = isKeyId ? Number(field[uniqueKey]) : field[uniqueKey];

  return prisma.users.findOne({ where: { [uniqueKey]: value } });
};

module.exports = {
  findUser,
};
