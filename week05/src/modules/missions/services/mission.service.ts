import { addMissionRqpository } from "../repositories/mission.repository.js";

export const addMissionService = async(storeId: number, data: any) => {
    const insertId = await addMissionRqpository(storeId, data);
    return insertId;
}