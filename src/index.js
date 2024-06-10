import { handleJobsRequest } from './routers/jobsRouter';
import { handleCandidatesRequest } from './routers/candidatesRouter';

export default {
  async fetch(request, env) {
    const { method, url } = request;
    const { pathname } = new URL(url);

    // Set CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    };

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // Route requests based on URL path
    let response;
    if (pathname.startsWith('/api/jobs')) {
      response = await handleJobsRequest(request, env);
    } else if (pathname.startsWith('/api/candidates')) {
      response = await handleCandidatesRequest(request, env);
    } else {
      // If the request does not match any known routes, return 404
      response = new Response('Not Found', { status: 404 });
    }

    // Add CORS headers to the response
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return response;
  }
};