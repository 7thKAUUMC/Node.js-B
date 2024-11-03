import { pool } from "../db.config.js"; // DB 연결 설정

// 미션 추가 함수
export const addUserMission = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [result] = await conn.query(
      `INSERT INTO member_mission (mission_id, user_id, store_id, region_id, status) VALUES (?, ?, ?, ?, ?);`,
      [data.mission_id, data.user_id, data.store_id, data.region_id, '진행중'] // 기본 상태
    );

    return {
      id: result.insertId,
      user_id: data.user_id,
      mission_id: data.mission_id,
      store_id: data.store_id,
      region_id: data.region_id,
      status: '진행중',
      created_at: new Date().toISOString(), // 생성 시간
    };
  } catch (err) {
    console.error("미션 추가 중 오류 발생:", err);
    throw new Error("미션 추가에 실패했습니다."); // 예외 발생
  } finally {
    conn.release();
  }
};

// 사용자 미션 존재 여부 확인 함수
export const checkUserMissionExists = async (missionId, userId) => {
  const conn = await pool.getConnection();

  try {
    const [rows] = await conn.query(
      `SELECT * FROM member_mission WHERE mission_id = ? AND user_id = ?;`,
      [missionId, userId]
    );
    return rows.length > 0; // 미션이 존재하면 true 반환
  } catch (err) {
    console.error("미션 체크 중 오류 발생:", err);
    return false; // 오류 발생 시 false 반환
  } finally {
    conn.release();
  }
};
