const prisma = require('../models/prisma');

const spawnService = {};

spawnService.createSpawnTime = (data) => prisma.spawnTime.create({ data });

module.exports = spawnService;
