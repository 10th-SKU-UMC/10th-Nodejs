import { pool } from "../../../db.config";

export const reviewRepository = {
  async createReview(data: any) {
    const query = `
      INSERT INTO reviews (user_id, store_id, score, content)
      VALUES (?, ?, ?, ?)
    `;
    const [result]: any = await pool.execute(query, [
      data.user_id,
      data.store_id,
      data.score,
      data.content,
    ]);
    return result.insertId;
  },
};