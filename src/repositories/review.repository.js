import { pool } from "../db.config.js"; // DB 연결 설정

// 리뷰 추가 함수
export const addReview = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [result] = await conn.query(
      `INSERT INTO review (user_id, store_id, region_id, body, score) VALUES (?, ?, ?, ?, ?);`,
      [data.user_id, data.store_id, data.region_id, data.body, data.score] // region_id 사용
    );

    return {
      id: result.insertId,
      user_id: data.user_id,
      store_id: data.store_id,
      region_id: data.region_id,
      body: data.body,
      score: data.score,
      created_at: new Date().toISOString(), 
    };
  } catch (err) {
    console.error("리뷰 추가 중 오류 발생:", err);
    throw new Error("리뷰 추가에 실패했습니다."); // 예외 발생
  } finally {
    conn.release();
  }
};

// 가게 조회 함수
export const getStoreById = async (storeId) => {
  const conn = await pool.getConnection();

  try {
    const [rows] = await conn.query(`SELECT * FROM store WHERE id = ?;`, [storeId]);
    return rows.length > 0 ? rows[0] : null; // 가게가 존재하면 반환
  } catch (err) {
    console.error("가게 조회 중 오류 발생:", err);
    return null; // 오류 발생 시 null 반환
  } finally {
    conn.release();
  }
};
