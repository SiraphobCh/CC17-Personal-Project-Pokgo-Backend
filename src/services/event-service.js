const prisma = require("../models/prisma");
const moment = require("moment-timezone");

const eventService = {};

eventService.createEvent = async (eventData) => {
  const {
    hostId,
    eventName,
    locationName,
    locationUrl = "ONLINE",
    bossSpawn,
    bossTerminate,
    teamLimit,
    addDescription,
    locations = "ONLINE",
  } = eventData;

  console.log(eventData);

  const formatDate = (dateString) => {
    return moment.tz(dateString, "YYYY-MM-DD HH:mm:ss", "Asia/Bangkok").toDate();
  };

  try {
    const location = await prisma.location.create({
      data: {
        name: locationName,
        location: locationUrl,
      },
    });

    const spawnTime = await prisma.spawnTime.create({
      data: {
        locationId: location.id,
        bossSpawn: formatDate(bossSpawn),
        bossTerminate: formatDate(bossTerminate),
      },
    });

    const event = await prisma.event.create({
      data: {
        hostId,
        eventName,
        locationId: location.id,
        teamLimit: +teamLimit,
        addDescription,
        locations,
      },
    });

    return { location, spawnTime, event };
  } catch (error) {
    console.log(`Error creating event: ${error}`);
    throw new Error("Failed to create event");
  }
};

eventService.getEventUserById = (hostId) =>
  prisma.event.findMany({
    where: { hostId, deletedAt: null },
    include: {
      relationships: {
        include: {
          user: {
            select: {
              characterName: true,
            },
          },
        },
      },
      location: {
        include: {
          spawnTime: true,
        },
      },
    },
  });

eventService.deleteEvent = async (userId, eventId) => {
  try {
    // Ensure the event exists and is associated with the user
    const event = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });

    if (!event || event.hostId !== userId) {
      throw new Error("Event not found or you do not have permission to delete this event");
    }

    // Soft delete the event by setting the deletedAt field
    await prisma.event.update({
      where: {
        id: eventId,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: "Event soft deleted successfully" };
  } catch (error) {
    console.error(`Error soft deleting event: ${error}`);
    throw new Error("Failed to soft delete event");
  }
};

eventService.getAllEvents = () =>
  prisma.event.findMany({
    where: { deletedAt: null },
    include: {
      user: {
        select: {
          characterName: true,
        },
      },
      relationships: {
        include: {
          user: {
            select: {
              characterName: true,
            },
          },
        },
      },
      location: {
        include: {
          spawnTime: true,
        },
      },
    },
  });

eventService.joinEvent = async (userId, eventId) => {
  // Fetch the event to check the owner
  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  if (event.hostId === userId) {
    throw new Error("Event owner cannot join their own event");
  }

  // Check if the user is already in the event
  const existingRelationship = await prisma.relationship.findUnique({
    where: {
      playerId_eventId: {
        playerId: userId,
        eventId,
      },
    },
  });

  if (existingRelationship) {
    if (existingRelationship.status === "JOINED") {
      throw new Error("User already joined this event");
    }

    // If the user had previously canceled, update the status to "JOINED"
    if (existingRelationship.status === "CANCELED") {
      await prisma.relationship.update({
        where: {
          playerId_eventId: {
            playerId: userId,
            eventId,
          },
        },
        data: {
          status: "JOINED",
        },
      });
      return;
    }
  } else {
    // Create a new relationship entry
    await prisma.relationship.create({
      data: {
        playerId: userId,
        eventId,
        status: "JOINED", // Assuming 'JOINED' is a valid status
      },
    });
  }
};

eventService.cancelEvent = async (userId, eventId) => {
  // Fetch the event to check the owner
  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  if (event.hostId === userId) {
    throw new Error("Event owner cannot cancel their own event");
  }
  // Check if the user is in the event
  const existingRelationship = await prisma.relationship.findUnique({
    where: {
      playerId_eventId: {
        playerId: userId,
        eventId,
      },
    },
  });

  if (!existingRelationship) {
    throw new Error("User is not part of this event");
  }

  // Update the relationship status to 'CANCELED'
  await prisma.relationship.update({
    where: {
      playerId_eventId: {
        playerId: userId,
        eventId,
      },
    },
    data: {
      status: "CANCELED", // Assuming 'CANCELLED' is a valid status
    },
  });
};

eventService.getEventRelationByUser = async (playerId) =>
  prisma.relationship.findMany({
    where: { playerId },
    include: {},
  });

module.exports = eventService;
