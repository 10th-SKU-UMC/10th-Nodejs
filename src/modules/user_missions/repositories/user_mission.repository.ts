import { prisma } from "../../../db.config.js";
import { UserMissionStatus } from "../../../generated/prisma/enums.js";

export const getInProgressUserMissions = async (userId: number, cursor: number) => {
  try {
    return await prisma.userMission.findMany({
      select: {
        id: true,
        status: true,
        createdAt: true,
        mission: {
          select: {
            id: true,
            title: true,
            content: true,
            point: true,
            deadline: true,
            store: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      where: {
        userId,
        status: UserMissionStatus.IN_PROGRESS,
        id: {
          gt: cursor,
        },
      },
      orderBy: {
        id: "asc",
      },
      take: 5,
    });
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  }
};

export const completeUserMission = async (userId: number, missionId: number) => {
  try {
    const userMission = await prisma.userMission.findFirst({
      where: {
        userId,
        missionId,
        status: UserMissionStatus.IN_PROGRESS,
      },
    });

    if (!userMission) {
      return null;
    }

    return await prisma.userMission.update({
      where: {
        id: userMission.id,
      },
      data: {
        status: UserMissionStatus.COMPLETED,
      },
    });
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  }
};
