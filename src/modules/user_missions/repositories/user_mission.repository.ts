import { prisma } from "../../../db.config";
import { CreateUserMissionRequest } from "../dtos/user_mission.dto";

export const userMissionRepository = {

  // 이미 도전 중인 미션인지 확인 (같은 유저가 같은 미션에 중복 도전 방지)
  async findChallengingMission(user_id: number, mission_id: number) {
    return await prisma.userMission.findFirst({
      where: {
        userId: user_id,
        missionId: mission_id,
        status: "challenging",
      },
      select: { id: true },
    });
  },

  // 도전 미션 저장 (기본 status는 'challenging')
  async createUserMission(data: CreateUserMissionRequest) {
    const userMission = await prisma.userMission.create({
      data: {
        userId: data.user_id,
        missionId: data.mission_id,
        status: "challenging",
      },
    });
    return userMission.id;
  },

  // 진행 중인 미션 목록 조회 (가게 이름, 미션 정보 함께 조회)
  async findChallengingMissionsByUserId(user_id: number) {
    return await prisma.userMission.findMany({
      where: {
        userId: user_id,
        status: "challenging",
      },
      select: {
        id: true,
        status: true,
        createdAt: true,
        mission: {
          select: {
            title: true,
            reward: true,
            deadline: true,
            store: {
              select: { name: true }, // 가게 이름도 함께 반환
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  },

  // user_mission 단건 조회 (완료 처리 전 존재 여부 및 상태 확인용)
  async findUserMissionById(user_mission_id: number) {
    return await prisma.userMission.findUnique({
      where: { id: user_mission_id },
      select: { id: true, status: true },
    });
  },

  // 미션 상태를 'challenging' → 'complete'로 변경
  async completeMission(user_mission_id: number) {
    return await prisma.userMission.update({
      where: { id: user_mission_id },
      data: { status: "complete" },
    });
  },
};