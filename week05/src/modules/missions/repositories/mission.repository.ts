import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";
import { LEGAL_TCP_SOCKET_OPTIONS } from "mongodb";

export const addMissionRqpository = async(storeId: number, data: any) => {
    const conn = await pool.getConnection();
    try{
        const {name, description, points, deadline} = data;
        const query = `
            INSERT INTO store_mission (storeId, name, description, points, deadline)
            VALUES (?, ?, ?, ?, ?);
        `;
        const values = [storeId, name, description, points, deadline];
        const [result] = await conn.query<ResultSetHeader>(query,values);
        return result.insertId;
    } catch (err) {
        throw new Error(`미션 추가 중 오류 발생 ${err}`);
    } finally {
        conn.release();
    }
}