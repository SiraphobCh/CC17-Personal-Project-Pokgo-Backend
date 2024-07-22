-- DropForeignKey
ALTER TABLE `Event` DROP FOREIGN KEY `Event_hostId_fkey`;

-- DropForeignKey
ALTER TABLE `Event` DROP FOREIGN KEY `Event_locationId_fkey`;

-- DropForeignKey
ALTER TABLE `Relationship` DROP FOREIGN KEY `Relationship_eventId_fkey`;

-- DropForeignKey
ALTER TABLE `Relationship` DROP FOREIGN KEY `Relationship_playerId_fkey`;

-- DropForeignKey
ALTER TABLE `SpawnTime` DROP FOREIGN KEY `SpawnTime_locationId_fkey`;

-- AddForeignKey
ALTER TABLE `SpawnTime` ADD CONSTRAINT `SpawnTime_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Location`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_hostId_fkey` FOREIGN KEY (`hostId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Location`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Relationship` ADD CONSTRAINT `Relationship_playerId_fkey` FOREIGN KEY (`playerId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Relationship` ADD CONSTRAINT `Relationship_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
