import { prisma } from "../../../db.config";
import { CreateMissionRequest } from "../dtos/mission.dto";

export const missionRepository = {

  // 미션 저장
  async createMission(data: CreateMissionRequest) {
    const mission = await prisma.mission.create({
      data: {
        storeId: data.store_id,
        title: data.title,
        reward: data.reward,
        deadline: new Date(data.deadline), // string → Date 변환
      },
    });
    return mission.id;
  },

  // 미션 존재 확인
  async findMissionById(mission_id: number) {
    return await prisma.mission.findUnique({
      where: { id: mission_id },
      select: { id: true },
    });
  },

  // 특정 가게의 미션 목록 조회
  async findMissionsByStoreId(store_id: number) {
    return await prisma.mission.findMany({
      where: { storeId: store_id },
      select: {
        id: true,
        title: true,
        reward: true,
        deadline: true,
      },
      orderBy: { deadline: "asc" },
    });
  },
};