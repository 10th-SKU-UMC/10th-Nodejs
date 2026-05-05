import {
  isMissionChallenging,
  addMemberMission,
  getMemberMission,
} from "../repositories/memberMission.repository.js";

export const challengeMission = async (memberId: number, missionId: number) => {
  // 1. 중복 도전 여부 확인
  const alreadyChallenging = await isMissionChallenging(memberId, missionId);

  if (alreadyChallenging) {
    throw new Error("이미 도전 중인 미션입니다.");
  }

  // 2. 미션 도전 데이터 추가
  const memberMissionId = await addMemberMission(memberId, missionId);

  return await getMemberMission(memberMissionId);
};
