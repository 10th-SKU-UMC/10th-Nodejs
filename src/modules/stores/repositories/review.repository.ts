import { ResultSetHeader, RowDataPacket } from "mysql2";
import { prisma, pool } from "../../../db.config.js";
import { ReviewItem } from "../dtos/review.dto.js";

// 가게 이름으로 가게 조회
export const getStoreByName = async (storeName: string): Promise<any | null> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query<RowDataPacket[]>(
      `SELECT * FROM store WHERE name = ? LIMIT 1;`,
      [storeName]
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

// 리뷰 추가
export const addReview = async (data: {
  content: string;
  img: string | null;
  countStar: string;
  userId: number;
  storeId: number;
}): Promise<number> => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query<ResultSetHeader>(
      `INSERT INTO review (content, img, count_star, user_id, store_id)
       VALUES (?, ?, ?, ?, ?);`,
      [data.content, data.img, data.countStar, data.userId, data.storeId]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

// 리뷰 조회
export const getReview = async (reviewId: number): Promise<any | null> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query<RowDataPacket[]>(
      `SELECT * FROM review WHERE review_id = ?;`,
      [reviewId]
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

// 모든 리뷰 가져오기 
export const getAllStoreReviews = async ({
  storeId,
  cursor,
  take = 5,
}: {
  storeId: bigint;
  cursor?: number;
  take?: number;
}): Promise<ReviewItem[]> => {
  const reviews = await prisma.review.findMany({
    where: { storeId },
    take,
    ...(cursor && {
      skip: 1,
      cursor: { reviewId: BigInt(cursor) },
    }),
    orderBy: { reviewId: "desc" },
    select: {
      reviewId: true,
      content: true,
      countStar: true,
      createdAt: true,
      user: {
        select: { name: true },
      },
    },
  });

  return reviews.map((r) => ({
    cursor: Number(r.reviewId),
    nickname: r.user.name,
    countStar: r.countStar,
    createdAt: r.createdAt,
    content: r.content,
  }));
};