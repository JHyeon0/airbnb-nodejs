const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = prisma;
// 이렇게 인스턴스화 된 prisma 는 Service 레이어에서 데이터베이스에 접근하는 로직에 사용됩니다.;;
