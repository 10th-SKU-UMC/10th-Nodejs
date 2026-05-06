export const bodyToMissionState = (body) => {
    return {
        userId: body.userId,
        missionId: body.missionId,
    };
};
export const responseFromMissionState = ({ missionState, mission, }) => {
    return {
        stateId: missionState.state_id,
        userId: missionState.user_id,
        missionId: mission.mission_id,
        missionDetail: mission.detail,
        point: mission.point,
        state: missionState.state,
    };
};
//# sourceMappingURL=mission_state.dto.js.map