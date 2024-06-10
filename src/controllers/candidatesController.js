export async function getAllCandidates(env) {
    try {
      const { results } = await env.DB.prepare("SELECT * FROM candidates").all();
      const responseBody = JSON.stringify(results);
      return new Response(responseBody, { status: 200 });
    } catch (error) {
      console.error("Error fetching all jobs:", error);
      return new Response("Failed to fetch jobs", { status: 500 });
    }
  }

export async function createCandidate(candidate, env) {
    try {
        const {
            name, email, phone, jobId, resume, coverLetter
        } = candidate;

        await env.DB.prepare(
            `INSERT INTO candidates (
                name, email, phone, jobId, resume, coverLetter
            ) VALUES (?, ?, ?, ?, ?, ?)`
        ).bind(
            name, email, phone, jobId, resume, coverLetter
        ).run();
        
        return new Response("Candidate created successfully", { status: 201 });
    } catch (error) {
        console.error("Error creating candidate:", error);
        return new Response("Failed to create candidate", { status: 500 });
    }
}

export async function getCandidateById(candidateId, env) {
    try {
        const { results } = await env.DB.prepare("SELECT * FROM candidates WHERE candidates_id = ?").bind(candidateId).all();
        if (results.length === 0) {
            return new Response("Candidate not found", { status: 404 });
        }
        const responseBody = JSON.stringify(results[0]);        
        return new Response(responseBody, { status: 200 });
      } catch (error) {
        console.error("Error fetching candidate by ID:", error);
        return new Response("Failed to fetch candidate", { status: 500 });
      }
    }

export async function updateCandidate(candidateId, candidateData, env) {
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

        sql += " WHERE candidates_id = ?";
        params.push(candidateId);

        await env.DB.prepare(sql).bind(...params).run();
          return new Response("Job updated successfully", { status: 200 });
    } catch (error) {
        console.error("Error updating candidate:", error);
        return new Response("Failed to update candidate", { status: 500 });
    }
}

export async function deleteCandidate(candidateId, env) {
    try {
        await env.DB.prepare("DELETE FROM candidates WHERE candidates_id = ?").bind(candidateId).run();
        return new Response("Candidate deleted successfully", { status: 200 });
    } catch (error) {
        console.error("Error deleting candidate:", error);
        return new Response("Failed to delete candidate", { status: 500 });
    }
}
