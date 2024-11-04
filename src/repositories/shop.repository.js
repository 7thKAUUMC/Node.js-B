import { pool } from "../db.config.js";

export const addShop = async (data) => {
  const conn = await pool.getConnection();
  
  try {
    const [result] = await pool.query(
      `INSERT INTO store(name, address, region_id) VALUES(?, ?, ?)`,
      [
        data.name,
        data.address,
        data.regionId,
      ]
    );
    
    return {
      storeId: result.insertId,
      message: "성공적으로 등록되었습니다.",
      status: 201
    };
  } catch (error) {
    console.error("=== 에러 발생 ===");
    console.error("Error:", error);
    
    throw {
      status: 500,
      message: error.message || "Internal Server Error"
    };
  } finally {
    conn.release();
  }
};

export const addReview = async(data) =>{
  const conn = await pool.getConnection();
  try {

    const [confirm] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM store WHERE id = ?) as isExistsStore`,
      data.shopId
    );

    if(!confirm[0].isExistsStore){
      return null;
    }


    const [result] = await pool.query(
      `INSERT INTO review (member_id, store_id, body, score) VALUES (?,?,?,?)`,
      [
        data.userId,
        data.shopId,
        data.content,
        data.stars,
      ]
    )

    return {
      message: "성공적으로 리뷰를 등록했습니다.",
      status: 201,
    }
  }catch(error){
    throw {
      status: 500,
      message: error.sqlMessage || "Internal Server Error"
    }; 
  }finally{
    conn.release();
  }
}

export const addMission = async(data) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await pool.query(
      `INSERT INTO mission (store_id, reward, deadline, mission_spec) VALUES (?,?,?,?)`,
      [
        data.storeId,
        data.reward,
        data.deadline,
        data.mission_spec
      ]
    )

    return {
      message : "성공적으로 미션을 등록했습니다.",
      status: 201
    }
  }catch(error){
    throw {
      status: 500,
      message: error.sqlMessage || "Internal Server Error"
    }; 
  }finally{
    conn.release();
  }
}

export const addToUserMission = async (data) => {
  const conn = await pool.getConnection();
  try {
    const [confirm] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM user_mission WHERE member_id = ? AND mission_id = ?) as isEXSITS`,
      [
        data.member_id,
        data.mission_id
      ]
    )

    if(confirm[0].isEXISTS){
      return null;
    }

    const [result] = await pool.query(
      `INSERT INTO user_mission (member_id, mission_id, status) VALUES(?,?,?)`,
      [
        data.member_id,
        data.mission_id,
        data.status
      ]
    );

    return {
      message : "성공적으로 미션을 시작했습니다.",
      status: 201
    }
  }catch(error){
    throw {
      status: 500,
      message: error.sqlMessage || "Internal Server Error"
    }; 
  }finally{
    conn.release();
  }
}