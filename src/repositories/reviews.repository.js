import { pool } from "../db.config.js"; // ?????? ??? ???

// ?? ??
export const addReview = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [result] = await pool.query(
      `INSERT INTO reviews (user_id, store_id, rating, comment, created_at) VALUES (?, ?, ?, ?, ?);`,
      [
        data.storeId,
        data.userId,
        data.contents || "",
        data.score,
        data.day,
        data.image || "",
        new Date()
      ]
    );

    return result.insertId; // ??? ??? ID ??
  } catch (err) {
    throw new Error(`?? ?? ? ??? ??????. (${err})`);
  } finally {
    conn.release();
  }
};

// ?? ??? ?? ??
export const getReviewsByStoreId = async (storeId) => {
  const conn = await pool.getConnection();

  try {
    const [reviews] = await pool.query(
      `SELECT * FROM reviews WHERE store_id = ? ORDER BY created_at DESC;`,
      storeId
    );

    return reviews; // ??? ?? ?? ??
  } catch (err) {
    throw new Error(`?? ?? ? ??? ??????. (${err})`);
  } finally {
    conn.release();
  }
};

// ?? ???? ?? ??
export const getUserReviews = async (userId) => {
  const conn = await pool.getConnection();

  try {
    const [reviews] = await pool.query(
      `SELECT * FROM reviews WHERE user_id = ? ORDER BY created_at DESC;`,
      userId
    );

    return reviews; // ???? ?? ?? ??
  } catch (err) {
    throw new Error(`??? ?? ?? ? ??? ??????. (${err})`);
  } finally {
    conn.release();
  }
};