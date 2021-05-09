const prisma = require('../prisma'); // Service 로직은 오직 Model(=Prisma)에만 의존합니다.

const createUser = (field) => {
  return prisma.user.create({ data: field });
};

const findUser = (field, selectFieldsArr) => {
  const [uniqueKey] = Object.keys(field);
  const selectFields =
    selectFieldsArr?.length &&
    selectFieldsArr?.reduce((acc, field) => {
      return { ...acc, [field]: true };
    }, {});

  const isKeyId = uniqueKey === 'id';
  const value = isKeyId ? Number(field[uniqueKey]) : field[uniqueKey];

  return prisma.user.findUnique({
    where: { [uniqueKey]: value },
    select: selectFields,
  });
};

const verifyHost = async (userId) => {
  const hostId = await prisma.$queryRaw(
    `SELECT id FROM Host WHERE userId=${userId}`,
  );
  return hostId[0] ? hostId[0].id : false;
};

module.exports = {
  findUser,
  createUser,
  verifyHost,
};
