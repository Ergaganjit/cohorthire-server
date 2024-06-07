import * as jobsController from '../controllers/jobsController';

export async function handleJobsRequest(request, env) {
  const { method, url } = request;
  const { pathname } = new URL(url);

  if (method === 'GET') {
      if (pathname === "/api/jobs") {
          return await jobsController.getAllJobs(env);
      } else if (pathname.startsWith("/api/jobs/") && pathname.split("/").length === 4) {
          const jobId = pathname.split("/")[3];
          return await jobsController.getJobById(jobId, env);
      }
  } else if (method === 'POST' && pathname === "/api/jobs") {
      const body = await request.json();
      return await jobsController.createJob(body, env);
  } else if ((method === 'PUT' || method === 'PATCH') && pathname.startsWith("/api/jobs/") && pathname.split("/").length === 4) {
      const jobId = pathname.split("/")[3];
      const body = await request.json();
      return await jobsController.updateJob(jobId, body, env);
  } else if (method === 'DELETE' && pathname.startsWith("/api/jobs/") && pathname.split("/").length === 4) {
      const jobId = pathname.split("/")[3];
      return await jobsController.deleteJob(jobId, env);
  }

  return new Response("Method not allowed or path not found", { status: 405 });
}

