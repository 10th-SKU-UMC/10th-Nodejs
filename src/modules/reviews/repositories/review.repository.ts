import { ResultSetHeader } from "mysql2";
import { pool } from "../../../db.config.js";

export const addReview = async (data: any): Promise<number> => {
  const conn = await pool.getConnection();

  try {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO review (user_id, store_id, score, content) VALUES (?, ?, ?, ?);`,
      [data.userId, data.storeId, data.score, data.content]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

export const addReviewImage = async (reviewId: number, imageUrl: string): Promise<void> => {
  const conn = await pool.getConnection();

  try {
    await pool.query(
      `INSERT INTO review_image (review_id, image_url) VALUES (?, ?);`,
      [reviewId, imageUrl]
    );
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};
