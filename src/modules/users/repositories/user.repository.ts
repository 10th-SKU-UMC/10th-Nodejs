import { ResultSetHeader, RowDataPacket } from "mysql2/promise"; // promise 필수 확인
import { pool } from "../../../db.config.js"; // 경로를 다시 확인해 보세요!

export const addUser = async (data: any): Promise<number | null> => {
  const conn = await pool.getConnection();
  try {
    const [confirm] = await conn.query<RowDataPacket[]>(
      `SELECT EXISTS(SELECT 1 FROM user WHERE email = ?) as isExistEmail;`,
      [data.email],
    );

    if (confirm[0]?.isExistEmail) return null;

    const [result] = await conn.query<ResultSetHeader>(
      `INSERT INTO user (email, password, name, gender, birth, address, detail_address, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        data.email,
        data.password,
        data.name,
        data.gender,
        data.birth,
        data.address,
        data.detailAddress,
        data.phoneNumber,
      ],
    );

    return result.insertId;
  } catch (err) {
    console.error("addUser 에러 발생:", err); // 에러를 로그로 찍어야 원인을 알 수 있어요!
    throw err;
  } finally {
    conn.release(); // 반드시 반납
  }
};

export const getUser = async (userId: number): Promise<any | null> => {
  try {
    const [user] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM user WHERE id = ?;`,
      [userId],
    );
    return user.length === 0 ? null : user[0];
  } catch (err) {
    console.error("getUser 에러 발생:", err);
    throw err;
  }
};

export const setPreference = async (
  userId: number,
  foodCategoryId: number,
): Promise<void> => {
  try {
    await pool.query(
      `INSERT INTO user_favor_category (food_category_id, user_id) VALUES (?, ?);`,
      [foodCategoryId, userId],
    );
  } catch (err) {
    console.error("setPreference 에러 발생:", err);
    throw err;
  }
};

export const getUserPreferencesByUserId = async (
  userId: number,
): Promise<any[]> => {
  const [preferences] = await pool.query<RowDataPacket[]>(
    `SELECT fcl.name FROM user_favor_category ufc 
     JOIN food_category fcl ON ufc.food_category_id = fcl.id 
     WHERE ufc.user_id = ? ORDER BY ufc.food_category_id ASC;`,
    [userId],
  );
  return preferences;
};
