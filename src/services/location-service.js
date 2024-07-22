const prisma = require('../models/prisma');

const locationService = {};

locationService.getAllLocations = () => prisma.location.findMany();

module.exports = locationService;
