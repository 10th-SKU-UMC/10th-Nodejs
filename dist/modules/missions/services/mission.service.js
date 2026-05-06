import { pool } from "../../../db.config.js";
import { responseFromMission } from "../dtos/mission.dto.js";
import { getStoreByName, addMission, getMission, } from "../repositories/mission.repository.js";
export const createMission = async (data) => {
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();
        // 가게 존재 여부 검증
        const store = await getStoreByName(data.storeName);
        if (store === null) {
            throw new Error("없는 가게입니다.");
        }
        // 미션 추가
        const missionId = await addMission({
            detail: data.detail,
            point: data.point,
            storeId: store.store_id,
        });
        const mission = await getMission(missionId);
        await conn.commit();
        return responseFromMission({ mission, store });
    }
    catch (err) {
        await conn.rollback();
        throw err;
    }
    finally {
        conn.release();
    }
};
//# sourceMappingURL=mission.service.js.map