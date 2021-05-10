const prisma = require('../prisma'); // Service 로직은 오직 Model(=Prisma)에만 의존합니다.

// user 생성
const createUser = (field) => {
  return prisma.user.create({ data: field });
};

// user table에서 field로 필요한 데이터(selectFieldsArr)만 찾기.
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

// hostId를 반환. host가 아니면 null.
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
