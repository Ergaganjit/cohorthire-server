// db.js
export async function fetchAllJobs(env) {
  const { results } = await env.DB.prepare(
      "SELECT * FROM jobs"
  ).all();
  return results;
}

export async function fetchJobById(env, jobId) {
  const { results } = await env.DB.prepare(
      "SELECT * FROM jobs WHERE id = ?"
  ).bind(jobId).all();
  return results[0];
}
