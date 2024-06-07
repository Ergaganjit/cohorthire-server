export const fetchAllCandidates = async (env) => {
    try {
        const { results } = await env.DB.prepare("SELECT * FROM candidates").all();
        return results;
    } catch (error) {
        throw new Error("Error fetching candidates: " + error.message);
    }
};

export const fetchCandidateById = async (env, candidateId) => {
    try {
        const { results } = await env.DB.prepare("SELECT * FROM candidates WHERE id = ?").bind(candidateId).all();
        if (results.length === 0) {
            throw new Error("Candidate not found");
        }
        return results[0];
    } catch (error) {
        throw new Error("Error fetching candidate: " + error.message);
    }
};

export const createCandidate = async (env, candidateData) => {
    try {
        await env.DB.prepare(
          `INSERT INTO candidates (
            name, email, phone, job_id, resume, cover_letter, status
          ) VALUES (?, ?, ?, ?, ?, ?, ?)`
        ).bind(
          candidateData.name, candidateData.email, candidateData.phone, candidateData.job_id, 
          candidateData.resume, candidateData.cover_letter, candidateData.status
        ).run();
    } catch (error) {
        throw new Error("Error creating candidate: " + error.message);
    }
};

export const deleteCandidateById = async (env, candidateId) => {
    try {
        await env.DB.prepare("DELETE FROM candidates WHERE id = ?").bind(candidateId).run();
    } catch (error) {
        throw new Error("Error deleting candidate: " + error.message);
    }
};

export const updateCandidateById = async (env, candidateId, candidateData) => {
    try {
        let sql = "UPDATE candidates SET ";
        const params = [];

        Object.keys(candidateData).forEach((key, index) => {
          sql += `${key} = ?`;
          params.push(candidateData[key]);
          if (index < Object.keys(candidateData).length - 1) {
            sql += ", ";
          }
        });

        sql += " WHERE id = ?";
        params.push(candidateId);

        await env.DB.prepare(sql).bind(...params).run();
    } catch (error) {
        throw new Error("Error updating candidate: " + error.message);
    }
};
