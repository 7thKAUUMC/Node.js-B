import db from '../database'; // ?????? ?? ??

export const isMissionChallenged = async (user_id, mission_id) => {
    const result = await db.query(
        'SELECT * FROM challenge_missions WHERE user_id = ? AND mission_id = ?',
        [user_id, mission_id]
    );
    return result.length > 0; // ?? ?? ?? ??? ??? ??
};

export const addChallengeMission = async (user_id, mission_id) => {
    return await db.query(
        'INSERT INTO challenge_missions (user_id, mission_id) VALUES (?, ?)',
        [user_id, mission_id]
    );
};