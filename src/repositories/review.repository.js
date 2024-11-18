import { pool } from "../db.config.js";

export const doesStoreExist = async (storeId) => {
    const conn = await pool.getConnection();
  
    try {
      const [result] = await conn.query(
        'SELECT EXISTS(SELECT 1 FROM store WHERE id = ?) as isExist;',
        [storeId]
      );
  
      return result[0].isExist === 1;
    } catch (err) {
      throw new Error(`Error: ${err}`);
    } finally {
      conn.release();
    }
  };

export const addReview = async (data) => {
    const conn = await pool.getConnection();
  
    try {
      const [result] = await pool.query(
        'INSERT INTO review (user_id, store_id, region_id, body, score, created_at) VALUES (?, ?, ?, ?, ?, ?);',
        [
          data.userId,
          data.storeId,
          data.regionId,
          data.body || "",
          data.score,
          new Date()
        ]
      );
  
      return result.insertId;
    } catch (err) {
      throw new Error(`error: Check parameter. (${err})`);
    } finally {
      conn.release();
    }
  };