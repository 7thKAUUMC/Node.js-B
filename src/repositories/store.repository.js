import { pool } from "../db.config.js"; // DB 연결 설정

// 가게 추가 함수
export const addStore = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [result] = await conn.query(
      `INSERT INTO store (name, address, region_id) VALUES (?, ?, ?);`,
      [data.name, data.address, data.region_id] 
    );

    return {
      id: result.insertId,
      name: data.name,
      address: data.address,
      region_id: data.region_id,
      created_at: new Date().toISOString(),
    };
  } catch (err) {
    console.error("가게 추가 중 오류 발생:", err);
    throw new Error("가게 추가에 실패했습니다."); // 예외 발생
  } finally {
    conn.release();
  }
};

// 주어진 region_id에 해당하는 지역의 이름을 조회하는 함수
export const getRegionNameById = async (region_id) => {
  const conn = await pool.getConnection();
  
  try {
    const [rows] = await conn.query(`SELECT name FROM region WHERE id = ?;`, [region_id]);
    return rows.length > 0 ? rows[0].name : null; // 지역 이름 반환
  } finally {
    conn.release();
  }
};
