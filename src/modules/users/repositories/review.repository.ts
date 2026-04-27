import { pool } from "../../../db.config.js";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

// DB에 리뷰 데이터 삽입
export const addReview = async (
  restaurantId: number,
  data: any,
): Promise<number> => {
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO review (user_id, restaurant_id, body, score) VALUES (?, ?, ?, ?);`,
    [data.userId, restaurantId, data.body, data.score],
  );
  return result.insertId;
};

// 삽입된 리뷰 상세 조회
export const getReview = async (reviewId: number): Promise<any | null> => {
  const [review] = await pool.query<RowDataPacket[]>(
    `SELECT * FROM review WHERE id = ?;`,
    [reviewId],
  );
  return review.length === 0 ? null : review[0];
};
