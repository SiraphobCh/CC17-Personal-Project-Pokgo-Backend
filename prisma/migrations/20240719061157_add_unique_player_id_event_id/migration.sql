/*
  Warnings:

  - A unique constraint covering the columns `[playerId,eventId]` on the table `Relationship` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Relationship_playerId_eventId_key` ON `Relationship`(`playerId`, `eventId`);
