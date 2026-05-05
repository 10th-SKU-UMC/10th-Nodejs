import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";
import { LEGAL_TCP_SOCKET_OPTIONS } from "mongodb";

export const addStoreRepository = async(regionId: number, data: any) => {
    const conn = await pool.getConnection();
    try{
        const {name, address, detailAddress, phoneNum} = data;
        const query = `
            INSERT INTO store (regionId, name, address, detail_address, phone_num)
            VALUES (?, ?, ?, ?, ?);
        `;
        const values = [regionId, name, address, detailAddress, phoneNum];

        const [result] = await conn.query<ResultSetHeader>(query,values);
        return result.insertId;
    } catch (err) {
        throw new Error(`가게 추가 중 오류 발생 ${err}`);
    } finally {
        conn.release();
    }
};