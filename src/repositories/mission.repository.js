import { pool } from "../db.config.js";

export const addMission = async (data) => {
    const conn = await pool.getConnection();

    try {
        const [result] = await conn.query(
            'INSERT INTO mission (store_id, region_id, reward, deadline, mission_spec) VALUES (?, ?, ?, ?, ?);',
            [
                data.storeId,
                data.regionId,
                data.reward,
                data.deadline,
                data.mission_spec
            ]        
        );

        return result.insertId;
    } catch (err) {
        throw new Error(`?? ??? ???????. (${err})`);
    } finally {
        conn.release();
    }
};