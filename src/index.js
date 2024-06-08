import { handleJobsRequest } from './routers/jobsRouter';
import { handleCandidatesRequest } from './routers/candidatesRouter';

export default {
    async fetch(request, env) {
        const { method, url } = request;
        const { pathname } = new URL(url);

        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', // Allow all origins
            'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        };

        // Handle preflight requests
        if (method === 'OPTIONS') {
            return new Response(null, { status: 204, headers });
        }

        // Route requests based on URL path
        if (pathname.startsWith('/api/jobs')) {
            return await handleJobsRequest(request, env);
        } else if (pathname.startsWith('/api/candidates')) {
            return await handleCandidatesRequest(request, env);
        } else {
            // If the request does not match any known routes, return 404
            return new Response('Not Found', { status: 404, headers });
        }
    },
};
