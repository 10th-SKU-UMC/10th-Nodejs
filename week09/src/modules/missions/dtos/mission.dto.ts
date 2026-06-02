//1-3. 가게에 미션 추가하기
export interface addMissionReqeust{
    name: string;
    description: string;
    points: number;
    deadline: Date;
}

export interface MissionResponse{
    resultType: string;
    data:{
        
    };
}