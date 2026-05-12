import { prisma } from "../../../db.config.js";
import { UserMissionStatus } from "../../../generated/prisma/enums.js";

export const addMission = async (data: any): Promise<number> => {
  try {
    const mission = await prisma.mission.create({
      data: {
        storeId: data.storeId,
        title: data.title,
        content: data.content,
        point: data.point,
        deadline: data.deadline,
      },
    });

    return mission.id;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  }
};

export const getUserMissionByMissionId = async (missionId: number, userId: number): Promise<any | null> => {
  try {
    return await prisma.userMission.findFirst({
      where: {
        missionId,
        userId,
        status: UserMissionStatus.IN_PROGRESS,
      },
    });
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  }
};

export const addUserMission = async (missionId: number, userId: number): Promise<number> => {
  try {
    const userMission = await prisma.userMission.create({
      data: {
        missionId,
        userId,
        status: UserMissionStatus.IN_PROGRESS,
      },
    });

    return userMission.id;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  }
};

export const getStoreMissions = async (storeId: number, cursor: number) => {
  try {
    return await prisma.mission.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        point: true,
        deadline: true,
        createdAt: true,
      },
      where: {
        storeId,
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
