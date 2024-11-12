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

export const addChallengeMission = async (data) => {
    const conn = await pool.getConnection();

    try {
        const [result] = await conn.query(
            'SELECT EXISTS(SELECT 1 FROM member_mission WHERE id = ?) as isExist;',
            [missionId]
        );

        if (result) {
            const [statusResult] = await conn.query(
                'SELECT status FROM member_mission WHERE user_id = ? AND mission_id = ?',
                [data.userId, data.missionId]
            )

            if (statusResult[0].status === '???') {
                throw new Error("?? ???? ?????.");
            }
            else if (statusResult[0].status === '????') {
                throw new Error("?? ??? ?????.");
            }
            else {
                const [result] = await conn.query(
                    'INSERT INTO member_mission (mission_id, user_id, store_id, region_id, status) VALUES (?, ?, ?, ?, ?);',
                    [
                        data.missionId,
                        data.userId,
                        data.storeId,
                        data.regionId,
                        data.status
                    ]
                );
    
                return result.insertId;
            }
        }
        else {
            const [result] = await conn.query(
                'INSERT INTO member_mission (mission_id, user_id, store_id, region_id, status) VALUES (?, ?, ?, ?, ?);',
                [
                    data.missionId,
                    data.userId,
                    data.storeId,
                    data.regionId,
                    data.status
                ]
            );

            return result.insertId;
        }

    } catch (err) {
        throw new Error(`?? ?? ?? ??? ???????. (${err})`);
    } finally {
        conn.release();  // ?? ??
    }
};
