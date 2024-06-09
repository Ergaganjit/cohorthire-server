export async function getAllJobs(env) {
    try {
      const { results } = await env.DB.prepare("SELECT * FROM jobs").all();
      const responseBody = JSON.stringify(results);
      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', 
      };
      return new Response(responseBody, { status: 200, headers });
    } catch (error) {
      console.error("Error fetching all jobs:", error);
      return new Response("Failed to fetch jobs", { status: 500 });
    }
  }

  export async function createJob(job, env) {
    try {
      const {
        jobTitle, company, numberOfOpenings, country, language, location, jobType, schedule, pay,
        supplementalPay, benefits, jobDescription, applicationMethod, requireResume, applicationUpdates,
        candidatesContactEmail, applicationDeadline, candidatesContactPhone, flexibleLanguageRequirement,
        hiringTimeline, expectedStartDate, sponsorship
      } = job;
  
      await env.DB.prepare(
        `INSERT INTO jobs (
            jobTitle, company, numberOfOpenings, country, language, location, jobType, schedule, pay, 
            supplementalPay, benefits, jobDescription, applicationMethod, requireResume, applicationUpdates, 
            candidatesContactEmail, applicationDeadline, candidatesContactPhone, flexibleLanguageRequirement, 
            hiringTimeline, expectedStartDate, sponsorship
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(
        jobTitle, company, numberOfOpenings, country, language, location, jobType, schedule, pay,
        supplementalPay, benefits, jobDescription, applicationMethod, requireResume, applicationUpdates,
        candidatesContactEmail, applicationDeadline, candidatesContactPhone, flexibleLanguageRequirement,
        hiringTimeline, expectedStartDate, sponsorship
      ).run();
  
      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', 
      };
  
      return new Response("Job created successfully", { status: 201, headers });
    } catch (error) {
      console.error("Error creating job:", error);
      return new Response("Failed to create job", { status: 500 });
    }
  }
  
export async function getJobById(jobId, env) {
    try {
      const { results } = await env.DB.prepare("SELECT * FROM jobs WHERE id = ?").bind(jobId).all();
      if (results.length === 0) {
        return new Response("Job not found", { status: 404 });
      }
      
      const responseBody = JSON.stringify(results[0]);
      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', 
      };
      
      return new Response(responseBody, { status: 200, headers });
    } catch (error) {
      console.error("Error fetching job by ID:", error);
      return new Response("Failed to fetch job", { status: 500 });
    }
  }
  

  export async function updateJob(jobId, jobData, env) {
    try {
      let sql = "UPDATE jobs SET ";
      const params = [];
  
      Object.keys(jobData).forEach((key, index) => {
        sql += `${key} = ?`;
        params.push(jobData[key]);
        if (index < Object.keys(jobData).length - 1) {
          sql += ", ";
        }
      });
  
      sql += " WHERE id = ?";
      params.push(jobId);
  
      await env.DB.prepare(sql).bind(...params).run();
      
      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', 
      };
  
      return new Response("Job updated successfully", { status: 200, headers });
    } catch (error) {
      console.error("Error updating job:", error);
      return new Response("Failed to update job", { status: 500 });
    }
  }
  

  export async function deleteJob(jobId, env) {
    try {
      await env.DB.prepare("DELETE FROM jobs WHERE id = ?").bind(jobId).run();
      
      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', 
      };
  
      return new Response("Job deleted successfully", { status: 200, headers });
    } catch (error) {
      console.error("Error deleting job:", error);
      return new Response("Failed to delete job", { status: 500 });
    }
  }
  
