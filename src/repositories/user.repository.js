import { pool } from "../db.config.js";

// User 데이터 삽입
export const addUser = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [confirm] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM user WHERE email = ?) as isExistEmail;`,
      data.email
    );

    if (confirm[0].isExistEmail) {
      return null;
    }

    const [result] = await pool.query(
      `INSERT INTO user (email, name, gender, birthdate, address, spec_address, phonenumber) VALUES (?, ?, ?, ?, ?, ?, ?);`,
      [
        data.email,
        data.name,
        data.gender,
        data.birthdate,
        data.address,
        data.spec_address,
        data.phonenumber,
      ]
    );

    return { user_id: result.insertId }; // 사용자 ID를 user_id로 반환
  } catch (err) {
    console.error("사용자 추가 중 오류 발생:", err); // 구체적인 오류 메시지 출력
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 사용자 정보 얻기
export const getUser = async (userId) => {
  const conn = await pool.getConnection();

  try {
    const [user] = await pool.query(`SELECT * FROM user WHERE id = ?;`, userId);

    if (user.length == 0) {
      return null;
    }

    const preferences = await getUserPreferencesByUserId(userId);
    
    return { ...user[0], preferences }; // 사용자 정보와 선호 카테고리 반환
  } catch (err) {
    console.error(err); // 에러 로깅 추가
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
  const conn = await pool.getConnection();

  try {
    const [preferences] = await pool.query(
      "SELECT ufc.id, ufc.category_id, fcl.name " +
        "FROM user_favor_category ufc JOIN food_category fcl ON ufc.category_id = fcl.id " + // category_id 수정
        "WHERE ufc.user_id = ? ORDER BY ufc.category_id ASC;",
      userId
    );

    return preferences; // 카테고리 이름도 포함되도록 반환
  } catch (err) {
    console.error(err); // 에러 로깅 추가
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 사용자 선호 카테고리 매핑
export const setPreference = async (userId, categoryId) => {
  const conn = await pool.getConnection();

  try {
    await pool.query(
      `INSERT INTO user_favor_category (category_id, user_id) VALUES (?, ?);`,
      [categoryId, userId]
    );
  } catch (err) {
    console.error(err); // 에러 로깅 추가
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};