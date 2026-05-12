import { userMissionRepository } from "../repositories/user_mission.repository";
import { missionRepository } from "../../missions/repositories/mission.repository";
import { CreateUserMissionRequest } from "../dtos/user_mission.dto";

export const userMissionService = {
  async createUserMission(data: CreateUserMissionRequest) {

    // 미션이 존재하는지 확인
    const mission = await missionRepository.findMissionById(data.mission_id);
    if (!mission) {
      throw new Error("존재하지 않는 미션입니다.");
    }

    // 이미 도전 중인지 확인
    const challenging = await userMissionRepository.findChallengingMission(
      data.user_id,
      data.mission_id
    );
    if (challenging) {
      throw new Error("이미 도전 중인 미션입니다.");
    }

    // 통과하면 DB에 저장
    const userMissionId = await userMissionRepository.createUserMission(data);

    return {
      id: userMissionId,
      ...data,
      status: "challenging",
    };
  },

  async getChallengingMissions(user_id: number) {
    const missions = await userMissionRepository.findChallengingMissionsByUserId(user_id);

    //데이터 없어도 에러 X -> 빈 배열 반환
    return missions;
  },

  async completeMission(user_mission_id: number) {
    // 해당 user_mission이 존재하는지 확인
    const userMission = await userMissionRepository.findUserMissionById(user_mission_id);
    if (!userMission) {
      throw new Error("존재하지 않는 미션입니다.");
    }

    // 이미 완료된 미션인지 확인
    if (userMission.status === "complete") {
      throw new Error("이미 완료된 미션입니다.");
    }

    return await userMissionRepository.completeMission(user_mission_id);
  },
};