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

export async function linkCandidateToJob(candidateId, jobId, env) {
    // Add a link between candidate and job in candidate_jobs Table
    // console.log("Candidate with ID: ",newCandidateId," applied for job with ID: ",jobId);
    await env.DB.prepare(
        `INSERT INTO candidate_jobs (
                candidateId, jobId
            ) VALUES (?, ?)`
    ).bind(
        candidateId, jobId
    ).run();
}

export async function createCandidate(candidate, env) {
    try {
        const { name, email, phone, resume, coverLetter, jobId } = candidate;

        // Check if an entry with that email already exists
        let existingEntry = await env.DB.prepare('SELECT id FROM candidates WHERE email = ?').bind(email).first();

        if (existingEntry) {
            console.log("Candidate already exists and has ID: ", existingEntry.id, " applied for job with ID: ", jobId);
            await linkCandidateToJob(existingEntry.id, jobId, env);
            return new Response(`Candidate already exists with id ${existingEntry.id} and linked to job with id ${jobId}`, { status: 201 });
        } else {
            // Add new candidate into candidates Table
            let candidateEntry = await env.DB.prepare(
                `INSERT INTO candidates (name, email, phone, resume, coverLetter) VALUES (?, ?, ?, ?, ?)`
            ).bind(name, email, phone, resume, coverLetter).run();

            let newCandidateId = candidateEntry.lastInsertRowid;
            console.log("New Candidate with ID: ", newCandidateId, " applied for job with ID: ", jobId);

            await linkCandidateToJob(newCandidateId, jobId, env);

            return new Response(`Candidate created successfully with id ${existingEntry.id} and linked to job with id ${jobId}`, { status: 201 });

        }

    } catch (error) {
        console.error("Error creating candidate: ", error);
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
