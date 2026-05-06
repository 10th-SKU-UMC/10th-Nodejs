export const bodyToMission = (body) => {
    return {
        detail: body.detail,
        point: body.point,
        storeName: body.storeName,
    };
};
export const responseFromMission = ({ mission, store, }) => {
    return {
        missionId: mission.mission_id,
        detail: mission.detail,
        point: mission.point,
        storeId: store.store_id,
        storeName: store.name,
    };
};
//# sourceMappingURL=mission.dto.js.map