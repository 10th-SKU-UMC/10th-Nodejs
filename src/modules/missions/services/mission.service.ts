import { missionRepository } from "../repositories/mission.repository";
import { storeRepository } from "../../stores/repositories/store.repository";
import { CreateMissionRequest } from "../dtos/mission.dto";

export const missionService = {
    async createMission(data: CreateMissionRequest) {

        // 가게 존재 확인
        const store = await storeRepository.findStoreById(data.store_id);
        if (!store) {
            throw new Error("존재하지 않는 가게입니다.");
        }

        // 입력값 확인
        if (!data.title || !data.reward || !data.deadline) {
            throw new Error("미션 제목, 보상 포인트, 마감일을 입력해주세요.");
        }

        // 보상 포인트가 0보다 큰지 확인
        if (data.reward <= 0) {
            throw new Error("보상 포인트는 0보다 커야 합니다.");
        }

        // 통과하면 DB에 저장
        const missionId = await missionRepository.createMission(data);

        return {
            id: missionId,
            ...data,
        };
    },

    async getStoreMissions(store_id: number) {
        const store = await storeRepository.findStoreById(store_id);
        if (!store) {
            throw new Error("존재하지 않는 가게입니다.");
        }
        return await missionRepository.findMissionsByStoreId(store_id);
    },
};