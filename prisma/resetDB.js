require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function run() {
  await prisma.$executeRawUnsafe("DROP Database cc17_personal_pj_pokgo ");
  await prisma.$executeRawUnsafe("CREATE Database cc17_personal_pj_pokgo");
}
console.log("Reset DB..");
run();
